import MainTemplate from "../../templates/maintemplate"
import CreateEvent from "../../organisms/createEvent"
import EventList from "../../organisms/eventlist"
import { useContext, useEffect, useState } from "react";
import { eventDetails } from "../../interfaces/eventDetails";
import { CurrentDateContext } from "../../../context/currentDateContext";

function Home() {

    const { currentDate } = useContext(CurrentDateContext);
    const [events, setEvents] = useState<eventDetails[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<eventDetails[]>([]);


    const updateEvents = (event: eventDetails) => {
        setEvents([...events,
            event
        ]);
    }
    useEffect(() => {
        //console.log('2', events)
        // console.log('filtered', events.filter((e) => e.start.getFullYear() === currentDate.getFullYear()));
        // setEvents({...events.filter((e) => e.start !== null)})
    }, [currentDate, events]);

    return (
        <MainTemplate>
            <CreateEvent onEventCreated={updateEvents} />
            <EventList events={events} />
        </MainTemplate>
    )
}

export default Home