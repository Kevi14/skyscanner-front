import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import api from "../api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../slice/authSlice.js";
import { useNavigate } from "react-router-dom";
const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("auth/login", values)
      .then((response) => {
        // Handle successful login, e.g., store user data or redirect
        dispatch(setAuthToken(response.data.data.access));
        navigate("/");
      })
      .catch((err) => {
        // Handle login errors, e.g., display an error message
        console.log(err);
        setError("Login failed. Please check your credentials.");
      });
  };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('auth/login', values)
            .then((response) => {
                // Handle successful login, e.g., store user data or redirect
                dispatch(setAuthToken(response.data.data.access))
                navigate('/')
            })
            .catch((err) => {
                // Handle login errors, e.g., display an error message
                console.log(err)
                setError('Login failed. Please check your credentials.');
            });
    };

    return (
        <>
            {!isAuthenticated ?
                <Card className="h-full mx-[15%] p-8 mt-[5%]">
                    <Stack
                        sx={{mb: 4}}
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
                                href="/register"
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
                            sx={{mt: 3}}
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Continue
                        </Button>
                    </form>
                </Card>
                :
                <h1>You're already authenticated</h1>
            }
        </>
    );
};

export default Login;
