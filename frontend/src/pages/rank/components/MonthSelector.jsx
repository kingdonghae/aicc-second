export default function MonthSelector({ value,onChange }) {

    return (
        <div className='calendar'>
            <input
                type="month"
                id='month-rank'
                value={value}
                onChange={onChange}
                style={{
                    backgroundColor: 'white',
                    border: '1px solid black',
                    paddingLeft: '30px'
                }}
            />
            <p>달력을 열어 기간을 설정해보세요 ▲</p>
        </div>
    );
}
