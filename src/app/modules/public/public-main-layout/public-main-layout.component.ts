import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-main-layout',
  templateUrl: './public-main-layout.component.html',
  styleUrl: './public-main-layout.component.scss'
})
export class PublicMainLayoutComponent implements OnInit {
 
  constructor(
    public router: Router 
  ){}

  ngOnInit(): void { }

public goToUrl (){
  this.router.navigate(['/user'])
}
}
