import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import './expensePage.css'

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/myexpense", {
        headers: {
          Authorization: token,
        },
      });
      if (res.status !== 200) {
        throw new Error("Failed to fetch expenses");
      }
      setExpenses(res.data.expenses);
      setTotalExpense(res.data.totalExpense);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const renderExpenses = () => {
    return expenses.map((expense, index) => (
      <tr key={index}>
        <td>{new Date(expense.createdAt).toLocaleDateString()}</td>
        <td>{expense.money}</td>
        <td>{expense.description}</td>
        <td>{expense.category}</td>
      </tr>
    ));
  };

  const downloadExpensesAsCSV = () => {
    const csvData = [
      ["Date", "Expense", "Description", "Category"],
      ...expenses.map((expense) => [
        new Date(expense.createdAt).toLocaleDateString(),
        expense.money,
        expense.description,
        expense.category,
      ]),
    ];

    const csvContent = csvData.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "expenses.csv");
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Expense</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>{renderExpenses()}</tbody>
        <tfoot>
          <tr>
            <td>Total Expense:</td>
            <td>{totalExpense}</td>
          </tr>
        </tfoot>
      </table>
      <button className="button" onClick={downloadExpensesAsCSV}>
        Download Expenses
      </button>
    </div>
  );
};

export default ExpensePage;
