import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //register post
  register(uname: any, acno: any, pswd: any) {

    const body = {
      uname,
      acno,
      pswd
    }


    return this.http.post('http://localhost:3000/register', body)

  }

  //login post
  login(acno: any, pswd: any) {

    const body = {
      acno,
      pswd
    }
    return this.http.post('http://localhost:3000/login', body)
  }


  //appending token to thr http header  (we get the token from the header so place token in header and call the function where wqwe need te tokren(need to create a function))
appendToken(){
    //fetch token from local storage
    const token=localStorage.getItem("token")
    //create http header
    var headers=new HttpHeaders()
    if(token){
      //append token inside headets
      headers=headers.append('access-token',token)
      options.headers=headers
    }
      return options
  }
  


  //api call for get balance
  getBalance(acno:any) {
    return this.http.get('http://localhost:3000/getBalance/' + acno,this.appendToken())
  }

  //API for deposite
deposit(acno:any,amount:any){
  const body={
    acno,
    amount
  }
  return this.http.post('http://localhost:3000/deposit',body,this.appendToken())
}

//FUND transfer
fundTransfer(toAcno:any,pswd:any,amount:any){
  const body={
    toAcno,
    pswd,
    amount
  }
  return this.http.post("http://localhost:3000/fundTransfer",body,this.appendToken())
}

//get all transaction
getAllTransaction(){
  return this.http.get('http://localhost:3000/alltransactions',this.appendToken())
}

//DELET ACCOUNT
deleteAccount(acno:any){
  return this.http.delete('http://localhost:3000/delete-account/'+acno,this.appendToken())

}
}



