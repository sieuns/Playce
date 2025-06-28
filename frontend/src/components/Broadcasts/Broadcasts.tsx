import getDaysInMonth from "../../utils/getDaysInMonth";
import Calendar from "./Calendar";
import TabList from "./TabLists";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Broadcasts = () => {
  // 날짜 설정
  const today = new Date();
  const yearNum = today.getFullYear();
  const monthNum = today.getMonth();
  const dateNum = today.getDate();
  const dayNum = today.getDay();
  const oneMonthBefore = new Date(yearNum, monthNum - 1 - 1);
  const oneMonthAfter = new Date(yearNum, monthNum - 1 + 1);
  const twoMonthsBefore = new Date(yearNum, monthNum - 2);
  const twoMonthsAfter = new Date(yearNum, monthNum + 2);

  const [year, setYear] = useState(yearNum);
  const [month, setMonth] = useState(monthNum + 1);
  const [date, setDate] = useState(dateNum);

  const isInTwoMonths = (year: number, month: number) => {
    const target = new Date(year, month - 1);
    const twoMonthsAgo = new Date(yearNum, monthNum - 2);
    const twoMonthsLater = new Date(yearNum, monthNum + 2);
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
    <div className="p-5 ">
      <div className="flex items-center justify-center text-[25px] gap-3">
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
          <MdKeyboardArrowLeft></MdKeyboardArrowLeft>
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
      <TabList />
      <Calendar />
    </div>
  );
};

export default Broadcasts;
