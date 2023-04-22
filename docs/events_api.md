# Events API

The events API allows a SeQura to store for further analysis different events that happen during the live of a purchase.

## Request: `POST <base>/events`

```bash
$ curl -d '{"context":"checkoutWidget", "type":"simulatorInstalmentChanged", "selectedInstalment": 12}' -H "Content-Type: application/json" -X POST http://localhost:8080/events
```

### Body

Events API expects a `JSON` object describing the event that wants to be stored. The only requirements for this object are a `contenxt` and `type` keys with `string` values. The object can also include any extra information to help future analysis.

### Response

The status code for a successful response is `200` with an empty `body`, anything else should be treated as an error.
