import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import api from "../api/api.js";
import Card from "@mui/material/Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
const Register = () => {
  const [formData, setFormData] = useState({
    role: "customer",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    referral_code: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
    }

    if (formData.referral_code && formData.referral_code.length < 4) {
      newErrors.referral_code = "Referral code must be at least 4 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.password2) {
      newErrors.password2 = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await api.post("auth/register", formData);
        toast.success("Registered successfully")
        navigate('/login')
      } catch (error) {
        toast.error("Something went wrong please try again")
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
    <Card className="h-full mx-[15%] p-8 mt-[5%] mb-36">
      <Stack sx={{ mb: 4 }} spacing={1}>
        <Typography variant="h5">Register</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account? &nbsp;
          <Link href="#" underline="hover" variant="subtitle2">
            Log in
          </Link>
        </Typography>
      </Stack>
      <form noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            error={!!errors.last_name}
            helperText={errors.last_name}
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
          <TextField
            fullWidth
            label="Date of Birth"
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            error={!!errors.date_of_birth}
            helperText={errors.date_of_birth}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Referral Code (Optional)"
            name="referral_code"
            value={formData.referral_code}
            onChange={handleInputChange}
            error={!!errors.referral_code}
            helperText={errors.referral_code}
          />
        </Stack>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            ml: -1,
            mt: 1,
          }}
        >
          <Checkbox name="policy" />
          <Typography color="text.secondary" variant="body2">
            I have read the{" "}
            <Link component="a" href="#">
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
    </Card>
  );
};

export default Register;
