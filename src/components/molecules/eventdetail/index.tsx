import { eventDetails } from "../../interfaces/eventDetails"

function EventDetail(props: { event: eventDetails }) {
    return (
        <dl>
            <dt>
                Event: {props.event.title}
            </dt>
            <dd>description {props.event.description}</dd>
            <dd>Start time: {props.event.start.toString()}</dd>
            <dd>End time: {props.event.end.toString()}</dd>
        </dl>
    )
}

export default EventDetail