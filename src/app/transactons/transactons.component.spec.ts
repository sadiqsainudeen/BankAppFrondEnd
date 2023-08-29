import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactonsComponent } from './transactons.component';

describe('TransactonsComponent', () => {
  let component: TransactonsComponent;
  let fixture: ComponentFixture<TransactonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactonsComponent]
    });
    fixture = TestBed.createComponent(TransactonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
