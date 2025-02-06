import Button from "../../atoms/button"

function EventForm(props: { submitLabel: string, onSubmit: any }) {
    return (
        <form onSubmit={props.onSubmit}>
            <Button label={props.submitLabel} onClick={() => { }} />
        </form>
    )
}

export default EventForm