import React from "react";
import noTransactionsImg from "../assets/noTransactions.jpg";

const NoTransactions = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <img
        src={noTransactionsImg}
        style={{ width: "400px", margin: "4rem" }}
        alt="No Transactions Image"
      />
      <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
        You Have No Transaction Currently
      </p>
    </div>
  );
};

export default NoTransactions;
