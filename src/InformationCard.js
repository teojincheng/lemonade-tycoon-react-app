import React from "react";
import "./InformationCard.css";

function InformationCard({ children }) {
  return <div className="shadow-inset card-default">{children}</div>;
}

export default InformationCard;
