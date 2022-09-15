import { Component, OnInit } from '@angular/core';
import { NewTask, Task, TaskStatus } from '../interfaces/task.interface';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  fetchingTasks = false;
  newTask: String = '';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  getTasks() {
    this.fetchingTasks = true;
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
        this.fetchingTasks = false;
      },
      error: (err) => {
        this.fetchingTasks = false;
        console.error(err);
      },
    });
  }

  postTask(task: String = this.newTask) {
    let newTask: NewTask = {
      task,
    };
    this.taskService.postTask(newTask).subscribe({
      next: (res) => {
        this.tasks.push(res);
        this.newTask = '';
      },
      error: (err) => {
        this.getTasks();
        console.error(err);
      },
    });
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe({
      next: (res) => {
        task = res;
      },
      error: (err) => {
        this.getTasks();
        console.error(err);
      },
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe({
      next: (_) => {
        this.tasks = this.taskService.filterTaskById(this.tasks, task);
      },
      error: (err) => {
        this.getTasks();
        console.error(err);
      },
    });
  }

  changeTaskStatus(task: Task, status: string) {
    if (!TaskStatus[status]) return;
    let taskToUpdate: Task = {
      ...task,
      status,
    };
    this.taskService.updateTask(taskToUpdate).subscribe({
      next: (res) => {
        this.tasks = this.taskService.updateTasks(this.tasks, res);
      },
      error: (err) => {
        this.getTasks();
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this.getTasks();
  }
}
