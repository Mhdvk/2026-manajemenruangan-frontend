import { api } from "./axiosInstance";
import type { Room } from "../types/room";

export const getAllRooms = async (): Promise<Room[]> => {
  const { data } = await api.get("/rooms");
  return data;
};
