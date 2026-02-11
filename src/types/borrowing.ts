export interface Room{
    id: number
    name: string
    location: string
}

export interface TimeRange{
    startDate: string
    endDate: string
    startTime: string
    endTime: string
}

export interface BorrowingBatch{
    id:string
    rooms: Room[]
    schedule: TimeRange
} 