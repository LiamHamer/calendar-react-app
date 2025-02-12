import { useState } from "react"

function EventForm(props: { formState: any, formAction: any }) {

    // should belong to a dateRange molecule
    const [minDate, setMinDate] = useState(props.formState.data.startDate)

    const onDateStartChange = (event: any) => {
        setMinDate(event.target.value);
    }

    return (
        <form action={props.formAction}  >
            <fieldset>
                <legend>Details</legend>
                <label htmlFor="title">Title</label>
                <input name="title" id="title" type="text" defaultValue={props.formState.data.title} required></input>
                <br />
                <label htmlFor="description">Description</label>
                <input name="description" id="description" type="text" defaultValue={props.formState.data.description} required></input>
            </fieldset>
            <fieldset>
                <legend>Dates</legend>
                <label htmlFor="start">Start</label>
                <input name={'start'} id={'start'} defaultValue={props.formState.data.startDate} type="datetime-local" onChange={onDateStartChange} />
                <br />
                <label htmlFor="end">End</label>
                <input name={'end'} id={'end'} defaultValue={props.formState.data.endDate} type="datetime-local" min={minDate} />
            </fieldset>
            <fieldset>
                <legend>Setttings</legend>
                <label htmlFor="recurring">Recurring</label>
                <select name="recurring" id="recurring" defaultValue={props.formState.data.recurring}>
                    <option value="no">No</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="anually">Anually</option>
                </select>
            </fieldset>
            <button type="submit" >Create Event</button>
        </form>
    )
}

export default EventForm