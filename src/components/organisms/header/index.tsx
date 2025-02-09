import { useContext } from "react";
import { CurrentDateContext } from "../../../context/currentDateContext";
import Datepicker from "../../atoms/datepicker";


function Header() {
    const { currentDate, setCurrentDate } = useContext(CurrentDateContext);
    const datestring: string = currentDate.toLocaleDateString(undefined, { dateStyle: 'long' });

    const onDateChange = (value: Date) => {
        setCurrentDate(value);
    }

    const headerStyle = {
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        gridGap: '16px',
    }

    return (
        <header style={headerStyle}>
            <h1>Super cool calendar app</h1>
            <div>
                <h2>{datestring}</h2>
                <Datepicker dateValue={currentDate} onChange={onDateChange} />
            </div>
        </header>
    )
}

export default Header