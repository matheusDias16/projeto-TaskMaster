import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicMainLayoutComponent } from './public-main-layout.component';

describe('PublicMainLayoutComponent', () => {
  let component: PublicMainLayoutComponent;
  let fixture: ComponentFixture<PublicMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicMainLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
