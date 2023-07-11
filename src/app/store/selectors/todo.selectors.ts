import {createFeature, createSelector} from "@ngrx/store";
import {TodoState} from "../reducers/todo.reducer";

interface AppState {
  todo: TodoState;
}


export const booksSelector = (state: any) => {
  console.log('state', state)
  return state.todo.books
};

// export const booksSelector = createSelector(
//   todoFeatureSelector,
//   (feature: TodoState) => feature.books
// );
