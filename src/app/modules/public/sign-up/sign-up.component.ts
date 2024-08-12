import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService , TcriaUsuario } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';


type Tform = {
  email: FormControl<string |null>,
  password: FormControl<string|null>,
  name: FormControl<string|null>,
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{
  public formSign!: FormGroup<Tform>
  public loginEnviado: boolean = false;


  constructor(
    public router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
   this.createForm()
   }

    createForm() {
     this.formSign = new FormGroup<Tform>({
       email: new FormControl('', [Validators.required, Validators.email]),
       password : new FormControl('', [Validators.required,]),
       name : new FormControl('', [Validators.required,]),
     })
    }   

   criaLogin(): void{
    const formValid = this.formSign.status === 'INVALID' ? false : true;
    if(formValid){
      const payload : TcriaUsuario = {
        email: this.formSign.value.email!,
        name: this.formSign.value.name!,
        password:  this.formSign.value.password!,
      }
      this.authService.criaUsuario(payload).subscribe( {
        next: (success) => {
          swal({
            title: "Login criado!",
            text: 'Seu login foi criado com sucesso',
            icon: "success",
          });  
          this.router.navigate(['/login'])

        },
        error: (error) => {
          console.error(error);
          swal({
            title: "Login não foi criado!",
            text: error.msg || 'Deu algum erro ao criar o seu login, tente novamente',
            icon: "error",
          });
         
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


  

