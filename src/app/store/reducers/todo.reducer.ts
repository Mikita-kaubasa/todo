import {Todo} from '../../shared/interfaces/todo.model'
import {createReducer, on} from "@ngrx/store";
import {addBook, deleteBook} from "../actions/todo.actions";
import {MOCKED_TODOS} from "../../shared/mock/todo.mock";

export interface TodoState {
  books: Todo[],
}

const initialState: TodoState = {
  books: MOCKED_TODOS
};


export const TodoReducer = createReducer(
  initialState,
  on(addBook, (state: TodoState, payload: Todo) => ({...state, books: [...state.books, payload]})),
  on(deleteBook, (state: TodoState, payload: { id: number }) => {
      const toDelete = state.books.findIndex((book) => Number(book.id) === Number(payload.id));
      const updatedBooks = [...state.books.slice(0, toDelete), ...state.books.slice(toDelete + 1)];
      return {...state, books: updatedBooks}
    }
  ),
)
