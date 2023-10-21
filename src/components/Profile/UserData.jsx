import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React, {useState} from "react";

const UserData = () => {
    const [userData, setUserData] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle the submit action
    };
    return(
        <form onSubmit={handleSubmit} className="col-span-6 pl-5">
            <FormControl fullWidth margin="normal">
                <InputLabel>User Type</InputLabel>
                <Select name="user_type" value={userData?.user_type} onChange={handleInputChange}>
                    <MenuItem value="1">Customer</MenuItem>
                    <MenuItem value="2">Provider</MenuItem>
                </Select>
            </FormControl>
            <TextField fullWidth margin="normal" label="First Name" name="first_name" value={userData?.first_name} onChange={handleInputChange} />
            <TextField fullWidth margin="normal" label="Last Name" name="last_name" value={userData?.last_name} onChange={handleInputChange} />
            <TextField fullWidth margin="normal" label="Email" type="email" name="email" value={userData?.email} onChange={handleInputChange} disabled />
            <TextField fullWidth margin="normal" label="Phone" type="tel" name="phone" value={userData?.phone} onChange={handleInputChange} />
            <TextField fullWidth margin="normal" label="Frequent Flyer Number" name="frequent_flyer_number" value={userData?.frequent_flyer_number} onChange={handleInputChange} />
            <TextField fullWidth margin="normal" label="Street" name="street" value={userData?.address?.street} onChange={handleInputChange} />
            <TextField fullWidth margin="normal" label="City" name="city" value={userData?.address?.city} onChange={handleInputChange} />
            <TextField fullWidth margin="normal" label="Postal Code" name="postal_code" value={userData?.address?.postal_code} onChange={handleInputChange} />
            <FormControl fullWidth margin="normal">
                <InputLabel>Document Type</InputLabel>
                <Select name="documentType" value={userData?.document?.type} onChange={handleInputChange}>
                    <MenuItem value="PASSPORT">PASSPORT</MenuItem>
                    <MenuItem value="NATIONAL_ID">NATIONAL_ID</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>Update Profile</Button>
        </form>
    )
}

export default UserData