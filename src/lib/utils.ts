import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const typographyVariants = {
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-3xl font-bold tracking-tight",
  h3: "text-2xl font-bold tracking-tight",
  h4: "text-xl font-semibold tracking-tight",
  h5: "text-lg font-semibold tracking-tight",
  p: "text-base leading-7",
  lead: "text-lg leading-7 text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium",
  subtle: "text-sm text-muted-foreground",
  muted: "text-sm text-muted-foreground",
}

/**
 * 한글 자모 결합 유틸리티 함수
 * (이 앱에서는 사용하지 않지만, 향후 확장을 위해 포함)
 */
export function combineHangul(cho: string, jung: string, jong?: string): string {
  // 초성, 중성, 종성 인덱스 매핑
  const choIndex = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".indexOf(cho)
  const jungIndex = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ".indexOf(jung)
  const jongIndex = jong ? "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ".indexOf(jong) + 1 : 0

  if (choIndex === -1 || jungIndex === -1 || jongIndex === -1) {
    return ""
  }

  // 유니코드 한글 조합 공식
  const code = 0xac00 + choIndex * 21 * 28 + jungIndex * 28 + jongIndex
  return String.fromCharCode(code)
}
