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

    useEffect(() => {
        if(events)
        {
            setFilteredEvents(events);
        }
        // console.log('filtered', events.filter((e) => e.start.getFullYear() === currentDate.getFullYear()));
        // setEvents({...events.filter((e) => e.start !== null)})
    }, [currentDate, events, setFilteredEvents]);

    const updateEvents = (event: eventDetails) => {
        setEvents([...events,
            event
        ]);
    }
    
    const onEventCreated = (event: eventDetails) => {
        // pretend to do api stuff
        updateEvents(event);
    }

    return (
        <MainTemplate>
            <CreateEvent onEventCreated={onEventCreated} />
            <EventList events={filteredEvents} />
        </MainTemplate>
    )
}

export default Home