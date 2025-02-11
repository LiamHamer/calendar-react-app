import MainTemplate from "../../templates/maintemplate"
import CreateEvent from "../../organisms/createEvent"
import EventList from "../../organisms/eventlist"
import { useContext, useMemo, useState } from "react";
import { eventDetails } from "../../interfaces/eventDetails";
import { CurrentDateContext } from "../../../context/currentDateContext";
import { useQuery } from "@tanstack/react-query";

function Home() {

    const { currentDate } = useContext(CurrentDateContext);
    const [events, setEvents] = useState<eventDetails[]>([]);
    const selectedYear = currentDate.getFullYear();
    const { data, isLoading, error } = useQuery({
        queryKey: ['newMoon', selectedYear],
        queryFn: () => fetch(`https://craigchamberlain.github.io/moon-data/api/new-moon-data/${selectedYear}`)
            .then(res => res.json()),
    });
    const moonEvents: eventDetails[] = useMemo(() => {
        if (data) {
            return data.map((d: any) => {
                return {
                    id: 1,
                    start: new Date(d),
                    end: new Date(d),
                    title: 'New Moon',
                    description: 'wow new moon',
                    recurring: 'no'
                }
            });
        }
    }, [data])
    const todaysEvents = useMemo(() => {
        const filteredEvents: eventDetails[] = [];
        if (moonEvents) {
            filteredEvents.push(...moonEvents.filter((me) => me.start.toDateString() === currentDate.toDateString()));
        }
        if (events) {
            const comparisionDate = new Date(currentDate);
            comparisionDate.setHours(0, 0, 0);
            const filtered = events.filter((e) =>
                // if start dates match (regardless of event time)
                e.start.toDateString() === currentDate.toDateString()
                ||
                // weekly = repeat on a given day of the week
                (e.recurring === 'weekly'
                    && e.start <= comparisionDate
                    && e.start.getDay() === currentDate.getDay())
                ||
                // monthly = repeat on the same day every 4th week 
                (e.recurring === 'monthly'
                    && e.start <= comparisionDate
                    && e.start.getDay() === currentDate.getDay()
                    && (e.start.getWeek() - comparisionDate.getWeek()) / 4 % 1 === 0
                )
                ||
                // anually = once a year on the same date, regardless of day 
                (e.recurring === 'anually'
                    && e.start <= comparisionDate
                    && e.start.getDate() === currentDate.getDate()
                    && e.start.getMonth() === currentDate.getMonth()
                )
            );
            filteredEvents.push(...filtered);
        }
        return filteredEvents;
    }, [currentDate, events, moonEvents]);

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
            <EventList events={todaysEvents} />
            <CreateEvent onEventCreated={onEventCreated} />
        </MainTemplate>
    )
}

export default Home