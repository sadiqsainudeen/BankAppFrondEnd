import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import party from "party-js";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //logout spinner
  logOutDiv: boolean = false

  // login from group
  depositform = this.fb.group({
    // array
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })






  //create a variable
  user: string = ''
  currentAcno: Number = 0
  isCollapse: boolean = true
  balance: Number = 0
  depositMsg: string = ''
  fundTrasferSuccessMsg: string = ''
  fundtrasfErrorMsg: string = ''
  //for delete accnt
  acno: any = '';
  deleteConfirm: boolean = false

  //delete spinner div
  deleteSpinnerDiv:boolean=false



  // fund tarnsfer from group
  fundTransferForm = this.fb.group({
    // array
    toAcno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  })
  constructor(private api: ApiService, private fb: FormBuilder, private router: Router) {
  }


  ngOnInit(): void {
    //to avoid login after
    if (!localStorage.getItem("token")) {
      alert("PLEASE LOGIN")
      //navogate to  login
      this.router.navigateByUrl('')
    }

    if (localStorage.getItem("username")) {
      this.user = localStorage.getItem("username") || ''
    }

  }

  collapse() {

    this.isCollapse = !this.isCollapse

  }

  //api call for balance of perticular account number (if only need when call)

  getBalance() {
    if (localStorage.getItem("currentAcno")) {
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')

      this.api.getBalance(this.currentAcno).subscribe((result: any) => {
        this.balance = result.balance
        console.log(result);


      })
    }

  }

  //call for deposit
  deposit() {
    if (this.depositform.valid) {
      let amount = this.depositform.value.amount
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
      this.api.deposit(this.currentAcno, amount).subscribe((result: any) => {
        console.log(result);
        this.depositMsg = result.message

        //to refresh after deposited
        setTimeout(() => {
          this.depositform.reset()
          this.depositMsg = ''
        }, 2000)

      },
        (result: any) => {
          console.log(result);
          this.depositMsg = result.error.message
        })
    } else {
      alert('Invalid Form')
    }


  }

  //showconfetti
  showconfetti(source: any) {
    party.confetti(source);
  }

  //transfer
  transfer() {
    if (this.fundTransferForm.valid) {

      let toAcno = this.fundTransferForm.value.toAcno
      let pswd = this.fundTransferForm.value.pswd
      let amount = this.fundTransferForm.value.amount
      // make api call for trransfer
      this.api.fundTransfer(toAcno, pswd, amount).subscribe(
        //success
        (result: any) => {
          this.fundTrasferSuccessMsg = result.message

          //to empty the messgae after 
          setTimeout(() => {
            this.fundTrasferSuccessMsg = ""
          }, 3000)


        },
        //client error    
        (result: any) => {
          this.fundtrasfErrorMsg = result.error.message

          //to empty the messgae after 
          setTimeout(() => {
            this.fundtrasfErrorMsg = ""
          }, 3000)
        }
      )

    } else {
      alert('Invalid form')

    }

  }

  //clearFundTransferForm
  clearFundTransferForm() {
    this.fundtrasfErrorMsg = ""
    this.fundTrasferSuccessMsg = ""
    this.fundTransferForm.reset()
  }



  //logout
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('currentAcno')

    this.logOutDiv = true


    setTimeout(() => {
      //navigate to login
      this.router.navigateByUrl('')
      this.logOutDiv = false
    }, 4000);


  }

  //deleteaccount from navabr
  deleteAccountFromNavbar() {
    this.acno = localStorage.getItem("currentAcno")
    this.deleteConfirm = true
  }


  onCancel() {
    this.acno = ''
    this.deleteConfirm = false
  }


  onDelete(event: any) {
    let deleteAcno = JSON.parse(event)
    this.api.deleteAccount(deleteAcno)
      .subscribe((result: any) => {
        this.acno = ''  
        localStorage.removeItem('token')  
        localStorage.removeItem('username')
        localStorage.removeItem('currentAcno')
        this.deleteSpinnerDiv=true
        setTimeout(() => {
          //navigate to login
          this.router.navigateByUrl('')
          this.deleteSpinnerDiv=false
        }, 4000);
      },
      (result:any)=>{
        alert(result.error.message)
      })

  }

}