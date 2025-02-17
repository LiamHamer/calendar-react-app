import MainTemplate from "../../templates/maintemplate"
import CreateEvent from "../../organisms/createEvent"
import EventList from "../../organisms/eventlist"
import { useContext, useMemo, useReducer } from "react";
import { eventDetails } from "../../interfaces/eventDetails";
import { CurrentDateContext } from "../../../context/currentDateContext";
import { useQuery } from "@tanstack/react-query";

enum ACTIONS {
    ADD_EVENT = 'add-event',
    DELETE_EVENT = 'delete-event',
    EDIT_EVENT = 'edit-event'
}

interface eventAction {
    type: ACTIONS;
    payload: eventDetails
}

function eventsReducer(events: eventDetails[], action: eventAction) {
    console.log(action)
    switch (action.type) {
        case ACTIONS.ADD_EVENT:
            return [...events, action.payload]
        case ACTIONS.DELETE_EVENT:
            return events.filter((event) => event.id !== action.payload.id)
        default:
            return events
    }
}

function Home() {

    const [events2, dispatch] = useReducer(eventsReducer, [])

    console.log(events2);

    const { currentDate } = useContext(CurrentDateContext);
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
    // calculate what events occour on the selected date
    const todaysEvents = useMemo(() => {
        const filteredEvents: eventDetails[] = [];
        if (moonEvents) {
            filteredEvents.push(...moonEvents.filter((me) => me.start.toDateString() === currentDate.toDateString()));
        }
        if (events2) {
            const comparisonDate = new Date(currentDate);
            comparisonDate.setHours(0, 0, 0)
            const filtered = events2.filter((e) => {
                const eventDate = new Date(e.start)
                eventDate.setHours(0, 0, 0);
                const dayDiff = Math.round((comparisonDate.getTime() - eventDate.getTime()) / (1000 * 3600 * 24));
                // check for events that start on the same date
                return dayDiff === 0 ||
                    // calculate if recurring events should be shown on the currently selected date
                    // for weekly, filter events that are on the same day
                    e.recurring === 'weekly' && Number.isInteger(dayDiff / 7) ||
                    // for monthly, filter events that are on the same day, every 4 weeks 
                    e.recurring === 'monthly' && Number.isInteger(dayDiff / 28) ||
                    // for anual, filter events that are on the same date of year 
                    e.recurring === 'anually' && Number.isInteger(dayDiff / 365);
            }
            );
            filteredEvents.push(...filtered);
        }
        return filteredEvents.sort();
    }, [currentDate, events2, moonEvents]);


    const onEventCreated = (event: eventDetails) => {
        dispatch({ type: ACTIONS.ADD_EVENT, payload: event })
    }

    const onDelete = (event: eventDetails) => {
        dispatch({ type: ACTIONS.DELETE_EVENT, payload: event })
    }

    return (
        <MainTemplate>
            <CreateEvent onEventCreated={onEventCreated} />
            <EventList events={todaysEvents} onDelete={onDelete} />
        </MainTemplate>
    )
}

export default Home