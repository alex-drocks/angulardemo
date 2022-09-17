import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcComponent } from './calc.component';

describe('CalcComponent', () => {
  let component: CalcComponent;
  let fixture: ComponentFixture<CalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalcComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate 100$ plus taxes', function () {
    component.raw.subTotal = 100;
    component.calculateTotal();
    expect(component.rounded.tax1).toEqual(5.00)
    expect(component.rounded.tax2).toEqual(9.98)
    expect(component.rounded.total).toEqual(114.98)
  });

  it('should calculate 100$ tax included', function () {
    component.raw.total = 100;
    component.calculateSubTotal();
    expect(component.rounded.tax1).toEqual(4.35)
    expect(component.rounded.tax2).toEqual(8.68)
    expect(component.rounded.subTotal).toEqual(86.98)
  });


});
