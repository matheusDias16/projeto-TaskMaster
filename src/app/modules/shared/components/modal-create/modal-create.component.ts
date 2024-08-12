import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService, TCriaProject, TTask } from '../../services/project.service';
import swal from 'sweetalert';

type TProject = {
  projectName: FormControl<string | null>,
  description: FormControl<string | null>,
  tasks: FormArray,

}

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.scss'
})
  
export class ModalCreateComponent implements OnInit {
  public formProject!: FormGroup<TProject>
  
  constructor(
    private dialogRef: MatDialogRef<ModalCreateComponent>,
    private projectService: ProjectService,
    private fb: FormBuilder,
  ) { }
  
  ngOnInit(): void {
    this.createForm()
  }
  
  createForm() {    
    this.formProject = this.fb.group({
      projectName: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      tasks: this.fb.array([], Validators.required),
    })
    const task = this.fb.group({
      title: ['', Validators.required],
    })
    this.tasks.push(task)
  }

  get tasks(): FormArray {
    return this.formProject.get('tasks') as FormArray;
  }

  removeTask(index: number) {
    this.tasks.removeAt(index);
  }
  
  addTask(index: number) {    
    
    if (this.tasks.value[index].title.length <= 3) {      
      return
    }
    
    const task = this.fb.group({
      title: ['', Validators.required],
    })
    this.tasks.push(task)
  }
  
  checkFormValidity() {
    const formValid = this.formProject.valid;
    const formTouched = this.formProject.touched;
    const tasksValid = this.tasks.value[this.tasks.length - 1].title === '';
    
    return formValid && formTouched && !tasksValid;
  }
  
  createProject() {
    const formValid = this.formProject.status === 'INVALID' ? false : true;
    
    if (formValid) {
      
      const payload: TCriaProject = {
        title: this.formProject.value.projectName!,
        description: this.formProject.value.description!,
        tasks: this.formProject.value.tasks!,
      }
      
      this.projectService.createProjects(payload).subscribe({
        next: (sucess: any) => {          
          this.dialogRef.close(sucess.project);
        },
        error: (error) => {
          console.error(error)
        }
      })
      
     } else {
      swal({
        title: "Atenção aos dados do formulário",
        text: 'Preencha o formulário corretamente!',
        icon: "error",
      });
    }
  }
}
