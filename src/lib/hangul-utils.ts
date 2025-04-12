// 한글 자모 결합 유틸리티

// 초성 리스트
const CHOSUNG = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
];

// 중성 리스트
const JUNGSUNG = [
  "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ",
  "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ",
];

// 종성 리스트
const JONGSUNG = [
  "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ",
  "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
];

// 복합 모음 매핑 (중성 + 중성 => 복합 중성)
const COMPLEX_VOWELS: Record<string, string> = {
  "ㅗㅏ": "ㅘ",
  "ㅗㅐ": "ㅙ",
  "ㅗㅣ": "ㅚ",
  "ㅜㅓ": "ㅝ",
  "ㅜㅔ": "ㅞ",
  "ㅜㅣ": "ㅟ",
  "ㅡㅣ": "ㅢ",
};

// 복합 종성 매핑 (종성 + 자음 => 복합 종성) *** 수정된 부분 ***
const COMPLEX_JONGSUNG_MAP: Record<string, string> = {
  "ㄱㅅ": "ㄳ",
  "ㄴㅈ": "ㄵ",
  "ㄴㅎ": "ㄶ",
  "ㄹㄱ": "ㄺ",
  "ㄹㅁ": "ㄻ",
  "ㄹㅂ": "ㄼ",
  "ㄹㅅ": "ㄽ",
  "ㄹㅌ": "ㄾ",
  "ㄹㅍ": "ㄿ",
  "ㄹㅎ": "ㅀ",
  "ㅂㅅ": "ㅄ",
};

// 복합 종성 분해 매핑 (백스페이스용)
const COMPLEX_JONGSUNG_DECOMPOSITION: Record<string, string> = {
  "ㄳ": "ㄱ",
  "ㄵ": "ㄴ",
  "ㄶ": "ㄴ",
  "ㄺ": "ㄹ",
  "ㄻ": "ㄹ",
  "ㄼ": "ㄹ",
  "ㄽ": "ㄹ",
  "ㄾ": "ㄹ",
  "ㄿ": "ㄹ",
  "ㅀ": "ㄹ",
  "ㅄ": "ㅂ",
  // ㄲ, ㅆ 는 분해하지 않고 한번에 삭제
};

// 종성 이동 분리 매핑 (모음 입력 시)
// [남는 종성 | null, 이동할 초성]
const JONGSUNG_SPLIT_FOR_TRANSFER: Record<string, [string | null, string]> = {
  "ㄳ": ["ㄱ", "ㅅ"],
  "ㄵ": ["ㄴ", "ㅈ"],
  "ㄶ": ["ㄴ", "ㅎ"],
  "ㄺ": ["ㄹ", "ㄱ"],
  "ㄻ": ["ㄹ", "ㅁ"],
  "ㄼ": ["ㄹ", "ㅂ"],
  "ㄽ": ["ㄹ", "ㅅ"],
  "ㄾ": ["ㄹ", "ㅌ"],
  "ㄿ": ["ㄹ", "ㅍ"],
  "ㅀ": ["ㄹ", "ㅎ"],
  "ㅄ": ["ㅂ", "ㅅ"],
  // 단일/된소리 종성은 전체가 이동
};


// 한글 자모 상태를 관리하는 클래스
export class HangulComposer {
  private chosung: string | null = null;
  private jungsung: string | null = null;
  private jongsung: string | null = null;
  private composing = false;
  private text = "";

  // 현재 조합 중인 글자가 있는지 확인
  isComposing(): boolean {
    return this.composing;
  }

  // 현재 텍스트 반환 (조합 중인 글자 제외)
  getText(): string {
    return this.text;
  }

