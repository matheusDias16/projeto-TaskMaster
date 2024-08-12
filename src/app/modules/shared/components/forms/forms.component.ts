import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
type TForm = {
  comment: FormControl<string | null>,
  cep: FormControl<string | null>,
};

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  public formGroupAula21!: FormGroup<TForm>;
  
  constructor() { }

  ngOnInit(): void {


    this.createForm();
    this.formGroupAula21.patchValue({ comment: 'fdgsdgsdfsfsf', cep: '09121740' })

  }
  
  createForm() {
    this.formGroupAula21 = new FormGroup<TForm>({
      comment: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(300)]),
      cep: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9)])
    })
  }

  checkFormValidity() {
    const formValid = this.formGroupAula21.status === 'INVALID' ? false : true;
    const formTouched = this.formGroupAula21.touched;
    const buttonDisabled = !formValid && formTouched ? true : false;

    return buttonDisabled;
  }

  submitForm() {
    const formValid = this.formGroupAula21.status === 'INVALID' ? false : true;

    if (formValid) {
      console.log("Form emitiu dados", this.formGroupAula21.value.cep);
    } else {
      this.formGroupAula21.markAllAsTouched();
    }
  }
}
