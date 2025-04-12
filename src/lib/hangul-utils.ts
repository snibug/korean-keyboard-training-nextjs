// 한글 자모 결합 유틸리티 (초성 'ㅇ' 자동 추가 방지 스펙 적용 버전)

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

// 복합 종성 매핑 (종성 + 자음 => 복합 종성)
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
        // 중성이 있으면 중성 삭제 (복합 모음 분해 로직은 현재 미구현 - 필요 시 추가)
        this.jungsung = null;
        // 이제 초성만 남게 됨 (예: '가'에서 'ㅏ' 삭제 -> 'ㄱ' 상태)
        // composing 상태는 유지
      } else if (this.chosung) {
        // 초성만 있으면 초성 삭제하고 조합 종료
        this.chosung = null;
        this.composing = false;
      }
    } else {
      // 조합 중인 글자가 없으면 텍스트의 마지막 글자 삭제
      // (단독으로 추가된 모음도 이 로직으로 삭제됨)
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
      return this.getDisplayText(); // 공백은 바로 추가하고 표시 텍스트 반환
    }

    // 초성 처리 (입력된 문자가 자음일 때)
    if (CHOSUNG.includes(char)) {
      if (!this.composing) {
        // 새로운 글자 시작 (초성 설정)
        this.commitComposition(); // 이전 상태 확정 (혹시 모를 대비)
        this.chosung = char;
        this.composing = true;
      } else if (this.chosung && !this.jungsung) {
        // 초성만 있는 상태에서 다른 자음이 들어오면 현재 초성을 확정하고 새 자음으로 조합 시작
        this.commitComposition(); // 이전 초성(자음) 확정
        this.chosung = char;      // 새 초성(자음) 설정
        this.composing = true;
      } else if (this.chosung && this.jungsung && !this.jongsung) {
        // 초성과 중성이 있고 종성이 없는 상태에서 자음이 들어오면
        // 유효한 종성인지 확인 (JONGSUNG 배열 0번 인덱스 "" 제외)
        const jongsungIndex = JONGSUNG.indexOf(char);
        if (jongsungIndex > 0) {
          // 유효한 종성이면 설정
          this.jongsung = char;
        } else {
          // 유효하지 않은 종성(e.g., ㄸ, ㅃ, ㅉ)이면 현재 글자 완성하고 새 글자(자음) 시작
          this.commitComposition();
          this.chosung = char;
          this.composing = true;
        }
      } else if (this.chosung && this.jungsung && this.jongsung) {
        // 이미 종성이 있는 상태에서 자음이 들어오면 복합 종성 가능성 확인
        const combinationKey = this.jongsung + char;
        const complexJongsung = COMPLEX_JONGSUNG_MAP[combinationKey];

        if (complexJongsung) {
          // 유효한 복합 종성 조합이면 업데이트
          this.jongsung = complexJongsung;
        } else {
          // 복합 종성을 형성하지 못하면 현재 글자를 완성하고 새로운 글자(자음) 시작
          this.commitComposition();
          this.chosung = char;
          this.composing = true;
        }
      }
    }
    // 중성 처리 (입력된 문자가 모음일 때)
    else if (JUNGSUNG.includes(char)) {
      if (!this.composing) {
        // === 스펙 적용: 모음으로 시작 시 'ㅇ' 자동 추가 안 함 ===
        // 조합을 시작하는 대신 모음 문자 자체를 텍스트에 추가합니다.
        this.commitComposition(); // 이전 상태 확정 (안전 조치)
        this.text += char;
        // composing = false 상태 유지
        // === 스펙 적용 끝 ===
      } else if (this.chosung && !this.jungsung) {
        // 초성만 있는 상태에서 모음이 들어오면 중성으로 설정 (정상 조합 시작, 예: ㄱ + ㅏ = 가)
        this.jungsung = char;
      } else if (this.chosung && this.jungsung && !this.jongsung) {
        // 초성과 중성이 있고 종성이 없는 상태에서 모음이 들어오면
        // 복합 모음 가능성 확인
        const complexVowel = COMPLEX_VOWELS[this.jungsung + char];
        if (complexVowel) {
          // 복합 모음 형성 (예: ㄱ + ㅗ + ㅏ = 과)
          this.jungsung = complexVowel;
        } else {
          // === 스펙 적용: 복합 모음이 아닐 경우 'ㅇ' 추가 없이 처리 ===
          // 이전 글자를 확정하고 입력된 모음을 텍스트에 바로 추가합니다.
          this.commitComposition(); // 현재 글자 (예: '가') 확정
          this.text += char;       // 새 모음 (예: 'ㅣ') 를 바로 추가 -> 결과: "가ㅣ"
          // composing = false 상태가 됨 (commitComposition 내부에서 설정)
          // === 스펙 적용 끝 ===
        }
      } else if (this.chosung && this.jungsung && this.jongsung) {
        // 이미 종성이 있는 상태에서 모음이 들어오면 종성 처리 후 새 글자 시작
        // (이 부분은 표준 동작 유지: 종성을 다음 글자 초성으로. 스펙에 따라 변경 필요 시 수정)
        const jongsungToMove = this.jongsung;
        const split = JONGSUNG_SPLIT_FOR_TRANSFER[jongsungToMove];

        if (split) {
          // 복합 종성 분리 (예: 닭 + ㅏ = 달 + 가)
          this.jongsung = split[0];
          const nextChosung = split[1];
          this.commitComposition(); // '달' 확정
          this.chosung = nextChosung; // 'ㄱ'
          this.jungsung = char; // 'ㅏ'
          this.composing = true; // '가' 조합 시작
        } else {
          // 단일/된소리 종성 이동 (예: 각 + ㅣ = 가 + 기)
          const nextChosung = jongsungToMove; // 'ㄱ'
          this.jongsung = null;
          this.commitComposition(); // '가' 확정
          this.chosung = nextChosung; // 'ㄱ'
          this.jungsung = char; // 'ㅣ'
          this.composing = true; // '기' 조합 시작
        }
      }
    } else {
      // 한글 자모나 공백 외 다른 문자 처리
      this.commitComposition(); // 현재 조합 중인 글자 확정
      this.text += char; // 입력된 문자 바로 추가
    }

    return this.getDisplayText();
  }

  // 현재 조합 중인 글자를 완성하고 텍스트에 추가
  private commitComposition(): void {
    if (this.composing) {
      let charToCommit = "";
      if (this.chosung && this.jungsung) {
        // 초성, 중성, 종성(있거나 없거나) 조합하여 완성 글자 만듦
        charToCommit = this.composeHangul();
      } else if (this.chosung) {
        // 초성만 있는 경우 (예: 'ㄱ' 입력 후 다른 자음 입력)
        charToCommit = this.chosung;
      }
      // 모음만 있는 경우는 composing 상태가 되지 않도록 input에서 처리됨.

      this.text += charToCommit; // 완성된 글자나 단독 자음을 텍스트에 추가

      // 상태 초기화
      this.chosung = null;
      this.jungsung = null;
      this.jongsung = null;
      this.composing = false; // 조합 종료
    }
  }

  // 현재 자모를 조합하여 하나의 한글 문자로 만듦
  private composeHangul(): string {
    // composeHangul은 항상 chosung과 jungsung이 있다고 가정하고 호출됨
    if (!this.chosung || !this.jungsung) {
      // 이 경우는 발생하면 안 되지만, 안전을 위해 빈 문자열 반환 또는 오류 처리
      console.error("composeHangul called without chosung or jungsung!");
      return "";
    }
    const chosungIndex = CHOSUNG.indexOf(this.chosung);
    const jungsungIndex = JUNGSUNG.indexOf(this.jungsung);
    // jongsung은 없을 수 있으므로 확인 후 인덱스 계산 (없으면 0)
    const jongsungIndex = this.jongsung ? JONGSUNG.indexOf(this.jongsung) : 0;

    if (chosungIndex < 0 || jungsungIndex < 0 || jongsungIndex < 0) {
      // 유효하지 않은 자모가 포함된 경우 (오류 상황)
      console.error("Invalid Hangul components:", this.chosung, this.jungsung, this.jongsung);
      // 임시로 현재까지의 자모를 반환하거나 오류 처리
      return (this.chosung || "") + (this.jungsung || "") + (this.jongsung || "");
    }

    // 유니코드 한글 조합 공식: (초성 인덱스 * 588) + (중성 인덱스 * 28) + 종성 인덱스 + 0xAC00
    // 588 = 21 (중성 개수) * 28 (종성 개수)
    // 28 = 종성 개수
    const code = 0xac00 + chosungIndex * 588 + jungsungIndex * 28 + jongsungIndex;
    return String.fromCharCode(code);
  }

  // 화면에 표시할 텍스트 반환 (완성된 텍스트 + 현재 조합 중인 글자)
  getDisplayText(): string {
    let composingChar = "";
    if (this.composing) {
      // composing 상태는 자음으로 시작된 조합만 해당됨 (스펙 변경 후)
      if (this.chosung && this.jungsung) {
        // 초성, 중성, 종성(있거나 없거나) 조합 중인 글자
        composingChar = this.composeHangul();
      } else if (this.chosung) {
        // 초성만 입력된 상태 (예: 'ㄱ')
        composingChar = this.chosung;
      }
    }
    // 최종 표시 텍스트 = 확정된 텍스트 + 현재 조합 중인 글자(있는 경우)
    return this.text + composingChar;
  }

  // 모든 입력을 완료하고 최종 텍스트 반환
  finalize(): string {
    this.commitComposition(); // 남아있는 조합 중인 글자를 확정
    return this.text;
  }
}

