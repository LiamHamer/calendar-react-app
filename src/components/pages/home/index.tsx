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
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())


    useEffect(() => {
        if (events) {
            const filtered = events.filter((e) =>
                new Date(e.start).getFullYear() === currentDate.getFullYear()
                && new Date(e.start).getMonth() === currentDate.getMonth()
                && new Date(e.start).getDay() === currentDate.getDay()
            );
            setFilteredEvents(filtered);
        }
        // console.log('filtered', events.filter((e) => new Date(e.start).getFullYear() === currentDate.getFullYear()));
        // setEvents({...events.filter((e) => e.start !== null)})
    }, [currentDate, setFilteredEvents, events]);

    useEffect(() => {
        if (currentDate) {
            setSelectedYear(currentDate.getFullYear());
        }
    }, [currentDate]);


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