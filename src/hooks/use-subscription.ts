import { create } from 'zustand';

// 1. 상태와 액션의 타입을 정의합니다. (Interface 또는 Type 사용 가능)
interface SubscriptionState {
  isSubscribed: boolean; // 구독 상태 (boolean 타입)
  setIsSubscribed: (newState: boolean) => void; // 상태 변경 함수 (boolean 인자를 받고 void 반환)
}

// 2. Zustand 스토어 생성 시 제네릭(<>)으로 타입을 지정합니다.
const useSubscriptionStore = create<SubscriptionState>((set) => ({
  // 초기 상태값 설정 (타입 정의에 맞게)
  isSubscribed: false,
  // 상태 변경 함수 구현 (타입 정의에 맞게)
  setIsSubscribed: (newState) => set({ isSubscribed: newState }),
  // 만약 set 함수 내부에서 이전 상태값을 사용해야 한다면 아래와 같이 작성할 수도 있습니다.
  // setIsSubscribed: (newState) => set((state) => ({ ...state, isSubscribed: newState })),
  // 또는 특정 상태만 변경할 때
  // setIsSubscribed: (newState) => set(() => ({ isSubscribed: newState })), // 이 경우엔 위와 동일
}));

// 3. 커스텀 훅 정의 시 반환 타입을 명시합니다.
/**
 * 구독 상태와 해당 상태를 변경하는 함수를 반환하는 커스텀 훅입니다.
 * useState와 유사한 인터페이스를 제공합니다.
 * @returns {[boolean, (newState: boolean) => void]} [현재 구독 상태, 구독 상태 변경 함수]
 */
export const useIsSubscribed = (): [boolean, (newState: boolean) => void] => {
  // 스토어에서 상태와 액션을 선택(select)합니다. 타입 추론이 잘 동작합니다.
  const isSubscribed = useSubscriptionStore((state) => state.isSubscribed);
  const setIsSubscribed = useSubscriptionStore((state) => state.setIsSubscribed);

  // 명시된 반환 타입 [boolean, (newState: boolean) => void] 에 맞춰 반환합니다.
  return [isSubscribed, setIsSubscribed];
};

// --- 사용 예시 (React + TypeScript 컴포넌트 내에서) ---
/*
import React from 'react';
import { useIsSubscribed } from './useIsSubscribed'; // 위에서 정의한 훅 import

function MyComponent(): JSX.Element { // 컴포넌트 반환 타입 명시 (예: JSX.Element)
  const [isSubscribed, setIsSubscribed] = useIsSubscribed(); // 타입 추론이 잘 됩니다.

  const handleToggleSubscription = (): void => { // 함수 반환 타입 명시 (void)
    setIsSubscribed(!isSubscribed); // boolean 타입으로 호출
  };

  return (
    <div>
      <p>현재 구독 상태: {isSubscribed ? '구독 중' : '미구독'}</p>
      <button onClick={handleToggleSubscription}>
        {isSubscribed ? '구독 취소' : '구독하기'}
      </button>
    </div>
  );
}

export default MyComponent;
*/
