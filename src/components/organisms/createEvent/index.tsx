"use client";
import { useActionState, useContext } from "react";
import EventForm from "../../molecules/eventform"
import { eventDetails } from "../../interfaces/eventDetails";
import { CurrentDateContext } from "../../../context/currentDateContext";

interface formState {
    data: eventDetails,
    error: null
}

function CreateEvent(props: { onEventCreated: any }) {

    const { currentDate } = useContext(CurrentDateContext);
    const defaultDate = currentDate.toLocaleDateString("en-CA", { hour: '2-digit', minute: '2-digit', hourCycle: 'h24' }).replace(', ', 'T');
    //const defaultEndDate = currentDate.toLocaleDateString("en-CA", { hour: '2-digit', minute: '2-digit', hourCycle: 'h24' }).replace(', ', 'T');


    // '0004-04-04T16:44'

    const onFormSubmit = (
        prevState: any,
        formData: any,
    ) => {

        const event: any = Object.fromEntries(formData.entries())
        event.id = Math.floor(Math.random() * (1 - 100000 + 1)) + 100000;

        props.onEventCreated(event);

        return { data: Object.fromEntries(formData.entries()), error: null };
    }

    const [state, formAction, isPending] = useActionState(onFormSubmit, { data: {}, error: null });

    return (
        <section>
            <h4>New Event</h4>
            <EventForm formState={state} formAction={formAction} defaultDate={defaultDate} ></EventForm>
        </section>
    )
}

export default CreateEvent