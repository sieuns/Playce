import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import getDay from "../../../../utils/getDay";
import getDaysInMonth from "../../../../utils/getDaysInMonth";
import { useRef, useEffect } from "react";

interface TabListProps {
  year: number;
  month: number;
  date: number;
}

const TabList = ({ year, month, date }: TabListProps) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 150;

  // 각 날짜 div에 대한 참조
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map()); // Map의 값 타입을 HTMLDivElement로 좀 더 명확히 지정

  const handleScrollLeft = () => {
    if (tabRef.current) {
      tabRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (tabRef.current) {
      tabRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // 오늘 날짜를 중앙에 배치
  useEffect(() => {
    if (tabRef.current) {
      const targetItem = itemRefs.current.get(date);

      if (targetItem) {
        const scrollContainer = tabRef.current;
        const containerWidth = scrollContainer.clientWidth;
        const itemWidth = targetItem.clientWidth;
        const itemOffsetLeft = targetItem.offsetLeft;

        const scrollToPosition =
          itemOffsetLeft - containerWidth / 2 + itemWidth / 2;

        scrollContainer.scrollTo({
          left: scrollToPosition,
          behavior: "smooth",
        });
      }
    }
  }, [year, month, date]);

  return (
    <div className="flex items-center justify-center">
      <button
        className="hover:cursor-pointer text-[25px] disabled:text-lightgray mr-5 outline-none"
        onClick={() => handleScrollLeft()}
      >
        <MdKeyboardArrowLeft />
      </button>
      <div
        className="flex gap-3 overflow-x-auto scrollbar-hide"
        style={{ maxWidth: "calc(100% - 60px)" }}
        ref={tabRef}
      >
        {Array.from(
          { length: getDaysInMonth(year, month) },
          (_, i) => i + 1
        ).map((d) => {
          return (
            <div
              key={d}
              ref={(el) => {
                if (el) {
                  itemRefs.current.set(d, el);
                } else {
                  itemRefs.current.delete(d);
                }
              }}
              className="flex flex-col justify-center items-center w-8 text-center flex-shrink-0"
            >
              <p className="text-[14px]">{getDay(year, month, d)}</p>
              <p className="text-[19px]">{d}</p>
            </div>
          );
        })}
      </div>
      <button
        className="hover:cursor-pointer text-[25px] disabled:text-lightgray ml-5 outline-none"
        onClick={() => handleScrollRight()}
      >
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
};

export default TabList;
