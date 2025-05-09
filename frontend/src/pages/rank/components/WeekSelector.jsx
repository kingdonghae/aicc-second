import {useWeekSelector} from "@/pages/rank/hook/UseWeekSelector.jsx";

export default function WeekSelector() {
    const { weekValue, weekLabel, handleChange } = useWeekSelector();

    return (
        <div className='calendar'>
            <div style={{ position: "relative", display: "inline-block" }}>
                <input
                    type="text"
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
                        pointerEvents: "none"
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
