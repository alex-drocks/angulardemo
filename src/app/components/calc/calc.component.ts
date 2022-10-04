import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { taxRates, Tax } from 'src/app/models/taxes';

interface CalculatorInputs {
  subTotal: number,
  tax1: number,
  tax2: number,
  total: number,
}

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements AfterViewInit {
  public rounded: CalculatorInputs;
  public raw: CalculatorInputs;
  public taxRates: Tax;
  @ViewChild('initialFocusInput')
  initialFocusInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.raw = {
      subTotal: 0,
      tax1: 0,
      tax2: 0,
      total: 0,
    }
    this.rounded = this.raw;
    this.taxRates = taxRates.quebec;
  }

  ngAfterViewInit(): void {
    this.initialFocusInput.nativeElement.select()
  }

  onUpdateSubtotal(event: Event) {
    this.raw.subTotal = this.getInputNumber(event)
    this.calculateTotal()
  }

  onUpdateTotal(event: Event) {
    this.raw.total = this.getInputNumber(event)
    this.calculateSubTotal()
  }

  getInputNumber(event: Event) {
    const target = event.target as HTMLInputElement
    const value = target.value as string
    const number = Number(this.replaceCommas(value))
    return isNaN(number) ? 0 : number
  }

  replaceCommas(value: string) {
    return value?.replace(",", ".")
  }

  roundNumber(num: number) {
    return Math.round((Number(num) + Number.EPSILON) * 100) / 100
  }

  calculateTotal() {
    this.raw.tax1 = 0;
    this.raw.tax2 = 0;
    this.raw.tax1 = this.raw.subTotal * this.taxRates.tax1.rate
    if (this.taxRates.tax2) {
      this.raw.tax2 = this.raw.subTotal * this.taxRates.tax2.rate
      this.raw.total = this.raw.subTotal + this.raw.tax1 + this.raw.tax2
    } else {
      this.raw.total = this.raw.subTotal + this.raw.tax1
    }
    this.roundValues()
  }

  calculateSubTotal() {
    this.raw.tax1 = 0;
    this.raw.tax2 = 0;
    if (this.taxRates.tax2) {
      this.raw.subTotal = this.raw.total / (1 + this.taxRates.tax1.rate + this.taxRates.tax2.rate)
      this.raw.tax1 = this.raw.subTotal * this.taxRates.tax1.rate
      this.raw.tax2 = this.raw.subTotal * this.taxRates.tax2.rate
    } else {
      this.raw.subTotal = this.raw.total / (1 + this.taxRates.tax1.rate)
      this.raw.tax1 = this.raw.subTotal * this.taxRates.tax1.rate
    }
    this.roundValues()
  }

  roundValues() {
    this.rounded.subTotal = this.roundNumber(this.raw.subTotal);
    this.rounded.tax1 = this.roundNumber(this.raw.tax1);
    this.rounded.tax2 = this.roundNumber(this.raw.tax2);
    this.rounded.total = this.roundNumber(this.raw.total);
  }

}
