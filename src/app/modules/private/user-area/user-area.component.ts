import { Component, OnInit } from '@angular/core';
import { ProjectService, Tproject } from '../../shared/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeleteComponent } from '../../shared/components/modal-delete/modal-delete.component';
import { ModalCreateComponent } from '../../shared/components/modal-create/modal-create.component';
import swal from 'sweetalert';

type TUser = {
  _id: string,
  name: string,
  email: string,
  createdAt: string,
  __v: number
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrl: './user-area.component.scss'
})
export class UserAreaComponent implements OnInit {
  displayedColumns: string[] = ['position', 'project', 'task', 'action'];
  public projects: Tproject[] = []

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects(): void {
    const user: string | null = localStorage.getItem('user')
    if (user) {
      const parsedUser: TUser = JSON.parse(user)
      this.projectService.getProgectsByUser(parsedUser._id).subscribe({
        next: (sucess) => {
          this.projects = sucess.projects.map((project, index) =>
          ({
            ...project,
            position: index + 1,
            completedTasks: project.tasks.reduce((acc, currentValue) => acc + (currentValue.completed === true ? 1 : 0), 0)
          }))
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }
  openDeleteProjectModal(id: string): void {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        title: 'Excluir projeto?',
        message:
          'Atenção! Esta ação é definitiva!'
      },
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;
      this.projectService.deleteProgectsByUser(id).subscribe({
        next: (sucess) => {
          console.log('retorno', sucess);

          swal({
            title: "Projeto Excluido!",
            text: 'Projeto excluído com sucesso!',
            icon: "success",
          });
          this.projects = this.projects.filter((project: Tproject) => project._id !== id)

          this.projects = this.projects.map((project, index) =>
          ({
            ...project,
            position: index + 1,
            completedTasks: project.tasks.reduce((acc, currentValue) => acc + (currentValue.completed === true ? 1 : 0), 0)
          }))
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

    })
  }

  
  openModalCreate(): void {
    const dialogRef = this.dialog.open(ModalCreateComponent, {
      autoFocus: true,
      disableClose: false,
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;      
      this.projects.push(data)
      swal({
        title: "Projeto criado!",
        text: 'O seu novo projeto foi criado com sucesso!',
        icon: "success",
      });
    })
  }
}