// --- 사용 예시 ---
/*
const composer = new HangulComposer();
console.log(composer.input("ㄱ"));     // "ㄱ" (composing)
console.log(composer.input("ㅏ"));     // "가" (composing)
console.log(composer.input("ㄴ"));     // "간" (composing)
console.log(composer.input(" "));     // "간 " (not composing)
console.log(composer.input("ㅏ"));     // "간 ㅏ" (not composing, 스펙에 따라 'ㅇ' 없이 'ㅏ' 추가)
console.log(composer.input("ㄴ"));     // "간 ㅏㄴ" (composing 'ㄴ')
console.log(composer.input("ㅣ"));     // "간 ㅏ니" (composing '니')
console.log(composer.backspace());  // "간 ㅏㄴ" (composing 'ㄴ')
console.log(composer.backspace());  // "간 ㅏ" (not composing)
console.log(composer.backspace());  // "간 " (not composing)
console.log(composer.input("ㄱ"));    // "간 ㄱ" (composing 'ㄱ')
console.log(composer.input("ㅗ"));    // "간 고" (composing '고')
console.log(composer.input("ㅏ"));    // "간 과" (composing '과', 복합모음)
console.log(composer.input("ㅣ"));    // "간 과ㅣ" (not composing, 스펙에 따라 'ㅣ' 추가)
console.log(composer.finalize());   // "간 과ㅣ" (최종 결과)

const composer2 = new HangulComposer();
console.log(composer2.input("ㅇ"));     // "ㅇ" (composing)
console.log(composer2.input("ㅏ"));     // "아" (composing)
console.log(composer2.input("ㄴ"));     // "안" (composing)
console.log(composer2.input("ㅏ"));     // "아나" (not composing -> composing '나') 종성 이동은 유지됨
*/
