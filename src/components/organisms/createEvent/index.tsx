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

    const onFormSubmit = (
        prevState: any,
        formData: any,
    ) => {

        const event: any = Object.fromEntries(formData.entries())

        props.onEventCreated(event);

        return { data: Object.fromEntries(formData.entries()), error: null };
    }

    const [state, formAction, isPending] = useActionState(onFormSubmit, { data: {}, error: null });

    return (
        <section>
            <h3>Create new Event</h3>
            <EventForm formState={state} formAction={formAction} defaultDate={currentDate} ></EventForm>
        </section>
    )
}

export default CreateEvent