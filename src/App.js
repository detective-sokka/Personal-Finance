import React, { useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import HomeComponent from "./modules/home";
import LoginComponent from "./components/LoginComponent";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  align-items: center;
  height: 100vh;
  width: 98%;
  padding-top: 30px ;
  font-family: Montserrat;
`;

const Header = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 22px;
  font-size: 25px;
  font-weight: bold;
  margin: 10px;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 30px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const App = () => {

      // State to manage login status and user's name
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
  
    const handleChange = (e) => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/login', credentials);
        if (response.data.success) {
          setUserName(response.data.username);
          setIsLoggedIn(true);
          setError('');
        }
      } catch (error) {
        setError('Invalid username or password');
      }
    };
  
    const handleLogout = () => {
      setUserName('');
      setIsLoggedIn(false);
      setCredentials({ username: '', password: '' });
      setError('');
    };
    
  return (
    <Container>
      <Navbar>
      {isLoggedIn ? (
          <div>
            <p>Hello, {userName}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Button onClick={handleLogin}>Login</Button>
        )}
      </Navbar>
      <Header>Expense Tracker</Header>
      <HomeComponent />
    </Container>
  );
};

export default App;
