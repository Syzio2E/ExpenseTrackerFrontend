import React, { useEffect, useState } from 'react';

const LeaderBoardPage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:5000/showleaderboard', {
            method: 'GET',
            headers: {
              Authorization: token,
            },
          });
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h2>LeaderBoard</h2>
      <ul>
        {userData.map((user) => (
          <li key={user.id}>
            {user.name} - Total Expense: {user.total_cost || 0}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoardPage;