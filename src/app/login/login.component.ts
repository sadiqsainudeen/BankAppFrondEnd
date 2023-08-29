import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {


  errorMsg:string=''
  successMsg:boolean=false

  // login from group
  loginForm=this.fb.group({
    // array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
  })


  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){

  }

// alert for click login button
  login(){

if(this.loginForm.valid){
  
  let acno=this.loginForm.value.acno
  let pswd=this.loginForm.value.pswd

  this.api.login(acno,pswd).subscribe
  //if account number is   exist
  ((result:any)=>{
    console.log(result);
    this.successMsg=true
  // store the username in local storage
localStorage.setItem("username",result.username)

// store the currentAcno in local storage
localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))

//store the token
localStorage.setItem("token",result.token)

    //set time for navigate
    setTimeout(()=>{
      this.router.navigateByUrl('dashboard')
    },2000)
    
  }

  ,
  //if account number is not exist
  (result:any)=>{
    this.errorMsg=result.error.message

    setTimeout(()=>{
      this.errorMsg=''
      this.loginForm.reset()
    },(3000))
  })
    
    

  }else{
    alert('Invalid format!!')
  } 
   
    
  }
}
