/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, Injectable } from '@angular/core';
import { AppState } from './app.service';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class TaskService{
  tasks;

  constructor(private _http: Http){}

  getTasks(){
    var aPromise =  this._http.get("http://localhost:3000/tasks.json")
                    .map((response: Response) => response.json().data)
                    .toPromise();
    aPromise.then(tasksFromServer => this.tasks = tasksFromServer);
  }

   addTask(task){
    this.tasks.push(task)
  }

}

@Component({
  selector: 'tasks',
  providers: [TaskService],
  template: `
  <h1 [class.blue] = "toggle"> Task List Application </h1>
  <input [(ngModel)]="newTask.title">
  <button (click)="onSubmit(newTask)">Add New Task</button>
    <ul>
    <li *ngFor= "let task of taskService.tasks">
      <span [class.completed]="task.completed">{{ task.title }} - {{ task.completed }}</span>
      <button (click)="completeTask(task)">Click to Complete</button>
    </li>
    </ul>
  `,

  styles:[".red { color: red; }", ".blue { color: blue; }", ".completed {color: green;}"]
})
export class TasksComponent {
  newTask;
  constructor(public taskService: TaskService) { 
    this.newTask = {title: "", completed: false}
  }
  toggle: boolean = true;

  ngOnInit(){  
    this.taskService.getTasks()    
  }

  completeTask(task){
    task.completed = true;
  }

  onSubmit(task){
    this.taskService.addTask(task)
    this.newTask = {title: "", completed: false}
  }

}

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  url = 'https://twitter.com/coderaga';

  constructor(
    public appState: AppState) {

  }
  ngOnInit() {

  }
}
