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
            const comparisonDate = new Date(currentDate);
            comparisonDate.setHours(0, 0, 0)
            const filtered = events.filter((e) => {
                const eventDate = new Date(e.start)
                eventDate.setHours(0, 0, 0);
                const dayDiff = Math.round((comparisonDate.getTime() - eventDate.getTime()) / (1000 * 3600 * 24));
                // straight match on date difference 
                return dayDiff === 0 ||
                    // same day every week
                    e.recurring === 'weekly' && Number.isInteger(dayDiff / 7) ||
                    // same day, every 4 weeks 
                    e.recurring === 'monthly' && Number.isInteger(dayDiff / 28) ||
                    // same date of year 
                    e.recurring === 'anually' && Number.isInteger(dayDiff / 365);
            }
            );
            filteredEvents.push(...filtered);
        }
        return filteredEvents.sort();
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