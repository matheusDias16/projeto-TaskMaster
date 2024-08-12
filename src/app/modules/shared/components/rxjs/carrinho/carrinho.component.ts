import { Component, OnDestroy } from '@angular/core';
import { CarrinhoService } from '../../../services/carrinho.service';
import { Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss',
})
export class CarrinhoComponent implements OnDestroy {
  qtdeProdutos: number = 0;
  sub = new Subscription();
  //qtdeCarrinho$: Observable<number>
  constructor(private carrinhoService: CarrinhoService) {
    //o produtoAdicionado$ tem de voltar a ser privado, não podemos deixar a responsabilidade e regra dele fora do service por isso
    this.carrinhoService.produtoAdicionado$.subscribe(
      (qtde) => (this.qtdeProdutos = qtde)
      );
      this.carrinhoService.produtoAdicionado$.next(50)
    
    //melhorando com asyncPipe não temos a necessidade de manter esse código
    /* const subContador = this.carrinhoService.obterQtdeCarrinho().pipe(take(1)).subscribe((qtde) => {
      console.log('Valor emitido', qtde);

      this.qtdeProdutos = qtde;
    });
    
    this.sub.add(subContador); */
    
    //this.qtdeCarrinho$ = this.carrinhoService.obterQtdeCarrinho()
  }

  ngOnDestroy() {
    console.log('Carrinho destruido');
    //this.sub.unsubscribe();
  }
}
