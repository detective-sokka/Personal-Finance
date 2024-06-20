import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from "styled-components";
import HomeComponent from "./modules/home/HomeComponent";

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

const Modal = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Error = styled.div`
  color: red;
  margin: 10px 0;
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.username);
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Handle login called");
    try 
    {
      const response = await axios.post('http://localhost:9001/login', credentials);
      if (response.data.success) 
      {
        setUserName(response.data.username);
        setIsLoggedIn(true);
        setError('');
        setShowModal(false);
        localStorage.setItem('user', JSON.stringify({ username: response.data.username }));
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
    localStorage.removeItem('user');
  };

  return (
    <Container>
      <Navbar>
        {isLoggedIn ? (
          <div>
            <p>Hello, {userName}!</p>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Button onClick={() => setShowModal(true)}>Login</Button>
        )}
      </Navbar>
      <Header>Expense Tracker</Header>
      <HomeComponent />
      <Modal show={showModal}>
        <ModalContent>
          <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
          <h2>Login</h2>
          <Form onSubmit={handleLogin}>
            <Input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={credentials.username}
              onChange={handleChange} 
              required 
            />
            <Input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={credentials.password}
              onChange={handleChange} 
              required 
            />
            <Button type="submit">Login</Button>
            {error && <Error>{error}</Error>}
          </Form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default App;
