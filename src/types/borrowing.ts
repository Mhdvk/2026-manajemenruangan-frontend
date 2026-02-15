import type { Room } from "./room"
export interface CreateBorrowingDto {
  borrowerName: string
  startTime: string
  endTime: string
  roomId: number
  tujuan: string
}

export interface UpdateBorrowingDto {
  borrowerName: string
  startTime: string
  endTime: string
  roomId: number
  tujuan: string
}

export interface Borrowing {
  id: number
  borrowerName: string
  startTime: string
  endTime: string
  status: number
  tujuan: string
  room: Room
}