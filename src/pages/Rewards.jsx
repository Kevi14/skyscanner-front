import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { CheckCircleOutline, Star } from '@mui/icons-material';

const Rewards = () => {
    return (
        <Box sx={{ padding: '2em', maxWidth: '500px', margin: 'auto', backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
            <Typography variant="h6" gutterBottom>
                Bonus Për porosinë e parë
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                23,200 L ulje nga 63 biznese
            </Typography>
            
            <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom="1em">
                <Typography variant="body1">
                    2 Porosi
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    0 L
                </Typography>
                <Typography variant="body1">
                    Të duhen 8 Porosi
                </Typography>
                <Typography variant="body1">
                    Për të arri.. Silver <Star color="primary" fontSize="small" />
                </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <CheckCircleOutline color="disabled" />
                <Star color="primary" fontSize="large" />
                <Star color="action" fontSize="large" />
                <Star color="action" fontSize="large" />
            </Stack>
            
            <Box marginTop="1em">
                <Button variant="outlined" color="primary" fullWidth>
                    Zbulo Benefitet e Baboon Club
                </Button>
            </Box>
        </Box>
    );
};

export default Rewards;
