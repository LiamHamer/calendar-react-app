import DateTimePicker from "../../atoms/datetimepicker";

function EventForm(props: { formState: any, formAction: any, defaultDate: Date }) {

    const startDate = new Date();
    const endDate = new Date();

    return (
        <form action={props.formAction}  >
            <label htmlFor="title">Title</label>
            <input name="title" id="title" type="text" required></input>
            <label htmlFor="description">Description</label>
            <input name="description" id="description" type="text" required></input>
            <fieldset>
                <legend>Dates</legend>
                <label htmlFor="start">Start</label>
                <DateTimePicker name="start" id="start" dateValue={props.defaultDate} onChange={(e) => console.log(e)} />
                <label htmlFor="end">End</label>
                <DateTimePicker name="end" id="end" dateValue={props.defaultDate} onChange={(e) => console.log(e)} />
            </fieldset>
            <button type="submit" >Create Event</button>
        </form>
    )
}

export default EventForm