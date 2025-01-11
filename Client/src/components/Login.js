import React, { useContext, useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();
        if (isLogin) {
            // Handle login
            console.log('Login:', { username, password });

            const data = {
                username: username,
                password: password
            }

            axios.post('http://13.250.101.135:5000/user/login', data)
                .then(response => {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    setUser(response.data.user);
                    navigate("/")

                })
                .catch(error => console.error('Error adding user:', error));
            console.log('login:', { username, password });




        } else {
            // Handle register

            const data = {
                username: username,
                password: password
            }
            axios.post('http://13.250.101.135:5000/user/addUser', data)
                .then(response => {

                    // alert("Registered Successfully")
                    window.location.reload();

                })
                .catch(error => console.error('Error adding user:', error));
            console.log('Register:', { username, password });
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    {isLogin ? 'Login' : 'Register'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                </form>
                <Button
                    color="secondary"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Switch to Register' : 'Switch to Login'}
                </Button>
            </Box>
        </Container>
    );
};

export default Login;