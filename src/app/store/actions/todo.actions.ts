import {createAction, props} from "@ngrx/store";
import {Todo} from "../../shared/interfaces/todo.model";

export const addBook = createAction('[BOOKS] add book', props<Todo>());

export const deleteBook = createAction('[BOOKS] delete book', props<{id: number}>());
