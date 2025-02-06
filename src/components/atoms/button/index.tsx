
function Button(props: { label: string, onClick: any }) {
    return (
        <button type="button" onClick={props.onClick}>{props.label}</button>
    )
}

export default Button