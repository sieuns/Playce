import { useState } from "react";
import getDaysInMonth from "../../../../utils/getDaysInMonth";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import TabList from "./TabLists";
import { FaRegCalendarAlt } from "react-icons/fa";

const BroadcastView = () => {
  // 날짜 설정
  const today = new Date();
  const yearNum = today.getFullYear();
  const monthNum = today.getMonth();
  const dateNum = today.getDate();
  const twoMonthsAgo = new Date(yearNum, monthNum - 2);
  const twoMonthsLater = new Date(yearNum, monthNum + 2);

  const [year, setYear] = useState(yearNum);
  const [month, setMonth] = useState(monthNum + 1);
  const [date, setDate] = useState(dateNum);

  const isInTwoMonths = (year: number, month: number) => {
    const target = new Date(year, month - 1);

    return target >= twoMonthsAgo && target <= twoMonthsLater;
  };

  const handleLeft = () => {
    if (month > 1) {
      setMonth(month - 1);
    } else {
      setYear(year - 1);
      setMonth(12);
    }
    setDate(getDaysInMonth(year, month));
  };

  const handleRight = () => {
    if (month < 12) {
      setMonth(month + 1);
    } else {
      setYear(year + 1);
      setMonth(1);
    }
    setDate(1);
  };

  return (
    <div className="flex flex-col p-3 gap-3">
      <div className="flex text-[28px] items-center justify-center mb-3 gap-3">
        {/* 중앙 맞추기용 사용하지 않는 버튼 */}
        <button className="rounded-xl text-[20px] text-white" disabled={true}>
          <FaRegCalendarAlt />
        </button>

        <div className="flex items-center gap-3">
          <button
            className="hover:cursor-pointer text-[35px] disabled:text-lightgray"
            onClick={() => handleLeft()}
            disabled={
              !isInTwoMonths(
                month > 1 ? year : year - 1,
                month > 1 ? month - 1 : 12
              )
            }
          >
            <MdKeyboardArrowLeft />
          </button>
          {year}.{month < 10 ? "0" + month.toString() : month}
          <button
            className="hover:cursor-pointer text-[35px] disabled:text-lightgray"
            onClick={() => handleRight()}
            disabled={
              !isInTwoMonths(
                month < 12 ? year : year + 1,
                month < 12 ? month + 1 : 1
              )
            }
          >
            <MdKeyboardArrowRight />
          </button>
        </div>

        <button className="rounded-xl text-[25px]" onClick={() => {}}>
          <FaRegCalendarAlt />
        </button>
      </div>
      <TabList year={year} month={month} date={date} />
    </div>
  );
};

export default BroadcastView;
