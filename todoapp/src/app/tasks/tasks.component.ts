import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public tasks:any;
  id ="";
  public newTask = {
    title:"",
    description:""
  }

  constructor(private taskService : TasksService) { }

  ngOnInit() {
    this.getTask();

  }
  getTask(){
    this.taskService.getTasks().subscribe(res=>{
      this.tasks = res;
    })
  }
  createTask(){
    this.taskService.createTasks(this.newTask).subscribe(res=>{
      this.cleanValues();
      this.getTask();

    });
  }
  deleteTask(id:any){
    this.taskService.deleteTasks(id).subscribe(res=>{
      this.getTask();
    })
  }
  setUpdate(t:any){
    this.id = t._id;
    this.newTask.title = t.title;
    this.newTask.description = t.description;
  }
  cleanValues(){
    this.id="";
    this.newTask = {
      title:"",
      description:""
    }
  }
  updateTask(){
    this.taskService.updateTasks(this.id,this.newTask).subscribe(res=>{
      this.cleanValues();
      this.getTask();
    })

  }




}
