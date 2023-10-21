// Footer.js
import React from 'react';
import {Typography, Box } from '@mui/material';


function Footer() {
    return (
        <Box className="bg-[#0D3A8A] p-8 text-white">
            <div className="mx-[13%]">
                <Typography variant="h6">Airline Co.</Typography>
                <div className="flex flex-col my-3 ">
                    <p href="#" className="mr-4 hover:underline">About Us</p>
                    <p href="#" className="mr-4 hover:underline">Contact</p>
                    <p href="#" className="mr-4 hover:underline">Privacy Policy</p>
                    <p href="#" className="mr-4 hover:underline">Terms of Service</p>
                </div>
                <Typography variant="body2" className="mt-4">&copy; 2023 MindSpace Co.</Typography>
            </div>
        </Box>
    );
}

export default Footer;
