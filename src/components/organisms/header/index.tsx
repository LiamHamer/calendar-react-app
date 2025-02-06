import { useContext } from "react";
import Datepicker from "../../atoms/datepicker"
import { CurrentDateContext } from "../../../context/currentDateContext";

function Header() {
    const { currentDate, setCurrentDate } = useContext(CurrentDateContext);
    const datestring: string = currentDate.toLocaleDateString(undefined, { dateStyle: 'long' });

    const onDateChange = (value: any) => {
        setCurrentDate(new Date(value));
    }

    return (
        <header>
            <h1>Super cool calandar app</h1>
            <h2>{datestring}</h2>
            <Datepicker onChange={onDateChange} />
        </header>
    )
}

export default Header