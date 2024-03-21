export interface Tickets {
    tickets: Ticket[]
}

export interface Ticket {
    ticketID: string
    gameName: string
    purchaseDate: Date
    pickedNumbers: number[]
}