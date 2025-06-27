import React, { useRef, useEffect } from "react";

const ScrollPreventedDiv: React.FC = () => {
  // 1. useRef를 사용하여 div 요소에 접근하기 위한 ref 생성
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const divElement = divRef.current;

    if (divElement) {
      // 2. wheel 이벤트 핸들러 정의
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault(); // 기본 스크롤 동작 방지
        console.log("마우스 휠 스크롤이 차단되었습니다.");
      };

      // 3. div 요소에 이벤트 리스너 추가 (passive: false 중요!)
      // passive: false는 preventDefault()를 호출할 수 있도록 허용합니다.
      divElement.addEventListener("wheel", handleWheel, { passive: false });

      // 4. 컴포넌트 언마운트 시 이벤트 리스너 제거 (클린업 함수)
      return () => {
        divElement.removeEventListener("wheel", handleWheel);
      };
    }
  }, []); // 빈 의존성 배열: 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div
      ref={divRef} // ref를 div 요소에 연결
      style={{
        width: "300px",
        height: "200px",
        border: "1px solid black",
        overflow: "auto", // 기본적으로 스크롤 가능하게 설정
        padding: "20px",
        backgroundColor: "lightgray",
        margin: "20px",
      }}
    >
      <p>이것은 스크롤 가능한 div입니다. 마우스 휠 스크롤이 비활성화됩니다.</p>
      <p>
        내용이 많아서 스크롤이 생길 수 있도록 많은 텍스트를 추가합니다. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
        id est laborum.
      </p>
      <p>
        더 많은 텍스트를 추가하여 스크롤 바가 확실히 나타나도록 합니다. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
        id est laborum.
      </p>
    </div>
  );
};

export default ScrollPreventedDiv;
