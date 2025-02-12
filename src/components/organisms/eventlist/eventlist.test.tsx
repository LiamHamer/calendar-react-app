import { render, screen } from '@testing-library/react'
import EventList from '.'
import { eventDetails } from '../../interfaces/eventDetails';

test('renders empty state', () => {
    render(<EventList events={[]} />)

    const element = screen.getByTestId("empty-state");
    expect(element).toBeDefined()
})

test('renders an event', () => {
    const events: eventDetails[] = [
        {
            id: 1,
            start: new Date(),
            end: new Date(),
            title: 'test event',
            description: 'test description',
            recurring: 'no'
        }
    ];

    render(<EventList events={events} />)

    const element = screen.getByText('Event: test event')

    expect(element).toBeDefined()
})