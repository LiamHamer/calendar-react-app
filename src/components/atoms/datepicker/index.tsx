import { useEffect, useState } from 'react';
import './index.css';

function Datepicker(props: { dateValue: Date, onChange: (value: Date) => void }) {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (props.dateValue) {
            const dateString = props.dateValue.toISOString().split('T')[0]
            setValue(dateString);
        }
    }, [props.dateValue]);

    const onDateChange = (event: any) => {
        const dateValue = new Date(event.target.value);
        props.onChange(dateValue);
    }

    return (
        <input value={value} type="date" onChange={onDateChange} />
    )
}

export default Datepicker