import { api } from "./axiosInstance"
import type {
  Borrowing,
  CreateBorrowingDto,
  UpdateBorrowingDto
} from "../types/borrowing"

export const getAllBorrowings = async (): Promise<Borrowing[]> => {
  const { data } = await api.get("/borrowings")
  return data
}

export const getBorrowingById = async (id: number): Promise<Borrowing> => {
  const { data } = await api.get(`/borrowings/${id}`)
  return data
}

export const createBorrowing = async (dto: CreateBorrowingDto) => {
  const { data } = await api.post("/borrowings", dto)
  return data
}

export const updateBorrowing = async (
  id: number,
  dto: UpdateBorrowingDto
) => {
  const { data } = await api.put(`/borrowings/${id}`, dto)
  return data
}

export const approveBorrowing = async (id: number) => {
  const { data } = await api.patch(`/borrowings/${id}/approve`)
  return data
}

export const rejectBorrowing = async (id: number) => {
  const { data } = await api.patch(`/borrowings/${id}/reject`)
  return data
}

export const deleteBorrowing = async (id: number) => {
  const { data } = await api.delete(`/borrowings/${id}`)
  return data
}