  // 백스페이스 처리
  backspace(): string {
    if (this.composing) {
      // 조합 중인 글자가 있는 경우
      if (this.jongsung) {
        // 종성이 있으면 복합 종성인지 확인하고 분해 또는 삭제
        const decomposed = COMPLEX_JONGSUNG_DECOMPOSITION[this.jongsung];
        if (decomposed) {
          this.jongsung = decomposed; // 복합 종성 분해 (e.g., ㅄ -> ㅂ)
        } else {
          this.jongsung = null; // 단일 또는 된소리 종성 삭제 (e.g., ㄱ, ㄲ, ㅆ)
        }
      } else if (this.jungsung) {
        // 중성이 있으면 중성 삭제 (복합 모음 분해 로직은 현재 미구현)
        this.jungsung = null;
        if (!this.chosung) { // 초성 없이 중성만 있는 경우는 없음 (모음 시작 시 'ㅇ' 자동 추가)
          this.composing = false; // 이론상 도달하기 어려움
        }
      } else if (this.chosung) {
        // 초성만 있으면 초성 삭제
        this.chosung = null;
        this.composing = false;
      }
    } else {
      // 조합 중인 글자가 없으면 마지막 글자 삭제
      this.text = this.text.slice(0, -1);
    }

    return this.getDisplayText();
  }

  // 자모 입력 처리
  input(char: string): string {
    // 공백 처리
    if (char === " ") {
      this.commitComposition();
      this.text += " ";
      return this.text; // 공백은 조합 상태에 영향을 주지 않고 바로 추가
    }

    // 초성 처리 (입력된 문자가 자음일 때)
    if (CHOSUNG.includes(char)) {
      if (!this.composing) {
        // 새로운 글자 시작 (초성 설정)
        this.chosung = char;
        this.composing = true;
      } else if (this.chosung && !this.jungsung) {
        // 초성만 있는 상태에서 다른 초성이 들어오면 이전 초성을 텍스트에 추가하고 새로운 초성 설정
        this.commitComposition(); // 이전 초성 확정
        this.chosung = char;      // 새 초성 설정
        this.composing = true;
      } else if (this.chosung && this.jungsung && !this.jongsung) {
        // 초성과 중성이 있고 종성이 없는 상태에서 자음이 들어오면
        // 해당 자음이 유효한 종성인지 확인 (JONGSUNG 배열의 0번 인덱스 "" 제외)
        if (JONGSUNG.indexOf(char) > 0) {
          // 유효한 종성이면 설정
          this.jongsung = char;
        } else {
          // 유효하지 않은 종성(e.g., ㄸ, ㅃ, ㅉ)이면 현재 글자 완성하고 새 글자 시작
          this.commitComposition();
          this.chosung = char;
          this.composing = true;
        }
      } else if (this.chosung && this.jungsung && this.jongsung) {
        // 이미 종성이 있는 상태에서 자음이 들어오면 복합 종성 가능성 확인 *** 수정된 로직 ***
        const combinationKey = this.jongsung + char; // 예: 'ㅂ' + 'ㅅ' => "ㅂㅅ"
        const complexJongsung = COMPLEX_JONGSUNG_MAP[combinationKey]; // "ㅂㅅ" 키로 맵에서 "ㅄ" 찾기

        if (complexJongsung) {
          // 유효한 복합 종성 조합을 찾았으면 업데이트
          this.jongsung = complexJongsung; // jongsung을 'ㅄ'로 업데이트
        } else {
          // 복합 종성을 형성하지 못하면 현재 글자를 완성하고 새로운 글자 시작
          this.commitComposition();
          this.chosung = char;
          this.composing = true;
        }
      }
    }
    // 중성 처리 (입력된 문자가 모음일 때)
    else if (JUNGSUNG.includes(char)) {
      if (!this.composing) {
        // 새로운 글자 시작 (모음으로 시작하는 경우 초성은 'ㅇ'으로 설정)
        this.chosung = "ㅇ";
        this.jungsung = char;
        this.composing = true;
      } else if (this.chosung && !this.jungsung) {
        // 초성만 있는 상태에서 모음이 들어오면 중성으로 설정
        this.jungsung = char;
      } else if (this.chosung && this.jungsung && !this.jongsung) {
        // 초성과 중성이 있고 종성이 없는 상태에서 모음이 들어오면
        // 현재 중성과 새 모음이 복합 모음을 형성하는지 확인
        const complexVowel = COMPLEX_VOWELS[this.jungsung + char];
        if (complexVowel) {
          // 복합 모음 형성
          this.jungsung = complexVowel;
        } else {
          // 복합 모음을 형성하지 않으면 현재 글자를 완성하고 새로운 글자 시작
          this.commitComposition();
          this.chosung = "ㅇ";
          this.jungsung = char;
          this.composing = true;
        }
      } else if (this.chosung && this.jungsung && this.jongsung) {
        // 이미 종성이 있는 상태에서 모음이 들어오면 종성 처리 후 새 글자 시작
        const jongsungToMove = this.jongsung;
        const split = JONGSUNG_SPLIT_FOR_TRANSFER[jongsungToMove];

        if (split) {
          // 복합 종성이 분리 가능한 경우 (e.g., 'ㅄ' -> 'ㅂ' 남고 'ㅅ' 이동)
          this.jongsung = split[0]; // 남는 종성 업데이트 ('ㅂ')
          const nextChosung = split[1]; // 이동할 초성 ('ㅅ')
          this.commitComposition(); // 현재 글자 완성 ('갑')
          // 새 글자 시작
          this.chosung = nextChosung; // 새 글자 초성 설정 ('ㅅ')
          this.jungsung = char; // 새 글자 중성 설정 ('ㅏ')
          this.composing = true;
        } else {
          // 단일 종성 또는 분리 불가능한 종성 (e.g., 'ㄴ', 'ㄲ', 'ㅆ')
          const nextChosung = jongsungToMove; // 현재 종성이 다음 글자 초성으로
          this.jongsung = null; // 현재 글자 종성 제거
          this.commitComposition(); // 현재 글자 완성 ('아')
          // 새 글자 시작
          this.chosung = nextChosung; // 새 글자 초성 설정 ('ㄴ')
          this.jungsung = char; // 새 글자 중성 설정 ('ㅏ')
          this.composing = true;
        }
      }
    } else {
      // 한글 자모나 공백이 아닌 다른 문자가 입력된 경우 (예: 숫자, 특수문자 등)
      this.commitComposition(); // 현재 조합 중인 글자 확정
      this.text += char; // 입력된 문자 바로 추가
    }

    return this.getDisplayText();
  }

