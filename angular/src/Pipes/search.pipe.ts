import { Pipe, PipeTransform } from '@angular/core';
import { filterProducts } from '../Interfaces/product.interface';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {


  transform(products: filterProducts[], productName: string): filterProducts[] {
    if(!products || productName == ''){
      return products
    }

    const filtered: filterProducts[] =[]

    for(let product of products){
      if(product.productName.toLowerCase().includes(productName.toLowerCase())){
        filtered.push(product)
      }
    }

    return filtered
  }

}
