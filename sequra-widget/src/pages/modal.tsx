import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Modal.module.css";
import Card from "@/assets/card.png";
import Pay from "@/assets/pay.png";
import Truck from "@/assets/truck.png";
import Image from "next/image";
import sendEvent from "@/services/events";

export default function Modal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [installment, setInstallment] = useState(0);
  const handleClickOutside = (event) => {
    if (
      wrapperRef.current &&
      wrapperRef.current.className === event.target.className
    ) {
      window.parent.postMessage({ type: "HIDE_POPIN" }, "*");
      sendEvent({
        context: "checkoutModal",
        type: "simulatorCloseMoreInfo"
      });
    }
  };

  const handleChangeInstalmentAmount = (event) => {
    const { data } = event;
    if (data.type === "SET_INSTALLMENT") {
      setInstallment(data.value);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("message", handleChangeInstalmentAmount);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("message", handleChangeInstalmentAmount);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={styles.overlay}
      data-testid="modal-overlay"
    >
      <div className={styles.container}>
        <div className={styles.head}>
          <h2>Fracciona tu pago</h2>
          <p>Sequra</p>
        </div>
        <div className={styles.advantages}>
          <div className={styles.advantage}>
            <span>
              1. Elijes &#34;Fracciona tu pago&#34; al realizar tu pedido y pagas sólo la primera cuota.
            </span>
            <Image src={Pay} alt="Pay" />
          </div>
          <div className={styles.advantage}>
            <span>2. Recibes tu pedido.</span>
            <Image src={Truck} alt="Truck" />
          </div>
          <div className={styles.advantage}>
            <span>
              3. El resto de los pagos se cargarán automaticamente a tu tarjeta,
            </span>
            <Image src={Card} alt="Card" />
          </div>
        </div>
        <div className={styles.footer}>
          <p>
            <strong>¡Así de simple!</strong>
          </p>
          <span data-testid="modal-footer">
            Además, en el importe mostrado ya se incluye la cuota única mensual
            de {installment}/mes, por lo que no tendrás ninguna sorpresa.
          </span>
        </div>
      </div>
    </div>
  );
}
