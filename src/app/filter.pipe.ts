import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(alltransactions:[],searchKey:string,propName:string): any[] {

    const result:any=[]

    if(!alltransactions || searchKey=='' || propName==''){
      return alltransactions
    }

    alltransactions.forEach((item:any)=>{
      if(item[propName].trim().toLowerCase().includes(searchKey.toLowerCase())){

        result.push(item)
      }
      
    })
    return result;


    
  }

}
