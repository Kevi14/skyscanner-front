import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import api from "../api/api.js";
const Register = () => {
    const [formData, setFormData] = useState({
        role: 'customer',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.password2) {
            newErrors.password2 = 'Passwords do not match';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await api.post('auth/register', formData);
                console.log('Form data submitted:', response);
            } catch (error) {
                console.error('Registration failed:', error);
                // Handle registration failure (e.g., show an error message).
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div>
            <Box sx={{ mb: 4 }}>
                <Link
                    color="text.primary"
                    href="/"
                    sx={{
                        alignItems: 'center',
                        display: 'inline-flex',
                    }}
                    underline="hover"
                >
                    <SvgIcon sx={{ mr: 1 }}>
                        Leftt
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
                    Register
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    Already have an account?
                    &nbsp;
                    <Link
                        href="#"
                        underline="hover"
                        variant="subtitle2"
                    >
                        Log in
                    </Link>
                </Typography>
            </Stack>
            <form noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                    />
                    <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="password2"
                        type="password"
                        value={formData.password2}
                        onChange={handleInputChange}
                        error={!!errors.password2}
                        helperText={errors.password2}
                    />
                </Stack>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        ml: -1,
                        mt: 1,
                    }}
                >
                    <Checkbox
                        name="policy"
                    />
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        I have read the
                        {' '}
                        <Link
                            component="a"
                            href="#"
                        >
                            Terms and Conditions
                        </Link>
                    </Typography>
                </Box>

                <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                >
                    Register
                </Button>
            </form>

        </div>
    );
};

export default Register;
