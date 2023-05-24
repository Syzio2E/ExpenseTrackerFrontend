import { useState,useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContainerInsideExample() {
  const navigate = useNavigate();
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/checkpremium", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        const json = await response.json();
        setPremium(json.premium);
      } catch (err) {
        console.log(err);
      }
    };

    checkPremiumStatus();
  }, []);

  const handlePremium = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/getpremium", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const json = await response.json();
      if (!json.order || !json.order.id) {
        throw new Error("Invalid order data");
      }
      const options = {
        key: json.key_id,
        order_id: json.order.id,
        handler: async function (response) {
          try {
            const res = await axios.post(
              "http://localhost:5000/updatetransaction",
              {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
              },
              { headers: { Authorization: token } }
            );
            console.log(res);
            setPremium(true);
            alert("you are a premium user now");
          } catch (err) {
            console.log(err);
            alert("Error updating transaction status");
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
        alert("Payment failed");
      });
      razorpay.open();
    } catch (err) {
      console.log(err);
      alert("Error purchasing premium");
    }
  };

  const handleLeaderBoard = () => {
    navigate("/premium/leaderboard");
  };
  const handleExpensePage = () => {
    navigate("/myexpense");
  };

  const titleHandler=()=>{
    navigate('/home')
  }

  return (
    <Navbar
      expand="lg"
      variant="dark"
      bg="dark"
      className="navbar_header"
    >
      <Container>
        <Navbar.Brand onClick={titleHandler} style={{cursor: 'pointer'}}>Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {!premium && (
              <Nav.Link onClick={handlePremium}>Buy Premium</Nav.Link>
            )}
            {premium && <Nav.Link>You are a premium User</Nav.Link>}
            {premium && (
              <Nav.Link onClick={handleLeaderBoard}>Show LeaderBoard</Nav.Link>
            )}
            {premium && (
              <Nav.Link onClick={handleExpensePage}>My Expenses</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;
