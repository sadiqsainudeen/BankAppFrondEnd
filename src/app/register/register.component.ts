import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm=this.fb.group({
    // array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  })


  constructor(private fb:FormBuilder, private api:ApiService,private router:Router){

  }

// alert for click login button
register(){

if(this.registerForm.valid){
  let acno=this.registerForm.value.acno
  let pswd=this.registerForm.value.pswd
  let uname=this.registerForm.value.uname

this.api.register(uname,acno,pswd).subscribe

//success
((result:any)=>{
  alert(result.message)


//navigate from the pae after register
this.router.navigateByUrl('')
},


//client errors
  (result:any)=>{
    alert(result.error.message)}
  )

}else{
  alert('Invalid Format!!')
}
     
  }

  
}



