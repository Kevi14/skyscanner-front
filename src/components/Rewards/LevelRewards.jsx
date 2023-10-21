import {Box, Typography} from "@mui/material";
import React from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import TollIcon from '@mui/icons-material/Toll';

const LevelRewards = ()=>{
    const computeFillPercentage = (value, segmentValue) => {
        return (value / segmentValue) * 100;
    };

    const ProgressStep = ({ value, icon, filledIcon, label }) => {
        const maxSegmentValue = 20;  // Circle fills at 20 units
        const fillPercentage = computeFillPercentage(value, maxSegmentValue);
        const gradientStyle = {
            background: `linear-gradient(90deg, #3880ff ${fillPercentage}%, #E5E7EB ${fillPercentage}%)`
        };

        const isFullyFilled = value === maxSegmentValue;

        return (
            <div className="flex flex-col items-center">
                <div style={gradientStyle} className="w-16 h-16 rounded-full flex justify-center items-center">
                    {isFullyFilled ? filledIcon : icon}
                </div>
                <span className="mt-2">{label}</span>
            </div>
        );
    };

    const ProgressLine = ({ value }) => {
        const maxSegmentValue = 5;  // Line fills at 5 units
        const fillPercentage = computeFillPercentage(value, maxSegmentValue);
        const lineStyle = {
            width: `${fillPercentage}%`,
            background: '#3880ff'
        };

        return (
            <div className="flex relative bottom-4 items-center w-full">
                <div style={lineStyle} className="h-1"></div>
                <div className="flex-1 h-1 bg-gray-300"></div>
            </div>
        );
    };

    const ProgressTracker = ({ value }) => {
        const segmentValues = [20, 5, 20, 5, 20, 5, 20];  // Circle-Line-Circle-Line sequence
        const values = segmentValues.map((segment, index) => {
            let cumulativeValue = segmentValues.slice(0, index + 1).reduce((acc, curr) => acc + curr, 0);
            let remainder = value - cumulativeValue + segment;
            return Math.min(Math.max(remainder, 0), segment);
        });

        return (
            <div className="flex items-center">
                {values.map((val, index, arr) => (
                    index % 2 === 0 ? (
                        <ProgressStep
                            key={index}
                            value={val}
                            icon={<LockOpenIcon />}
                            filledIcon={<LockIcon />}
                            label={['Welcome', 'Silver', 'Gold', 'Diamond'][index / 2]}
                        />
                    ) : (
                        <ProgressLine key={index} value={val} />
                    )
                ))}
            </div>
        );
    };

    return(
        <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
            <div className="flex justify-between">
                <Typography variant="h6" gutterBottom>
                    Flight Level
                </Typography>
                <div className="flex flex-col">
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        Points to spend
                    </Typography>
                    <div className="flex justify-end">
                        <TollIcon sx={{fontSize:30}}/>
                        <Typography variant="h6" sx={{ml:1}} gutterBottom>
                            40
                        </Typography>
                    </div>

                </div>

            </div>

            <ProgressTracker value={40} />

        </Box>
    )
}
export default LevelRewards