import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MaterialModule} from "../../dependencies/material.module";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validator, Validators} from "@angular/forms";
import {Todo} from "../../interfaces/todo.model";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

interface AddTodoForm {
  author: FormControl<string | null>;
  title: FormControl<string | null>;
  year: FormControl<number | null>;
}

@Component({
  selector: 'app-add-todo-modal',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.scss']
})
export class AddTodoModalComponent {

  public form = new FormGroup<AddTodoForm>({
    author: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    year: new FormControl(null, [Validators.required]),
  });

  public onAdd(): Omit<Todo, 'id'> {
    return this.form.value as unknown as Omit<Todo, 'id'> ;
  }

}
