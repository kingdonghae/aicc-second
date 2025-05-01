import { useEffect, useState } from "react";

export default function WeekSelector() {
    const [weekValue, setWeekValue] = useState("");
    const [weekLabel, setWeekLabel] = useState("");

  const getISOWeekString = (date = new Date()) => {
    const tmp = new Date(date.getTime());
    tmp.setHours(0, 0, 0, 0);
    tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7));
    const week1 = new Date(tmp.getFullYear(), 0, 4);
    const weekNum = 1 + Math.round(((tmp - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
    return `${tmp.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
  };

  const getMonthWeekLabel = (weekStr) => {
    if (!weekStr) return "";
    const [year, weekPart] = weekStr.split("-W");
    const weekNum = parseInt(weekPart);
    const janFirst = new Date(year, 0, 1);
    const weekStart = new Date(janFirst);
    weekStart.setDate(janFirst.getDate() + (weekNum - 1) * 7);

    const month = weekStart.getMonth() + 1;
    const firstDayOfMonth = new Date(weekStart.getFullYear(), weekStart.getMonth(), 1);
    const weekOfMonth = Math.ceil((weekStart.getDate() + firstDayOfMonth.getDay()) / 7);

    return `${month}월 ${weekOfMonth}번째 주`;
  };

  useEffect(() => {
    const initialWeek = getISOWeekString();
    setWeekValue(initialWeek);
    setWeekLabel(getMonthWeekLabel(initialWeek));
  }, []);

  const handleChange = (e) => {
    const newVal = e.target.value;
    setWeekValue(newVal);
    setWeekLabel(getMonthWeekLabel(newVal));
  };

    return (
        <div className='calendar'>
            <div style={{ position: "relative", display: "inline-block" }}>
                <input type="text"
                       readOnly
                       id='week-rank'
                       value={weekLabel}
                       onClick={() => {
                           document.getElementById("week-hidden").showPicker?.();
                       }}
                       style={{
                           backgroundColor: "white",
                           border: "1px solid black",
                           textAlign: "left",
                       }}
                       onChange={handleChange}
                />
                <img
                    src="./assets/calender.png"
                    alt="calender"
                    width="20"
                    style={{
                      position: "absolute",
                      right: "2px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none" // 클릭 막음 (원할 경우 true로 변경)
                    }}
                  />
            </div>
            <input
                type="week"
                id="week-hidden"
                value={weekValue}
                onChange={handleChange}
                style={{
                    opacity: 0,
                    pointerEvents: "none",
                    width: 0,
                    height: 0,
                }}
            />
            <p>달력을 열어 기간을 설정해보세요 ▲</p>
        </div>
    );
}
