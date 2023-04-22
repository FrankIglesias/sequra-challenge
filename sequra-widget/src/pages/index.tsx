import { useState, useEffect } from "react";
import styles from "@/styles/Widget.module.css";
import getCreditAgreement, { CreditAgreement } from "@/services/creditAgreement";
import sendEvent from "@/services/events";

export default function Widget({ agreements: defaultAgreements }) {
  const [agreements, setAgreements] =
    useState<CreditAgreement[]>(defaultAgreements);
  const [installmentAmount, setInstallmentAmount] = useState<string>(null);
  const handlePlusInfo = (value) => {
    window.parent.postMessage({ type: "SHOW_POPIN", value }, "*");
    sendEvent({
      context: "checkoutWidget",
      type: "simulatorOpenMoreInfo"
    });
  };

  const handleChangePrice = (event) => {
    if (event.data.type === "CHANGE_PRICE") {
      getCreditAgreement(event.data.value).then((aggrs) => setAgreements(aggrs));
    }
  };

  const handleChangeInstallmentAmount = (event) => {
    const agreement = agreements.find(aggr => aggr.instalment_count === +event.target.value);
    setInstallmentAmount(agreement.instalment_total.string);
    sendEvent({
      context: "checkoutWidget",
      type: "simulatorInstalmentChanged",
      selectedInstalment: event.target.value
    });
  };

  useEffect(() => {
    setInstallmentAmount(agreements[0].instalment_total.string);
    window.addEventListener("message", handleChangePrice);
    return () => {
      window.removeEventListener("message", handleChangePrice);
    };
  }, []);
  return (
    <>
      <div className={styles.main}>
        <span>Pagalo en:</span>
        <button
          className={styles.more}
          onClick={() => handlePlusInfo(installmentAmount)}
          data-testid="more-info"
        >
          más info
        </button>
      </div>
      <select
        className={styles.selector}
        onChange={handleChangeInstallmentAmount}
        data-testid="installment-selector"
      >
        {agreements.map((agreement) => (
          <option
            key={agreement.instalment_count}
            value={agreement.instalment_count}
          >
            {agreement.instalment_count} cuotas de{" "}
            {agreement.instalment_total.string}
          </option>
        ))}
      </select>
    </>
  );
}

Widget.getInitialProps = async ({ query }) => {
  const { amount } = query;
  const agreements = await getCreditAgreement(amount);
  return { agreements, amount };
};
