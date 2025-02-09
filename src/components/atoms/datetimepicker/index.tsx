import { useEffect, useState } from 'react';

function DateTimePicker(props: { dateValue: Date, name?: string, id?: string, onChange: (value: Date) => void }) {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (props.dateValue) {
            const dateString = props.dateValue.toLocaleDateString("en-CA", { hour: '2-digit', minute: '2-digit', hourCycle: 'h24' }).replace(', ', 'T');
            setValue(dateString);
        }
    }, [props.dateValue]);

    const onDateChange = (event: any) => {
        const dateValue = new Date(event.target.value);
        props.onChange(dateValue);
    }

    return (
        <input name={props.name} id={props.id} value={value}  type="datetime-local" onChange={onDateChange} />
    )
}

export default DateTimePicker