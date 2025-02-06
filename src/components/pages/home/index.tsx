import MainTemplate from "../../templates/maintemplate"
import CreateEvent from "../../organisms/createEvent"
import EventList from "../../organisms/eventlist"

function Home() {
    return (
        <MainTemplate>
            <CreateEvent />
            <EventList />
        </MainTemplate>
    )
}

export default Home