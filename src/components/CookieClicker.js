import React from "react";

export default function CookieClicker({ incrementCurrency }) {
  return (
    <div>
      <div className="cookie-button" onClick={incrementCurrency} />
    </div>
  );
}
