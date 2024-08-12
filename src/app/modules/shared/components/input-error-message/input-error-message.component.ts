import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { errorMessages } from '../../utils/errorMessages';

@Component({
  selector: 'app-input-error-message',
  templateUrl: './input-error-message.component.html',
  styleUrl: './input-error-message.component.scss'
})
export class InputErrorMessageComponent implements OnInit{
  public errorMessagesForm = errorMessages

  @Input() validationName: string = ''
  @Input() formControlInputName: any
  
  ngOnInit(): void {
  }
}
