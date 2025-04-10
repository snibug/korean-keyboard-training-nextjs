// 한글 단어 목록
const koreanWords = [
  "안녕하세요",
  "감사합니다",
  "사랑해요",
  "행복",
  "가족",
  "친구",
  "학교",
  "회사",
  "컴퓨터",
  "키보드",
  "스마트폰",
  "인터넷",
  "프로그램",
  "게임",
  "음악",
  "영화",
  "책",
  "공부",
  "여행",
  "음식",
  "커피",
  "자동차",
  "지하철",
  "버스",
  "비행기",
  "날씨",
  "계절",
  "봄",
  "여름",
  "가을",
  "겨울",
  "바다",
  "산",
  "강",
  "하늘",
  "태양",
  "달",
  "별",
  "구름",
  "비",
  "눈",
  "바람",
  "꽃",
  "나무",
  "동물",
  "고양이",
  "강아지",
  "새",
  "물고기",
  "나비",
]

/**
 * 랜덤 한글 단어를 반환합니다.
 */
export function getRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * koreanWords.length)
  return koreanWords[randomIndex]
}

/**
 * 특정 길이의 랜덤 한글 단어를 반환합니다.
 */
export function getRandomWordByLength(length: number): string {
  const filteredWords = koreanWords.filter((word) => word.length === length)

  if (filteredWords.length === 0) {
    // 해당 길이의 단어가 없으면 기본 목록에서 랜덤 선택
    return getRandomWord()
  }

  const randomIndex = Math.floor(Math.random() * filteredWords.length)
  return filteredWords[randomIndex]
}
