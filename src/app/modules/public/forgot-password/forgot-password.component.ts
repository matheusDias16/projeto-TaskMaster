import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService, TForgotPassword, TAlteraPassword } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';

type Tform = {
  email: FormControl<string | null>,
  senha?: FormControl<string | null>,
  token?: FormControl<string | null>,
}


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})

export class ForgotPasswordComponent implements OnInit {
  public tokenEnviado: boolean = false;
  public trocaTela: boolean = false
  public formGetPasswordFormGroup!: FormGroup<Tform>

  constructor(
    public router: Router,
    private authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGetPasswordFormGroup = new FormGroup<Tform>({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  enviarToken() {

    const formValid = this.formGetPasswordFormGroup.status === 'INVALID' ? false : true;

    if (formValid) {

      const payload: TForgotPassword = {
        email: this.formGetPasswordFormGroup.value.email!,
      };

      
      this.authService.forgotPassword(payload).subscribe({
        next: (success) => {
          swal({
            title: "Token enviado!",
            text: success.msg,
            icon: "success",
          });
          
          this.tokenEnviado = true
          
        },
        error: (error) => {
          console.error(error);
          swal({
            title: "Token não enviado!",
            text: error.msg || 'Token não enviado, tente enviar o email novamente',
            icon: "error",
          });
          //Caso de erro emitir um alert com icone de erro avisando o usuário para reenviar o email
          //https://sweetalert.js.org/docs/
        }
      });

      

    } else {
      this.formGetPasswordFormGroup.markAllAsTouched();
    }
  }

  trocaSenha() {
    console.log('dados do form', this.formGetPasswordFormGroup.value);

    const formValid = this.formGetPasswordFormGroup.status === 'INVALID' ? false : true;

    if (formValid) {
      console.log("Form emitiu dados", this.formGetPasswordFormGroup.value);

       const payload: TAlteraPassword = {
        email: this.formGetPasswordFormGroup.value.email,
        token: this.formGetPasswordFormGroup.value.token,
        password: this.formGetPasswordFormGroup.value.senha
      };

      this.authService.trocaPassword(payload).subscribe({
        next: (success) => {
          swal({
            title: "Senha alterada",
            text: 'Sua senha foi alterada com sucesso',
            icon: "success",
          });  
          this.router.navigate(['/login'])
          

        },
        error: (error) => {
          console.error(error)
          swal({
            title: "Erro ao alterar a senha!",
            text: error.msg || 'Ocorreu um erro ao alterar a sua senha, tente novamente',
            icon: "error",
          });
        }
      }); 

    } else {
      this.formGetPasswordFormGroup.markAllAsTouched();
    }
  }

  checkForm() {
    const formValid = this.formGetPasswordFormGroup.status === 'INVALID' ? false : true;
    const formTouched = this.formGetPasswordFormGroup.touched;
    const buttonDisabled = !formValid && formTouched ? true : false;

    return buttonDisabled;
  }

  validarToken() {
    this.formGetPasswordFormGroup.addControl('senha', new FormControl('', [Validators.required]))
    this.formGetPasswordFormGroup.addControl('token', new FormControl('', [Validators.required]))

    this.trocaTela = true
  }
  
  mudarEmail() {
    this.formGetPasswordFormGroup.removeControl('senha')
    this.formGetPasswordFormGroup.removeControl('token')
    this.trocaTela = false
    this.tokenEnviado = false
  }
}