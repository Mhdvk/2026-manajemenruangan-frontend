import type { Borrowing } from "../types/borrowing"

interface QueryParams {
  search: string
  startDate: string
  endDate: string
  sortBy:
    | "status"
    | "startTime"
    | "borrowerName"
    | "roomName"
}

export function queryBorrowings(
  borrowings: Borrowing[],
  params: QueryParams
) {
  let result = [...borrowings]

  if (params.search) {
    const keyword = params.search.toLowerCase()
    result = result.filter(
      (b) =>
        b.borrowerName.toLowerCase().includes(keyword) ||
        b.room.name.toLowerCase().includes(keyword)
    )
  }

  if (params.startDate && params.endDate) {
    const start = new Date(params.startDate)
    const end = new Date(params.endDate)

    result = result.filter((b) => {
      const borrowingStart = new Date(b.startTime)
      return borrowingStart >= start && borrowingStart <= end
    })
  }

  result.sort((a, b) => {
    switch (params.sortBy) {
      case "borrowerName":
        return a.borrowerName.localeCompare(b.borrowerName)

      case "roomName":
        return a.room.name.localeCompare(b.room.name)

      case "startTime":
        return (
          new Date(a.startTime).getTime() -
          new Date(b.startTime).getTime()
        )

      case "status":
        return a.status - b.status

      default:
        return 0
    }
  })

  return result
}
