import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss'
})
export class ModalDeleteComponent {
  title: string;
  message: string;
  
  constructor(
    private dialogRef: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  onDelete() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
