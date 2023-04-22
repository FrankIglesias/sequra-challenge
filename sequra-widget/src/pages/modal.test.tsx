import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./modal";
import sendEvent from "../services/events";

jest.mock("../services/events");

describe("Modal", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders correctly", () => {
    render(<Modal />);
    const overlay = screen.getByTestId("modal-overlay");
    expect(overlay).toBeInTheDocument();
  });

  it("hides the modal when clicking outside the container", () => {
    window.parent.postMessage = jest.fn();
    const sendEventSpy = sendEvent as jest.Mock;
    render(<Modal />);
    const overlay = screen.getByTestId("modal-overlay");
    fireEvent.mouseDown(overlay);
    expect(window.parent.postMessage).toHaveBeenCalledWith(
      { type: "HIDE_POPIN" },
      "*"
    );
    expect(sendEventSpy).toHaveBeenCalledWith({
      context: "checkoutModal",
      type: "simulatorCloseMoreInfo"
    });
  });

  it("updates the installment amount when receiving a message", () => {
    render(<Modal />);
    const message = { data: { type: "SET_INSTALLMENT", value: 100 } };
    fireEvent(window, new MessageEvent("message", message));
    const footer = screen.getByTestId("modal-footer");
    expect(footer).toHaveTextContent("por lo que no tendrás ninguna sorpresa.");
    expect(footer).toHaveTextContent("100/mes");
  });
});
