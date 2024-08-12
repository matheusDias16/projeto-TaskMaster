import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,Validators } from '@angular/forms';

type Tform = {
  email: FormControl<string | null>,
  senha: FormControl<string | null>,
  
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
  
  
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup<Tform>

  constructor(
    public router: Router,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formLogin = new FormGroup<Tform>({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha : new FormControl('', [Validators.required])
    })
  }

  
  login() {
    // const formValid = this.formLogin.status === 'INVALID' ? false : true;
    // if(formValid){
    const payload = {
       email: this.formLogin.value.email!,
       password: this.formLogin.value.senha!,
    };

    this.authService.authenticate(payload).subscribe({
      next: (success) => {
        console.log(success);

        localStorage.setItem(
          'accessToken',
          JSON.stringify(success.token)
        );
        localStorage.setItem('user', JSON.stringify(success.user))
        this.router.navigate(['/user'])
      },
      error: (error) => { }

    });
  // }
}
  
}
