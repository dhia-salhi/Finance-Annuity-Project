export interface LoanParams {
  capital: number;
  rate: number;
  duration: number;
}

export interface AmortizationRow {
  period: number;
  capitalStart: number;
  interest: number;
  amortization: number;
  annuity: number;
  capitalEnd: number;
}

export interface SimulationResult {
  schedule: AmortizationRow[];
  totalInterest: number;
  totalAmortization: number;
  totalPaid: number;
}