  // 현재 조합 중인 글자를 완성하고 텍스트에 추가
  private commitComposition(): void {
    if (this.composing) {
      if (this.chosung && this.jungsung) {
        // 초성과 중성이 있으면 글자 완성
        const char = this.composeHangul();
        this.text += char;
      } else if (this.chosung) {
        // 초성만 있으면 초성을 그대로 추가 (예: 'ㄱ' 입력 후 다른 자음 입력 시)
        this.text += this.chosung;
      }
      // 중성만 있는 경우는 없음

      // 상태 초기화
      this.chosung = null;
      this.jungsung = null;
      this.jongsung = null;
      this.composing = false;
    }
  }

  // 현재 자모를 조합하여 하나의 한글 문자로 만듦
  private composeHangul(): string {
    // composeHangul은 항상 chosung과 jungsung이 있다고 가정하고 호출됨
    const chosungIndex = CHOSUNG.indexOf(this.chosung!);
    const jungsungIndex = JUNGSUNG.indexOf(this.jungsung!);
    // jongsung은 없을 수 있으므로 확인 후 인덱스 계산 (없으면 0)
    const jongsungIndex = this.jongsung ? JONGSUNG.indexOf(this.jongsung) : 0;

    // 유니코드 한글 조합 공식: (초성 인덱스 * 588) + (중성 인덱스 * 28) + 종성 인덱스 + 0xAC00
    const code = 0xac00 + chosungIndex * 21 * 28 + jungsungIndex * 28 + jongsungIndex;
    return String.fromCharCode(code);
  }

  // 화면에 표시할 텍스트 반환 (완성된 텍스트 + 현재 조합 중인 글자)
  getDisplayText(): string {
    let composingChar = "";
    if (this.composing) {
      if (this.chosung && this.jungsung) {
        // 초성, 중성, 종성(있거나 없거나) 조합
        composingChar = this.composeHangul();
      } else if (this.chosung) {
        // 초성만 있는 경우
        composingChar = this.chosung;
      }
      // 모음만으로 시작하는 경우(ㅇ + 모음)는 위에서 처리됨
    }

    return this.text + composingChar;
  }

  // 모든 입력을 완료하고 최종 텍스트 반환
  finalize(): string {
    this.commitComposition(); // 남아있는 조합 중인 글자를 확정
    return this.text;
  }
}
