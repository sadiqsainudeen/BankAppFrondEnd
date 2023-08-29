import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf  from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';



@Component({
  selector: 'app-transactons',
  templateUrl: './transactons.component.html',
  styleUrls: ['./transactons.component.css']
})
export class TransactonsComponent implements OnInit {

  allTrasactions:any;
  searchKey:string=''

  constructor(private api:ApiService,private router:Router){}

  ngOnInit(): void {
    //to avoid login after logout
  if(!localStorage.getItem("token")){
    alert("please login")
    //navogate to login
    this.router.navigateByUrl('')
  }
    
    this.api.getAllTransaction().subscribe((result:any)=>{
      console.log(result);
      this.allTrasactions=result.transaction
      console.log(this.allTrasactions);
      
      
      
    })
  }


  search(event:any){

    this.searchKey=event.target.value
  }

  //generate pdf
  generatePDF(){
    var pdf=new jspdf()
    let col=['Type','FromAcno','ToAcno','Amount']
    let row:any=[]
    pdf.setFontSize(16);
    pdf.text('Transaction History', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);

    //logic to change nested array [only nested array work as body here we have array of object]
    var itemNew=this.allTrasactions
  for(let element of itemNew) {      //let use cheyy for each work illayirunn
    //to make array from object
    var temp=[element.type,element.fromAcno,element.toAcno,element.amount];
    row.push(temp)
    }


    (pdf as any).autoTable(col,row,{startY:10})
    // Open PDF document in new tab
    pdf.output('dataurlnewwindow')
    // Download PDF document
    pdf.save('ministatement.pdf');
  }
}
