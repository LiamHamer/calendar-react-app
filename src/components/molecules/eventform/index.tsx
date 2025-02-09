
function EventForm(props: { formState: any, formAction: any }) {
    return (
        <form action={props.formAction}  >
            <label htmlFor="title">Title</label>
            <input name="title" id="title" type="text" defaultValue={props.formState.data.title} required></input>
            <label htmlFor="description">Description</label>
            <input name="description" id="description" type="text" required></input>
            <fieldset>
                <legend>Dates</legend>
                <label htmlFor="start">Start</label>
                <input name={'start'} id={'start'} defaultValue={props.formState.data.startDate} type="datetime-local" />
                <label htmlFor="end">End</label>
                <input name={'end'} id={'end'} defaultValue={props.formState.data.endDate} type="datetime-local" />
            </fieldset>
            <button type="submit" >Create Event</button>
        </form>
    )
}

export default EventForm