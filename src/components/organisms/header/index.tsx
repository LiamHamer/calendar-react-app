import { useContext } from "react";
import Datepicker from "../../atoms/datepicker"
import { CurrentDateContext } from "../../../context/currentDateContext";

function Header() {
    const { currentDate, setCurrentDate } = useContext(CurrentDateContext);
    const datestring: string = currentDate.toLocaleDateString(undefined, { dateStyle: 'long' });

    const onDateChange = (value: any) => {
        setCurrentDate(new Date(value));
    }

    const headerStyle = {
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        gridGap: '16px',
    }

    return (
        <header style={headerStyle}>
            <h1>Super cool calandar app</h1>
            <div>
                <h2>{datestring}</h2>
                <Datepicker value={currentDate.toLocaleDateString("en-CA")} onChange={onDateChange} />
            </div>
        </header>
    )
}

export default Header