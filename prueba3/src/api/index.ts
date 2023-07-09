import axios from "axios";
import { TodoAll } from "../interfaces/interfaces";

export const jsonPlaceHolderAPI = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})


export const getTodos = async () => {
  return await jsonPlaceHolderAPI.get<TodoAll[]>('/todos')
}

export const createTodos = async (body: TodoAll) => {
  return await jsonPlaceHolderAPI.post<any[]>('/todos', body)
}

export const updateTodos = async (body: TodoAll, id: number) => {
  return await jsonPlaceHolderAPI.put<any[]>(`/todos/${id}`, body)
}

export const removeTodos = async (id: number) => {
  return await jsonPlaceHolderAPI.delete<any[]>(`/todos/${id}`)
}
