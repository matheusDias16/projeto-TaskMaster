import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';
import { ProjectService, Tproject, TTaskFull } from '../../shared/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeleteComponent } from '../../shared/components/modal-delete/modal-delete.component';

import swal from 'sweetalert';
@Component({
  selector: 'app-project-area',
  templateUrl: './project-area.component.html',
  styleUrl: './project-area.component.scss',
})
export class ProjectAreaComponent implements OnInit {
  idDaUrl: string = ''
  project!: Tproject;
  todo: TTaskFull[] = [];
  done: TTaskFull[] = [];
  title: string = '';
  editTaskId: string | undefined = '';
  taskTitle: string = '';
  
  constructor(
    private projectService: ProjectService,
    private rotaAtiva: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.idDaUrl = (this.rotaAtiva.snapshot.params['id'])
    this.getShow();

  }

  drop(event: CdkDragDrop<TTaskFull[]>, originList: string) {
    this.editTaskId = ''
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if (originList === 'todo') {
        this.todo = event.container.data;
        this.done = event.previousContainer.data;
        this.todo = this.todo.map(item => {
          return { ...item, completed: false}
        })
      } else {
        this.done = event.container.data;
        this.todo = event.previousContainer.data;
        this.done = this.done.map(item => {
          return { ...item, completed: true}
        })
      }   
    }    
    const newTasks = this.todo.concat(this.done);
    this.project.tasks = newTasks;
    this.updateProject();
  }

  getShow() {
    this.projectService.getShowProject(this.idDaUrl).subscribe({
      next: (sucess) => {
        this.project = sucess.project
        this.project.tasks.forEach((element) => {
          if (element.completed) {
            this.done.push(element)

          } else {
            this.todo.push(element)
          }
        })
      },
      error: (error) => {
        console.error(error)
      }
    })
  }
  
  updateProject() {
    this.projectService.putProject(this.project).subscribe({
      next: (sucess) => {
        this.project = sucess.project;
        this.done = [];
        this.todo = [];
        this.project.tasks.forEach((element) => {
          if (element.completed) {
            this.done.push(element)
          } else {
            this.todo.push(element)
          }
        })
      },
      error: (error) => {
        console.error(error)
        swal({
          title: "Erro!",
          text: 'Ocorreu um problema, tente novamente.',
          icon: "error",
        });
      }
    })
  }

  openDeleteProjectModal(id?: string): void {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        title: 'Excluir task?',
        message:
          'Atenção! Esta ação é definitiva!'
      },
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (!data || !id) return; 
      
      this.deleteTask(id)
    })
  }
  
  deleteTask(id: string) {
    const newTasks = this.project.tasks.filter((task) => task._id !== id)
    this.project.tasks = newTasks

    this.projectService.putProject(this.project).subscribe({
      next: (sucess) => {
        this.project = sucess.project;
        this.done = [];
        this.todo = [];
        this.project.tasks.forEach((element) => {
          if (element.completed) {
            this.done.push(element)
          } else {
            this.todo.push(element)
          }
        })

        swal({
          title: "Task excluida!",
          text: 'Task excluída com sucesso!',
          icon: "success",
        });
      },
      error: (error) => {
        console.error(error)
        swal({
          title: "Erro!",
          text: 'Ocorreu um problema, tente novamente.',
          icon: "error",
        });
      }
    })
  }
  
  editTask(task: TTaskFull) {
    this.editTaskId = task._id
    this.taskTitle = task.title
  }

  cancelEdit() {
    this.editTaskId = ''
    this.taskTitle = ''
    this.todo = this.todo.filter(task => task._id !== 'create')
  }
  
  saveTask(isEditing:boolean, id?: string) {
    this.editTaskId = ''
    if (isEditing) {
      let task = this.project.tasks.find(task => task._id === id)
      if (task) {
        task.title = this.taskTitle
      }
    } else {
      let task = this.todo.find(task => task._id === 'create')
      if(!task) return
      delete task?._id
      task.title = this.taskTitle;
      const newTasks = this.todo.concat(this.done);
      this.project.tasks = newTasks;
      
    }
    
    this.updateProject()
    this.taskTitle = ''
  }
  
  createTask() {    
    const newTask = {
      title: '',
      completed: false,
      _id: 'create',
      project: this.project._id,
      assignedTo: this.project.user._id,
      createdAt: '',
      __v: 0,
    };
    
    this.editTaskId = 'create';
    this.todo.unshift(newTask);
  }
}