import type { BorrowingBatch } from "../types/borrowing";

export function createBorrowingBatch(
    rooms: BorrowingBatch["rooms"],
    schedule: BorrowingBatch["schedule"]
): BorrowingBatch{
    return {
        id: crypto.randomUUID(),
        rooms,
        schedule
    }
}