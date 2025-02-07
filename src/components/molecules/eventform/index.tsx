function EventForm(props: { formState: any, formAction: any, defaultDate: string }) {
    return (
        <form action={props.formAction}  >
            <label htmlFor="title">Title</label>
            <input name="title" id="title" type="text" required></input>
            <label htmlFor="description">Description</label>
            <input name="description" id="description" type="text" required></input>
            <fieldset>
                <legend>Dates</legend>
                <label htmlFor="start">Start</label>
                <input name="start" id="start" type="datetime-local" required value={props.defaultDate} onChange={e => { console.log('start', e.target.value) }}></input>
                <label htmlFor="end">End</label>
                <input name="end" id="end" type="datetime-local" required value={props.defaultDate} onChange={e => { console.log('end', e.target.value) }} ></input>
            </fieldset>
            <button type="submit" >Create Event</button>
        </form>
    )
}

export default EventForm