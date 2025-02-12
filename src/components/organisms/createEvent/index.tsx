import { useActionState, useContext } from "react";
import EventForm from "../../molecules/eventform"
import { eventDetails } from "../../interfaces/eventDetails";
import { CurrentDateContext } from "../../../context/currentDateContext";

function CreateEvent(props: { onEventCreated?: (any) }) {

    const { currentDate } = useContext(CurrentDateContext);
    // convert selected date into useable format for the html input, would use a date picker component to handle this 
    const dateString = currentDate.toLocaleDateString("en-CA", { hour: '2-digit', minute: '2-digit', hourCycle: 'h24' }).replace(', ', 'T');

    const defaultFormState = {
        title: '',
        description: '',
        startDate: dateString,
        endDate: dateString,
        recurring: 'no'
    }

    // event creation
    const onFormSubmit = async (
        prevState: any,
        formData: FormData,
    ) => {
        //pretend to call api
        await new Promise(r => setTimeout(r, 300));

        const formEntries: any = Object.fromEntries(formData.entries());
        const newEvent: eventDetails = {
            id: 1,
            title: formEntries.title,
            description: formEntries.description,
            start: new Date(formEntries.start),
            end: new Date(formEntries.end),
            recurring: formEntries.recurring
        }
        props.onEventCreated(newEvent);

        // reset form back to default state
        return { data: defaultFormState };
    }

    const [state, formAction, isPending] = useActionState(onFormSubmit, { data: defaultFormState });

    if (isPending) {
        return (
            <section>
                Saving......
            </section>
        )
    }

    return (
        <section>
            <h3>Create new Event</h3>
            <EventForm formState={state} formAction={formAction}></EventForm>
        </section>
    )
}

export default CreateEvent