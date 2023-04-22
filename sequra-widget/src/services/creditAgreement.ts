import axios from 'axios';

export interface CreditAgreement {
    instalment_count: number;
    total_with_tax: {
        value: number;
        string: string;
    };
    instalment_amount: {
        value: number;
        string: string;
    };
    instalment_fee: {
        value: number;
        string: string;
    };
    instalment_total: {
        value: number;
        string: string;
    };
    grand_total: {
        value: number;
        string: string;
    };
    cost_of_credit: {
        value: number;
        string: string;
    };
    cost_of_credit_pct: {
        value: number;
        string: string;
    };
    apr: {
        value: number;
        string: string;
    };
    max_financed_amount: {
        value: number;
        string: string;
    };
}

export default function getCreditAgreements(
  totalWithTax: number,
): Promise<CreditAgreement[]> {
  const url = `http://localhost:8080/credit_agreements?totalWithTax=${totalWithTax}`;
  return fetch(url).then(response => {
    if(response.ok) {
        return response.json();
    }
  }).catch(() => []);
}
