import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import api from "../api/api.js";

const initialValues = {
    email: '',
    password: '',
};

const Login = () => {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('auth/login', values)
            .then((response) => {
                // Handle successful login, e.g., store user data or redirect
                console.log('Login successful', response.data);
            })
            .catch((err) => {
                // Handle login errors, e.g., display an error message
                setError('Login failed. Please check your credentials.');
            });
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-full h-full">
                <Box sx={{ mb: 4 }}>
                    <Link
                        sx={{
                            alignItems: 'center',
                            display: 'inline-flex',
                        }}
                        underline="hover"
                    >
                        <SvgIcon sx={{ mr: 1 }}>
                            Left Icon
                        </SvgIcon>
                        <Typography variant="subtitle2">
                            Dashboard
                        </Typography>
                    </Link>
                </Box>
                <Stack
                    sx={{ mb: 4 }}
                    spacing={1}
                >
                    <Typography variant="h5">
                        Log in
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        Don't have an account?
                        &nbsp;
                        <Link
                            href="#"
                            underline="hover"
                            variant="subtitle2"
                        >
                            Register
                        </Link>
                    </Typography>
                </Stack>
                <form
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={3}>
                        <TextField
                            autoFocus
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleInputChange}
                        />
                    </Stack>
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button
                        fullWidth
                        sx={{ mt: 3 }}
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Continue
                    </Button>
                    <Box sx={{ mt: 3 }}>
                        <Link
                            href="#"
                            underline="hover"
                            variant="subtitle2"
                        >
                            Forgot password?
                        </Link>
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default Login;
