import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrinhoService } from '../../services/carrinho.service';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss',
})
export class RxjsComponent implements OnInit {
  mostrarEsconder: boolean = true;
  inputProduto: string = '';

  //outra maneira de injetar uma dependência sem um construtor
  private carrinhoService = inject(CarrinhoService);
 /*  private timer = new Promise<string>((resolver, rejeitar) => {
    console.log('Promise iniciada');
    setTimeout(() => {
      resolver('Promise Resolvida')
    }, 2500)
    setInterval(() => {
      resolver('Promise Resolvida')
     
    }, 1500)
  }); */

  /* private timer$ = new Observable<string>((sub) => {
    console.log('Iniciando observable');
    setTimeout(() => {
      sub.next('Resolveu')
      //sub.complete
    }, 2500)
    setInterval(() => {
      sub.next('Resolveu')
      //sub.complete()
    }, 1500)
  }); */

  ngOnInit(): void {
    //this.timer.then(value=> console.log(value))
    //this.timer$.subscribe(value => console.log(value))
  }

  adicionarProduto() {
    this.carrinhoService.adicionarProduto(this.inputProduto);
    this.inputProduto = '';
  }
}
