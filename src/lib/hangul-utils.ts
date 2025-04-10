// 한글 자모 결합 유틸리티

// 초성 리스트
const CHOSUNG = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
]

// 중성 리스트
const JUNGSUNG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
]

// 종성 리스트
const JONGSUNG = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
]

// 복합 모음 매핑
const COMPLEX_VOWELS: Record<string, string> = {
  ㅗㅏ: "ㅘ",
  ㅗㅐ: "ㅙ",
  ㅗㅣ: "ㅚ",
  ㅜㅓ: "ㅝ",
  ㅜㅔ: "ㅞ",
  ㅜㅣ: "ㅟ",
  ㅡㅣ: "ㅢ",
}


// 한글 자모 상태를 관리하는 클래스
export class HangulComposer {
  private chosung: string | null = null
  private jungsung: string | null = null
  private jongsung: string | null = null
  private composing = false
  private text = ""

  // 현재 조합 중인 글자가 있는지 확인
  isComposing(): boolean {
    return this.composing
  }

  // 현재 텍스트 반환
  getText(): string {
    return this.text
  }

  // 백스페이스 처리
  backspace(): string {
    if (this.composing) {
      // 조합 중인 글자가 있는 경우
      if (this.jongsung) {
        // 종성이 있으면 종성 삭제
        this.jongsung = null
      } else if (this.jungsung) {
        // 중성이 있으면 중성 삭제
        this.jungsung = null
        if (!this.chosung) {
          this.composing = false
        }
      } else if (this.chosung) {
        // 초성만 있으면 초성 삭제
        this.chosung = null
        this.composing = false
      }
    } else {
      // 조합 중인 글자가 없으면 마지막 글자 삭제
      this.text = this.text.slice(0, -1)
    }

    return this.getDisplayText()
  }

  // 자모 입력 처리
  input(char: string): string {
    // 공백 처리
    if (char === " ") {
      this.commitComposition()
      this.text += " "
      return this.text
    }

    // 초성 처리
    if (CHOSUNG.includes(char)) {
      if (!this.composing) {
        // 새로운 글자 시작
        this.chosung = char
        this.composing = true
      } else if (this.chosung && !this.jungsung) {
        // 초성만 있는 상태에서 다른 초성이 들어오면 이전 초성을 텍스트에 추가하고 새로운 초성 설정
        this.text += this.chosung
        this.chosung = char
      } else if (this.chosung && this.jungsung && !this.jongsung) {
        // 초성과 중성이 있고 종성이 없는 상태에서 자음이 들어오면 종성으로 설정
        this.jongsung = char
      } else if (this.chosung && this.jungsung && this.jongsung) {
        // 이미 종성이 있는 상태에서 자음이 들어오면
        // 현재 글자를 완성하고 새로운 글자 시작
        this.commitComposition()
        this.chosung = char
        this.composing = true
      }
    }
    // 중성 처리
    else if (JUNGSUNG.includes(char)) {
      if (!this.composing) {
        // 새로운 글자 시작 (모음으로 시작하는 경우 초성은 'ㅇ'으로 설정)
        this.chosung = "ㅇ"
        this.jungsung = char
        this.composing = true
      } else if (this.chosung && !this.jungsung) {
        // 초성만 있는 상태에서 모음이 들어오면 중성으로 설정
        this.jungsung = char
      } else if (this.chosung && this.jungsung && !this.jongsung) {
        // 초성과 중성이 있고 종성이 없는 상태에서 모음이 들어오면
        // 현재 중성과 새 모음이 복합 모음을 형성하는지 확인
        const complexVowel = COMPLEX_VOWELS[this.jungsung + char]
        if (complexVowel) {
          // 복합 모음 형성
          this.jungsung = complexVowel
        } else {
          // 복합 모음을 형성하지 않으면 현재 글자를 완성하고 새로운 글자 시작
          this.commitComposition()
          this.chosung = "ㅇ"
          this.jungsung = char
          this.composing = true
        }
      } else if (this.chosung && this.jungsung && this.jongsung) {
        // 이미 종성이 있는 상태에서 모음이 들어오면
        // 종성을 다음 글자의 초성으로 이동
        const jongsung = this.jongsung
        this.jongsung = null
        this.commitComposition()
        this.chosung = jongsung
        this.jungsung = char
        this.composing = true
      }
    }

    return this.getDisplayText()
  }

  // 현재 조합 중인 글자를 완성하고 텍스트에 추가
  private commitComposition(): void {
    if (this.composing) {
      if (this.chosung && this.jungsung) {
        // 초성과 중성이 있으면 글자 완성
        const char = this.composeHangul()
        this.text += char
      } else if (this.chosung) {
        // 초성만 있으면 초성을 그대로 추가
        this.text += this.chosung
      }

      // 상태 초기화
      this.chosung = null
      this.jungsung = null
      this.jongsung = null
      this.composing = false
    }
  }

  // 현재 자모를 조합하여 하나의 한글 문자로 만듦
  private composeHangul(): string {
    const chosungIndex = CHOSUNG.indexOf(this.chosung!)
    const jungsungIndex = JUNGSUNG.indexOf(this.jungsung!)
    const jongsungIndex = this.jongsung ? JONGSUNG.indexOf(this.jongsung) : 0

    // 유니코드 한글 조합 공식
    const code = 0xac00 + chosungIndex * 21 * 28 + jungsungIndex * 28 + jongsungIndex
    return String.fromCharCode(code)
  }

  // 화면에 표시할 텍스트 반환 (완성된 텍스트 + 현재 조합 중인 글자)
  getDisplayText(): string {
    if (!this.composing) {
      return this.text
    }

    let composingChar = ""
    if (this.chosung && this.jungsung) {
      composingChar = this.composeHangul()
    } else if (this.chosung) {
      composingChar = this.chosung
    }

    return this.text + composingChar
  }

  // 모든 입력을 완료하고 최종 텍스트 반환
  finalize(): string {
    this.commitComposition()
    return this.text
  }
}
