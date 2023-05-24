import React, { useEffect, useState } from "react";
import ExpenseTab from "./ExpenseTab";
import "./home.css";
import axios from "axios";

const Home = () => {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/getexpense", {
        headers: {
          Authorization: token,
        },
      });
      if (res.status !== 200) {
        throw new Error("Failed to fetch expenses");
      }
      setExpenses(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const obj = {
      money,
      description,
      category,
    };
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/addexpense", obj, {
        headers: {
          Authorization: token,
        },
      });
      if (res.status !== 200) {
        console.log(res);
        throw new Error("Failed to add expense");
      }
      setExpenses([...expenses, obj]);
      setMoney("");
      setCategory("");
      setDescription("");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <React.Fragment>
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="money">Money: </label>
          <input
            type="number"
            id="money"
            name="money"
            required
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="options">
            <label htmlFor="category">Choose a Category</label>
            <select
              id="category"
              name="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ margin: "10px" }}
            >
              <option value="" disabled>
                Choose a value
              </option>
              <option value="Food">Food</option>
              <option value="Salary">Salary</option>
              <option value="Petrol">Petrol</option>
              <option value="Electricity">Electricity</option>
            </select>
          </div>
          <button type="submit" style={{ margin: "10px", border: "none" }}>
            Add Expenses
          </button>
        </form>
      </div>
      <div>
        {expenses.length > 0 ? (
          <ExpenseTab expenses={expenses} setExpenses={setExpenses} />
        ) : (
          <p>No expenses to display.</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;