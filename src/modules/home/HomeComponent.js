import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import OverViewComponent from "./OverViewComponent";
import TransactionsComponent from "./TransactionsComponent";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
`;

const HomeComponent = (props) => {
  const [transactions, updateTransaction] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transactions.map((payload) =>
      payload.type === "EXPENSE"
        ? (exp = exp + payload.amount)
        : (inc = inc + payload.amount)
    );
    updateExpense(exp);
    updateIncome(inc);
  };
  useEffect(() => calculateBalance(), [transactions]);

  const addTransaction = async (payload) => {
    console.log("addTransaction() payload parameter : ", payload);
    try {
        const transactionArray = [...transactions];
        transactionArray.push(payload);
        updateTransaction(transactionArray);

    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <Container>
      <OverViewComponent
        expense={expense}
        income={income}
        addTransaction={addTransaction}
      />
      {transactions?.length ? (
        <TransactionsComponent transactions={transactions} />
      ) : (
        ""
      )}
    </Container>
  );
};
export default HomeComponent;
