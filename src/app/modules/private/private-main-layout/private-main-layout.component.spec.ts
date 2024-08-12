import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateMainLayoutComponent } from './private-main-layout.component';

describe('PrivateMainLayoutComponent', () => {
  let component: PrivateMainLayoutComponent;
  let fixture: ComponentFixture<PrivateMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivateMainLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivateMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
