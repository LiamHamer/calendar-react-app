import './index.css';

// basic implementation of a date component that handles conversion between date strings and date objects 
function Datepicker(props: { dateValue: Date, onChange: (value: Date) => void }) {
    const offset = props.dateValue.getTimezoneOffset()
    const dateString = new Date(props.dateValue.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0]

    const onDateChange = (event: any) => {
        const dateValue = new Date(event.target.value);
        props.onChange(dateValue);
    }

    return (
        <input value={dateString} type="date" onChange={onDateChange} />
    )
}

export default Datepicker