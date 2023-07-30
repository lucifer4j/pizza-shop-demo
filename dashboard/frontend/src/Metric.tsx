import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

type MetricProps = {
  label: string;
  current?: number;
  previous?: number;
  isMoney: boolean;
}

const numberFormat = new Intl.NumberFormat("en-US");
const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function Metric({ label, current, previous, isMoney }: MetricProps): ReactElement {
  let delta = 0;
  let icon: any = null;
  let color = "rgba(49, 51, 63, 0.6)";

  if (current && previous) {
    delta = current - previous;
    if (delta > 0) {
      icon = faArrowUp;
      color = "rgb(9, 171, 59)";
    } else if (delta < 0) {
      icon = faArrowDown;
      color = "rgb(255, 43, 43)";
    }
  }

  let value = current || 0;

  return (
    <div style={{textAlign: "center"}}>
      <div style={{
        fontSize: "1rem",
        color: "rgb(49, 51, 63)",
        height: "auto",
        minHeight: "1.5rem",
      }}>
        {label}
      </div>
      <div style={{
        fontSize: "2.25rem",
        color: "rgb(49, 51, 63)",
        paddingBottom: "0.25rem",
      }}>{isMoney ? currencyFormat.format(value): numberFormat.format(value)}</div>
      {Boolean(delta) && (
        <div style={{
            fontSize: "1rem",
            display: "flex",
            flexDirection: "row",
            fontWeight: 400,
            color: color,
            justifyContent: "center"
        }}>
          <FontAwesomeIcon icon={icon} size="lg" color={color} />
          <span style={{whiteSpace: "pre"}}>   {isMoney ? currencyFormat.format(delta): numberFormat.format(delta)}   </span>
        </div>
      )}
    </div>
  );
}

export default Metric;
