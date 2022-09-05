import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  constructor() { }

  public rounded = {
    subTotal: 0,
    tps: 0,
    tvq: 0,
    total: 0,
  }

  private raw = {
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

  ngOnInit(): void {
    const autofocusInput = document.getElementById("subTotal") as HTMLInputElement
    if (autofocusInput) {
      autofocusInput.focus()
    }
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

  updateSubtotal(event: Event) {
    this.raw.subTotal = this.getInputNumber(event)
    this.calculateTotal()
  }

  updateTotal(event: Event) {
    this.raw.total = this.getInputNumber(event)
    this.calculateSubTotal()
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
