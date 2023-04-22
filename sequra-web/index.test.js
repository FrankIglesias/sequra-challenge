const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!doctype html><html><body></body></html>`);
global.window = window;
global.document = window.document;
const Sequra = require('./index.js');

describe('Sequra', () => {

  beforeEach(() => {
    const { window } = new JSDOM(`<!doctype html><html><body>
    <div class="sequra-widget" data-amount="399,99"></div>
            <div class="sequra-widget-popin"></div>
    </body></html>`);
    global.window = window;
    global.document = window.document;
    global.fetch = jest.fn(() => Promise.resolve({}));
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('should not initialize popin if tag is not present', () => {
    const { window } = new JSDOM(`<!doctype html><html>
    <head>
    <script src="./sequra.js"></script>
    </head>
    <body>
    <div class="sequra-widget" data-amount="399,99"></div>
    </body></html>`);
    global.window = window;
    global.document = window.document;
    const sequra = new Sequra();
    expect(sequra.iframeWidget).not.toBeNull();
    expect(sequra.iframeModal).toBeNull();
  });

  test('should not initialize widget if tag is not present', () => {
    const { window } = new JSDOM(`<!doctype html><html><body></body></html>`);
    global.window = window;
    global.document = window.document;
    const sequra = new Sequra();
    expect(sequra.iframeWidget).toBeNull();
  });

  test('should throw an error if amount is not present', () => {
    const { window } = new JSDOM(`<!doctype html><html><body>
    <div class="sequra-widget"></div>
    </body></html>`);
    global.window = window;
    global.document = window.document;
    expect(() => new Sequra()).toThrowError("data-amount attribute is required");
  });

  test('should initialize iframeWidget and iframePopin properties', () => {
    const sequra = new Sequra();
    expect(sequra.iframeWidget).not.toBeNull();
    expect(sequra.iframeModal).not.toBeNull();
  });


  test('should create iframe for widget', () => {
    const sequra = new Sequra();
  
    const iframeWidget = document.querySelector('iframe[name="sequra-widget"]');
  
    expect(iframeWidget).not.toBeNull();
    expect(iframeWidget.src).toContain('http://localhost:3000/');
    expect(iframeWidget.frameBorder).toEqual('0');
    expect(iframeWidget.sandbox).toContain('allow-scripts');
    expect(iframeWidget.sandbox).toContain('allow-same-origin');
    expect(iframeWidget.sandbox).toContain('allow-top-navigation-by-user-activation');
  });

  test('should create iframe for popin', () => {
    const sequra = new Sequra();
  
    const iframePopin = document.querySelector('iframe[name="sequra-widget-popin"]');
  
    expect(iframePopin).not.toBeNull();
    expect(iframePopin.src).toContain('http://localhost:3000/modal');
    expect(iframePopin.frameBorder).toEqual('0');
    expect(iframePopin.sandbox).toContain('allow-scripts');
    expect(iframePopin.sandbox).toContain('allow-same-origin');
    expect(iframePopin.sandbox).toContain('allow-top-navigation-by-user-activation');
    expect(iframePopin.style.display).toEqual('none');
    expect(iframePopin.style.position).toEqual('fixed');
    expect(iframePopin.style.top).toEqual('0px');
    expect(iframePopin.style.left).toEqual('0px');
    expect(iframePopin.style.width).toEqual('100%');
    expect(iframePopin.style.height).toEqual('100%');
    expect(iframePopin.style.zIndex).toEqual('10000');
  });

  test('sendEvent method sends a POST request to the correct endpoint', async () => {
    const sequra = new Sequra();
    const event = { type: 'test_event' };

    await sequra.sendEvent(event);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/events', {
      method: 'POST',
      body: JSON.stringify(event)
    });
  });

  test('Logs error when sendEvent fails', async () => {
    const sequra = new Sequra();
    const event = { type: 'test_event' };
    console.error = jest.fn();
    global.fetch.mockImplementationOnce(() => Promise.reject('error'));
    await sequra.sendEvent(event);
    expect(console.error).toHaveBeenCalledWith("Sequra: Error sending event");
  });


  test('should change price', () => {
    const sequra = new Sequra();
    jest.spyOn(sequra.iframeWidget.contentWindow, 'postMessage');
    jest.spyOn(sequra.iframeModal.contentWindow, 'postMessage');
  
    const value = 100;
  
    sequra.changePrice(value);
  
    expect(sequra.iframeWidget.contentWindow.postMessage).toHaveBeenCalled();
    expect(sequra.iframeModal.contentWindow.postMessage).toHaveBeenCalled();
  
    const widgetMessageCall = sequra.iframeWidget;
});
});
