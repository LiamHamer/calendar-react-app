type Recurring = 'no' | 'weekly' | 'monthly' | 'anually'

export interface eventDetails {
    id: number,
    title: string,
    description: string,
    start: Date,
    end: Date,
    recurring: Recurring;
}