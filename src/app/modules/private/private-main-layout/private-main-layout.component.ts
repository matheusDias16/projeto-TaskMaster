import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-private-main-layout',
  templateUrl: './private-main-layout.component.html',
  styleUrl: './private-main-layout.component.scss'
})
export class PrivateMainLayoutComponent implements OnInit {
  constructor(
    public router: Router 
  ){}

  ngOnInit(): void { }

public goToUrl (){
  this.router.navigate(['/user'])
}
}
