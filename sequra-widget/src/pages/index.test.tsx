import { render, screen, fireEvent, act } from "@testing-library/react";
import Widget from "./index";
import creditAgreement, { CreditAgreement } from "../services/creditAgreement";
import sendEvent from "../services/events";
require("jest-fetch-mock").enableMocks();
import "@testing-library/jest-dom";

jest.mock("../services/creditAgreement");

jest.mock("../services/events");

describe("Widget", () => {
  const agreements = [
    {
      instalment_count: 3,
      instalment_total: { string: "100" },
    },
    {
      instalment_count: 6,
      instalment_total: { string: "200" },
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders a select element with options for each credit agreement", () => {
    render(<Widget agreements={agreements} />);
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(agreements.length);
  });

  it("updates the installment amount when the user selects a different option and sends an event", () => {
    const sendEventSpy = sendEvent as jest.Mock;
    render(<Widget agreements={agreements} />);
    const select = screen.getByTestId("installment-selector");
    fireEvent.change(select, { target: { value: "6" } });
    const selectedOption = agreements.find((agreement) => agreement.instalment_count === 6);
    expect(screen.getByText(new RegExp(selectedOption.instalment_total.string, "i"))).toBeInTheDocument();
    expect(sendEventSpy).toHaveBeenCalledWith({
      context: "checkoutWidget",
      type: "simulatorInstalmentChanged",
      selectedInstalment: "6"
    });
    sendEventSpy.mockRestore();
  });
  

  it("calls the handlePlusInfo function when the user clicks the 'more info' button and sends postMessage and sendEvent", () => {
    const sendEventSpy = sendEvent as jest.Mock;
    const postMessageSpy = jest.spyOn(window.parent, "postMessage");
    render(<Widget agreements={agreements} />);
    const button = screen.getByText("más info");
    fireEvent.click(button);
    expect(postMessageSpy).toHaveBeenCalledWith(
      { type: "SHOW_POPIN", value: agreements[0].instalment_total.string },
      "*"
    );
    expect(sendEventSpy).toHaveBeenCalledWith({
      context: "checkoutWidget",
      type: "simulatorOpenMoreInfo",
    });
    sendEventSpy.mockRestore();
    postMessageSpy.mockRestore();
  });
  

  it("calls the creditAgreement function when the user changes the price", () => {
    creditAgreement.mockResolvedValue(agreements);
    render(<Widget agreements={agreements} creditAgreement={creditAgreement} />);
    fireEvent(window, new MessageEvent("message", { data: { type: "CHANGE_PRICE", value: 100 } }));
    expect(creditAgreement).toHaveBeenCalledWith(100);
  });
});
