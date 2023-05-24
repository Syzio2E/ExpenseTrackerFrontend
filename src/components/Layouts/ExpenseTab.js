import React, { useState, useEffect } from "react";
import "./expenseTab.css";

const ExpenseTab = ({ expenses, setExpenses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage, setExpensesPerPage] = useState(
    parseInt(localStorage.getItem("expensesPerPage")) || 10
  );

  useEffect(() => {
    localStorage.setItem("expensesPerPage", expensesPerPage);
  }, [expensesPerPage]);

  const handleDelete = (expenseId) => {
    if (!expenseId) {
      return;
    }

    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/deleteexpense/${expenseId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to delete expense");
        }
      })
      .then((data) => {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== expenseId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleExpensesPerPageChange = (e) => {
    setExpensesPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(expenses.length / expensesPerPage);
    const paginationButtons = [];

    for (let page = 1; page <= totalPages; page++) {
      paginationButtons.push(
        <button
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    }

    return paginationButtons;
  };

  const renderExpenses = () => {
    const startIndex = (currentPage - 1) * expensesPerPage;
    const endIndex = startIndex + expensesPerPage;
    const currentExpenses = expenses.slice(startIndex, endIndex);

    return currentExpenses.map((expense) => (
      <tr key={expense.id}>
        <td>{expense.money ? expense.money : ""}</td>
        <td>{expense.description ? expense.description : ""}</td>
        <td>{expense.category ? expense.category : ""}</td>
        <td>
          <button type="delete" onClick={() => handleDelete(expense.id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="pagination">
        <span>Show:</span>
        <select
          value={expensesPerPage}
          onChange={handleExpensesPerPageChange}
        >
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="40">40</option>
        </select>
        <span>expenses per page</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Money</th>
            <th>Description</th>
            <th>Category</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{renderExpenses()}</tbody>
      </table>
      <div className="pagination-buttons">{renderPaginationButtons()}</div>
    </div>
  );
};

export default ExpenseTab;