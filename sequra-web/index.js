class Sequra {
  iframeWidget = null;
  iframeModal = null;

  constructor() {

    this.#loadModalIframe();
    this.#loadWidgetIframe();

    window.addEventListener('message', event => {
      if (event.source === this.iframeWidget.contentWindow && event.data.type === "SHOW_POPIN") {
        this.iframeModal.contentWindow.postMessage({type: 'SET_INSTALLMENT', value: event.data.value }, '*');
        this.iframeModal.style.display = 'block';
      } else if (event.source === this.iframeModal.contentWindow && event.data.type === "HIDE_POPIN") {
        this.iframeModal.style.display = 'none';
      }
    });
  }

  changePrice(value) {
    this.iframeWidget.contentWindow.postMessage({type: 'CHANGE_PRICE', value }, '*');
    this.iframeModal.contentWindow.postMessage({type: 'CHANGE_PRICE', value }, '*');
  }

  #loadWidgetIframe() {
    const sequraWidget = document.querySelector('.sequra-widget');
    if(sequraWidget !== null) {
  
      if(!sequraWidget.dataset.amount) {
        throw new Error('Sequra: data-amount attribute is required');
      }
      this.iframeWidget = document.createElement('iframe');

      this.iframeWidget.src = `http://localhost:3000/?amount=${sequraWidget.dataset.amount}`;
      this.iframeWidget.name = 'sequra-widget';
      this.iframeWidget.frameBorder = '0';
      this.iframeWidget.sandbox = 'allow-scripts allow-same-origin allow-top-navigation-by-user-activation';
      sequraWidget.appendChild(this.iframeWidget);
    }
  }

  #loadModalIframe() {
    const sequraWidgetPopin = document.querySelector('.sequra-widget-popin');

    if(sequraWidgetPopin !== null) {
      this.iframeModal = document.createElement('iframe');
      this.iframeModal.src = 'http://localhost:3000/modal?';
      this.iframeModal.name = 'sequra-widget-popin';
      this.iframeModal.frameBorder = '0';
      this.iframeModal.sandbox = 'allow-scripts allow-same-origin allow-top-navigation-by-user-activation';

      this.iframeModal.style.display = 'none';
      this.iframeModal.style.position = 'fixed';
      this.iframeModal.style.top = '0';
      this.iframeModal.style.left = '0';
      this.iframeModal.style.width = '100%';
      this.iframeModal.style.height = '100%';
      this.iframeModal.style.zIndex = '10000';
      sequraWidgetPopin.appendChild(this.iframeModal);
    }
  }

  sendEvent(event) {
    fetch('http://localhost:8080/events', {
      method: 'POST',
      body: JSON.stringify({...event})
    }).catch(() => {
      console.error('Sequra: Error sending event');
    })
  }
}

module.exports = Sequra;

window.addEventListener("load", (event) => {
  window.Sequra = new Sequra();
});
