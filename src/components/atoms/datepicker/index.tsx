import './index.css';

function Datepicker(props: { value: string, onChange: any }) {
    return (
        <input value={props.value} type="date" onChange={e => props.onChange(e.target.value)} />
    )
}

export default Datepicker