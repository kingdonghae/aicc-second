import {useWeekSelector} from "@/pages/rank/hook/UseWeekSelector.jsx";

export default function WeekSelector({value,onChange,label}) {

    return (
        <div className='calendar'>
            <div style={{ position: "relative", display: "inline-block" }}>
                <input
                    type="text"
                    readOnly
                    id='week-rank'
                    value={label}
                    onClick={() => {
                        document.getElementById("week-hidden").showPicker?.();
                    }}
                    style={{
                        backgroundColor: "white",
                        border: "2px solid black",
                        textAlign: "left",
                    }}
                    onChange={onChange}
                />
                <img
                    src="./assets/calender.png"
                    alt="calender"
                    width="18"
                    style={{
                        position: "absolute",
                        right: "35px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none"
                    }}
                />
            </div>
            <input
                type="week"
                id="week-hidden"
                value={value}
                onChange={onChange}
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
