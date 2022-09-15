import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewTask, Task, TaskStatus } from '../interfaces/task.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

    apiURL = environment.taskAPIUrl
    endpoint = "/tasks"

  constructor(public http: HttpClient) { }

  getTasks(){
    return this.http.get<Task[]>(`${this.apiURL}${this.endpoint}`)
  }

  postTask(task: NewTask){
    return this.http.post<Task>("http://localhost:3000/tasks", task)
  }

  updateTask(task: Task){
    return this.http.put<Task>(`http://localhost:3000/tasks/${task._id}`, task)
  }

  deleteTask(task: Task){
    return this.http.delete<Task>(`http://localhost:3000/tasks/${task._id}`)
  }

  validateTask(task: Task):boolean{
    if(task.status && TaskStatus[task.status]){
        return true
    }else {
        return false
    }
  }

  filterTaskById(tasks: Task[], taskToFilter: Task): Task[]{
    return tasks.filter((task)=> taskToFilter._id !== task._id)
  }

  updateTasks(tasks: Task[], taskToUpdate: Task): Task[]{
    return tasks.map((task)=> {
        if(task._id == taskToUpdate._id){
            return taskToUpdate
        }else{
            return task
        }
    })
  }

}