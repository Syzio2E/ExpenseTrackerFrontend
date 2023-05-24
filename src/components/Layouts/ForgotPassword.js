import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate()
  const { id } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/updatepassword/${id}`, {
        newpassword: newPassword,
      });
      if (response.data.success) {
        setSuccess(true);
        toast.success('Successfully changed password')
        setMessage(response.data.message);
      } else {
        setMessage(response.data.error);
        console.log(response.data)
        navigate('/')
      }
    } catch (error) {
      console.error(error);
     
    }
  };

  return (
    <div>
      {success ? (
        <p>{message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="newpassword">Enter New Password</label>
          <input
            type="password"
            id="newpassword"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit">Reset Password</button>
          {message && <p>{message}</p>}
        </form>
      )}
      <ToastContainer/>
    </div>
  );
};

export default ResetPassword;