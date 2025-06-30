import { DatePicker, TimePicker } from "antd";
import useBroadcastFormStore from "../../../../stores/broadcastFormStore";
import { sportsMap } from "../../../../data/sports";
import type { BroadcastFormData, BroadcastFormModalProps } from "../../../../types/broadcastForm";

const BroadcastFormModal = ({
  mode,
  onSubmit,
  onClose,
}: BroadcastFormModalProps) => {
  const {
    date,
    time,
    sport,
    league,
    team1,
    team2,
    note,
    setDate,
    setTime,
    setSport,
    setLeague,
    setteam1,
    setteam2,
    setNote,
    resetForm,
  } = useBroadcastFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !sport || !league) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const match_date = date.format("YYYY-MM-DD");
    const match_time = time.format("HH:mm");

    const data: BroadcastFormData = {
      match_date,
      match_time,
      sport,
      league,
      team_one: team1 ?? "",
      team_two: team2 ?? "",
      etc: note,
    };

    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
        <h3 className="text-xl font-bold mb-6">
          {mode === "edit" ? "중계 일정 수정" : "중계 일정 등록"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1">날짜</label>
              <DatePicker
                className="w-full"
                value={date}
                //다시 달력 눌렀을 때 초기화 후 달력 뜨는 문제 해결
                onChange={(v) => {
                  if (v) {
                    setDate(v);
                  }
                }}
                getPopupContainer={(trigger) =>
                  trigger.parentNode as HTMLElement
                }
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">시간</label>
              <TimePicker
                className="w-full"
                format="HH:mm"
                value={time}
                onChange={(v) => setTime(v)}
                getPopupContainer={(trigger) =>
                  trigger.parentNode as HTMLElement
                }
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">종목</label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full border rounded px-3 py-2 hover:border-primary5 focus:border-primary5 focus:ring-1 focus:ring-primary1 focus:outline-none"
            >
              <option value="">종목 선택</option>
              {Object.keys(sportsMap).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">리그</label>
            <select
              value={league}
              onChange={(e) => setLeague(e.target.value)}
              className="w-full border rounded px-3 py-2 hover:border-primary5 focus:border-primary5 focus:ring-1 focus:ring-primary1 focus:outline-none"
            >
              <option value="">리그 선택</option>
              {Object.keys(sportsMap[sport] ?? {}).map((league) => (
                <option key={league} value={league}>
                  {league}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1">팀 1</label>
              <input
                className="w-full border rounded px-3 py-2 hover:border-primary5 focus:border-primary5 focus:ring-1 focus:ring-primary1 focus:outline-none"
                value={team1 ?? ""}
                onChange={(e) => setteam1(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1">팀 2</label>
              <input
                className="w-full border rounded px-3 py-2 hover:border-primary5 focus:border-primary5 focus:ring-1 focus:ring-primary1 focus:outline-none"
                value={team2 ?? ""}
                onChange={(e) => setteam2(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">기타</label>
            <textarea
              className="w-full border rounded px-3 py-2 hover:border-primary5 focus:border-primary5 focus:ring-1 focus:ring-primary1 focus:outline-none"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 rounded bg-gray-100"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary5 text-white"
            >
              {mode === "edit" ? "수정" : "등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BroadcastFormModal;
