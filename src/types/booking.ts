export interface Booking {
  id: number
  roomName: string
  borrowerName: string
  date: string
  purpose: string
  status: number
  room: {
    id: number
    name: string
    location: string
  }
}
