import getDaysInMonth from "../../../../utils/getDaysInMonth";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import TabList from "./TabLists";
import { FaBars, FaPlus, FaRegCalendarAlt } from "react-icons/fa";
import useBroadcastStore, { dateInfo } from "../../../../stores/broadcastStore";
import Calendar from "./Calendar";
import { useState } from "react";
import BroadcastFormModal from "../modals/BroadcastFormModal";

const BroadcastView = () => {
  // 날짜 설정
  const { yearNum, monthNum } = dateInfo;
  const twoMonthsAgo = new Date(yearNum, monthNum - 2);
  const twoMonthsLater = new Date(yearNum, monthNum + 2);

  const { year, month, viewOption, setYear, setMonth, setDate, setViewOption } =
    useBroadcastStore();

  const isInTwoMonths = (year: number, month: number) => {
    const target = new Date(year, month - 1);

    return target >= twoMonthsAgo && target <= twoMonthsLater;
  };

  const handleLeft = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (month === 1) {
      newMonth = 12;
      newYear -= 1;
    }
    setYear(newYear);
    setMonth(newMonth);
    setDate(getDaysInMonth(newYear, newMonth));
  };

  const handleRight = () => {
    let newMonth = month + 1;
    let newYear = year;
    if (month === 12) {
      newMonth = 1;
      newYear += 1;
    }
    setYear(newYear);
    setMonth(newMonth);
    setDate(1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col p-3">
      <div className="flex text-[28px] items-center justify-between mb-5 gap-3">
        {/* 중앙 맞추기용 사용하지 않는 버튼 */}
        <button className="text-[25px]" onClick={() => setIsModalOpen(true)}>
          <FaPlus />
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

        <button
          className="text-[25px]"
          onClick={() => {
            setViewOption(viewOption === "tab" ? "calendar" : "tab");
          }}
        >
          {viewOption === "tab" ? <FaRegCalendarAlt /> : <FaBars />}
        </button>
      </div>
      {viewOption === "tab" ? <TabList /> : <Calendar />}

      {isModalOpen && (
        <BroadcastFormModal
          mode="create"
          onSubmit={(data) => {
            // TODO: 등록 로직 (API 호출 등)
            console.log("중계 등록됨:", data);
            setIsModalOpen(false); // 모달 닫기
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BroadcastView;
