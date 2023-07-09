import axios from "axios"

export const BASE_URL = "https://todo-fb-1eaea-default-rtdb.firebaseio.com/"

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
})