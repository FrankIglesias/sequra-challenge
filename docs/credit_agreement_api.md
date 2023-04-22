# Credit Agreements API

The credit agreement API allows a merchant to get SeQura's credit conditions with a single request.

SeQura's credit conditions depend on order value, currency, and merchant.

A merchant should display SeQura's credit conditions to the shopper any time before the checkout.

## Request: `GET <base>/credit_agreements`

```bash
$ curl -i http://localhost:8080/credit_agreements?totalWithTax=15000
```

### Parameters

<table>
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td>totalWithTax</td>
    <td>15000</td>
    <td>Sample.<br>Total value of the items (in EUR cents).</td>
  </tr>
</table>

### Successful Response

The response is a list of the requested financing products as keys and corresponding credit agreements as values. (the example has been reformatted for easier reading)

Each credit agreement contains fields specific to the financing product. Many of them include a numerical value together with a formatted string, which is ready to show.

```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Transfer-Encoding: chunked
...

[
    {
      "instalment_count":        3,
      "apr":                     { "value":  10408, "string":   "104,08 %" },
      "total_with_tax":          { "value":  15000, "string":   "150,00 €" },
      "cost_of_credit":          { "value":    900, "string":     "9,00 €" },
      "cost_of_credit_pct":      { "value":    600, "string":     "6,00 %" },
      "grand_total":             { "value":  15900, "string":   "159,00 €" },
      "max_financed_amount":     { "value": 200000, "string": "2.000,00 €" },
      "instalment_amount":       { "value":   5000, "string":    "50,00 €" },
      "instalment_fee":          { "value":    300, "string":     "3,00 €" },
      "instalment_total":        { "value":   5300, "string":    "53,00 €" },
    },
    {
      "instalment_count":        6,
      ... //analgous details as above, but for 6 months credits
    },
    {
      "instalment_count":        12,
      ... //analgous details as above, but for 12 months credits
    }
  ]
```
