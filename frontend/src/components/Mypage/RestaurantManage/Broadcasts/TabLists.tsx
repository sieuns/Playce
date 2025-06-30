import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { getDay } from "../../../../utils/getDay";
import getDaysInMonth from "../../../../utils/getDaysInMonth";
import { useRef, useEffect } from "react";
import useBroadcastStore from "../../../../stores/broadcastStore";
import { dummyBroadcasts } from "../../../../data/dummyBroadcasts";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const TabList = () => {
  const { year, month, date, setDate } = useBroadcastStore();
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

  const dateArray = Array.from(
    { length: getDaysInMonth(year, month) },
    (_, i) => i + 1
  );

  const currentDate = `${year}-${String(month).padStart(2, "0")}-${String(
    date
  ).padStart(2, "0")}`;

  const broadcastsForSelectedDate = dummyBroadcasts
    .filter((b) => b.match_date === currentDate)
    .sort((a, b) => a.match_time.localeCompare(b.match_time)); // 시간 순 정렬

  // 오늘 날짜를 중앙에 배치
  useEffect(() => {
    if (tabRef.current) {
      const targetItem = itemRefs.current.get(date);

      if (targetItem) {
        const scrollContainer = tabRef.current;
        const containerWidth = scrollContainer.clientWidth;
        const itemOffsetLeft = targetItem.offsetLeft;

        const scrollToPosition = itemOffsetLeft - containerWidth / 2 - 100;

        scrollContainer.scrollTo({
          left: scrollToPosition,
          behavior: "smooth",
        });
      }
    }
  }, [year, month, date]);

  return (
    <div>
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
          {dateArray.map((d) => {
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
                className={`flex flex-col justify-center items-center w-8 text-center 
                flex-shrink-0 hover:cursor-pointer
                ${d === date ? "text-blue-500 font-bold" : "text-black"}`}
                onClick={() => setDate(d)}
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
      <div className="mt-4 space-y-2 border-t">
        {broadcastsForSelectedDate.length > 0 ? (
          broadcastsForSelectedDate.map((b, idx) => (
            <div className="flex justify-between border-b">
              <div
                key={idx}
                className="p-3 flex flex-col text-[15px] w-0 flex-1"
              >
                <span className="font-semibold truncate">
                  [{b.league}] {b.match_time}
                </span>
                <span className="text-[18px] truncate">
                  {b.team_one} vs {b.team_two}
                </span>
                {b.etc && (
                  <span className="text-darkgray truncate">{b.etc}</span>
                )}
              </div>
              <div className="p-3 flex text-[25px] gap-6 items-center shrink-0">
                <FaEdit />
                <FaRegTrashAlt />
              </div>
            </div>
          ))
        ) : (
          <div className="p-3">중계 정보가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default TabList;
