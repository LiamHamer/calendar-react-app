import { eventDetails } from "../../interfaces/eventDetails"
import EventDetail from "../../molecules/eventdetail"

function EventList(props: { events: eventDetails[], onDelete?: (any) }) {
    const showEvents: boolean = props.events.length > 0;

    if (showEvents) {
        return (
            <section>
                <h3>Todays Events:</h3>
                <dl>
                    {props.events.map((event, i) => <article key={i}><EventDetail event={event} /><button onClick={() => props.onDelete(event)}>Delete Event</button></article>
                    )}
                </dl>
            </section>
        )
    }

    return (
        <section data-testid="empty-state">
            <h3>No Events on today :(</h3>
        </section>
    )


}

export default EventList