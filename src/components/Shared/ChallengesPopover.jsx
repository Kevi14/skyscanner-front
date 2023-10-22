import React, { useState } from 'react';
import {Popover, Typography, Slider, Divider} from '@mui/material';
import AdsClickIcon from '@mui/icons-material/AdsClick';

const App = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const challenges = [
        {
            label:"Make three flights this month to win a free bag",
            start:1,
            end:3
        },
        {
            label:"Travel to a different Continent",
            start:0,
            end:1
        }
    ];

    return (
        <div className="relative w-full h-full">
            <div
                className="absolute z-50 top-4 right-4 w-10 h-10 bg-blue-500 rounded-full cursor-pointer flex justify-center items-center"
                onClick={handleClick}
            ><AdsClickIcon /></div>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <div className="p-4 w-96">
                    <Typography variant="h6" className="mb-2">
                        Challenges
                    </Typography>
                    <div >
                        {challenges.map((challenge, index) => (
                            <>
                                <Divider />
                                <Typography key={index} className="mb-2">
                                    {challenge.label}
                                </Typography>
                                <div className="mt-4">
                                    <Slider
                                        value={challenge.start}
                                        max={challenge.end}
                                        marks
                                        track="inverted"
                                        valueLabelDisplay="auto"
                                        className="mx-2"
                                    />
                                    <Typography variant="caption" className="text-center block">
                                        {challenge.start}/{challenge.end} Steps Completed
                                    </Typography>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </Popover>
        </div>
    );
}

export default App;
