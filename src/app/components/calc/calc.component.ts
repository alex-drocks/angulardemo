import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements AfterViewInit {

  public rounded = {
    subTotal: 0,
    tps: 0,
    tvq: 0,
    total: 0,
  }

  public raw = {
    subTotal: 0,
    tps: 0,
    tvq: 0,
    total: 0,
  }

  private taxRates = {
    quebec: {
      tps: 0.05,
      tvq: 0.09975,
    }
  }

  @ViewChild('initialFocusInput') initialFocusInput!: ElementRef<HTMLInputElement>;

  constructor() {}

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
    const value = target.value
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
    this.raw.tps = this.raw.subTotal * this.taxRates.quebec.tps
    this.raw.tvq = this.raw.subTotal * this.taxRates.quebec.tvq
    this.raw.total = this.raw.subTotal + this.raw.tps + this.raw.tvq
    this.roundValues()
  }

  calculateSubTotal() {
    this.raw.subTotal = this.raw.total / (1 + this.taxRates.quebec.tps + this.taxRates.quebec.tvq)
    this.raw.tps = this.raw.subTotal * this.taxRates.quebec.tps
    this.raw.tvq = this.raw.subTotal * this.taxRates.quebec.tvq
    this.roundValues()
  }

  roundValues() {
    this.rounded.subTotal = this.roundNumber(this.raw.subTotal);
    this.rounded.tps = this.roundNumber(this.raw.tps);
    this.rounded.tvq = this.roundNumber(this.raw.tvq);
    this.rounded.total = this.roundNumber(this.raw.total);
  }

}
