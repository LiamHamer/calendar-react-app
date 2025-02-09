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
            const comparisionDate = new Date(currentDate);
            comparisionDate.setHours(0, 0, 0);
            console.log(currentDate.getDay())
            const filtered = events.filter((e) =>
                // if start dates match (regardless of event time)
                e.start.toDateString() === currentDate.toDateString()
                ||
                // events on the same day of the week
                (e.recurring === 'weekly'
                    && e.start <= comparisionDate
                    && e.start.getDay() === currentDate.getDay())
                ||
                (e.recurring === 'monthly'
                    && e.start <= comparisionDate
                    && e.start.getDay() === currentDate.getDay()
                    && e.start.getMonth() !== currentDate.getMonth())
                ||
                // events on same day week, month in a  future year 
                (e.recurring === 'anually'
                    && e.start <= comparisionDate
                    && e.start.getDay() === currentDate.getDay()
                    && e.start.getWeek() === currentDate.getWeek()
                    && e.start.getMonth() === currentDate.getMonth()
                )
            );
            console.log(filtered);
            setFilteredEvents(filtered);
        }
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