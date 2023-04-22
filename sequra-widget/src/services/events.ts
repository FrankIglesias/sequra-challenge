interface Event {
  context: 'checkoutWidget' | 'checkoutModal';
  type:  string;
  [key: string]: string;
}

export default function sendEvent({content, type, ...rest}: Event) {
  fetch('http://localhost:8080/events', {
    method: 'POST',
    body: JSON.stringify({
      content,
      type,
      ...rest
    })
  })
}
