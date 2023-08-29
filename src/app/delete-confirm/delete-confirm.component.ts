import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {

  @Input() item:string|undefined
  @Output()  onCancel =new EventEmitter
  @Output()  onDelete =new EventEmitter

  cancel(){
    //to occur user define event emit()
this.onCancel.emit()

  }

  deleteAcc(){
 this.onDelete.emit(this.item)
  }

}
