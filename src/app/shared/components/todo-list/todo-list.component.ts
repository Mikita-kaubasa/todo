import { Component, OnInit } from '@angular/core';
import {Todo} from "../../interfaces/todo.model";
import {CommonModule, NgFor, NgIf} from "@angular/common";
import {MOCKED_TODOS} from "../../mock/todo.mock";
import {AddTodoModalComponent} from "../../modals/add-todo-modal/add-todo-modal.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {filter, take} from "rxjs";
import {MaterialModule} from "../../dependencies/material.module";
import {Store} from "@ngrx/store";
import {booksSelector} from "../../../store/selectors/todo.selectors";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {addBook, deleteBook} from "../../../store/actions/todo.actions";


@Component({
  standalone: true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [
    MaterialModule,
    CommonModule,
    NgIf,
    NgFor,
    AddTodoModalComponent,
  ]
})
export class TodoListComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private store: Store,
  ) {}

  public dataSource: Todo[] = [];
  public displayedColumns: string[] = ['title', 'author', 'year', 'delete']

  public ngOnInit(): void {

    this.store.select(booksSelector)
      // .pipe(takeUntilDestroyed())
      .subscribe(books => {
        this.dataSource = [...books]
      });
  }

  public openModal(): void {
      const dialogRef = this.dialog.open(AddTodoModalComponent);

    dialogRef.afterClosed()
      .pipe(filter((todo) => !!todo))
      .subscribe(todo => this.addTodo(todo));
  }

  public deleteTodo(id: number): void {
    this.store.dispatch(deleteBook({id}));
  }

  private addTodo(todo: Todo): void {
    const newTodo = {...todo, id: Date.now()};
    this.store.dispatch(addBook(newTodo));
  }



}
