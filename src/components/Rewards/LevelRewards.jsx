import {Box} from "@mui/material";
import React from "react";
import LoyaltyIcon from '@mui/icons-material/Loyalty';

const LevelRewards = ({flights})=>{
    const computeFillPercentage = (value, segmentValue) => {
        return (value / segmentValue) * 100;
    };

    const ProgressStep = ({ value, label, total, index }) => {
        const maxSegmentValue = 20;  // Circle fills at 20 units
        const fillPercentage = computeFillPercentage(value, maxSegmentValue);
        const gradientStyle = {
            background: `linear-gradient(90deg, ${total===30?'#9ac5db':total>=20?'#E5E4E2':total>=10?'#FFD700':total>=5?'#C0C0C0':'#CD7F32'} ${value===1?'100':'0'}%, #E5E7EB ${fillPercentage}%)`
        };

        const icons ={
            0:<LoyaltyIcon htmlColor="white"/>,
            2:<LoyaltyIcon htmlColor='white'/>,
            4:<LoyaltyIcon htmlColor='white'/>,
            6:<LoyaltyIcon htmlColor='white'/>,
            8:<LoyaltyIcon htmlColor='white'/>
        }

        return (
            <div className="flex flex-col items-center">
                <div style={gradientStyle} className="w-16 h-16 rounded-full flex justify-center items-center">
                    {icons[index]}
                </div>
                <span className="mt-2">{label}</span>
            </div>
        );
    };

    const ProgressLine = ({ value , total}) => {
        const maxSegmentValue = 1;  // Line fills at 5 units
        const fillPercentage = computeFillPercentage(value, maxSegmentValue);
        const lineStyle = {
            width: `${fillPercentage}%`,
            background:total===30?'#9ac5db':total>=20?'#E5E4E2':total>=10?'#FFD700':total>=5?'#C0C0C0':'#CD7F32'
        };

        return (
            <div className="flex relative bottom-4 items-center w-full">
                <div style={lineStyle} className="h-1"></div>
                <div className="flex-1 h-1 bg-gray-300"></div>
            </div>
        );
    };

    const ProgressTracker = ({ value }) => {
        const segmentValues = [1, 3, 1, 4, 1, 9, 1, 9, 1]; 
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
                            total={value}
                            index={index}
                            value={val}
                            label={['Bronze', 'Silver', 'Gold',"Platinum", 'Diamond'][index / 2]}
                        />
                    ) : (
                        <ProgressLine key={index} value={val} total={value} />
                    )
                ))}
            </div>
        );
    };

    return(
        <Box sx={{ padding: '2em', width:"100%", margin: 'auto', backgroundColor: '#FFF', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
            <ProgressTracker value={flights} />
        </Box>
    )
}
export default LevelRewards