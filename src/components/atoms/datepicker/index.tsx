import './index.css';

function Datepicker(props: { onChange: any }) {
    return (
        <input type="date" onChange={e => props.onChange(e.target.value)} />
    )
}

export default Datepicker