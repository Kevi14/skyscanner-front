import React, {useState} from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { TextField, Checkbox, Slider } from '@mui/material';

export default function FlightPicker() {
    const [date, setDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);

    const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

    const startingDay = (month, year) => new Date(year, month - 1, 1).getDay();

    const onMonthChange = (direction) => {
        const newDate = new Date(date);
        if (direction === 'prev') {
            newDate.setMonth(date.getMonth() - 1);
        } else {
            newDate.setMonth(date.getMonth() + 1);
        }
        setDate(newDate);
    }

    const monthDays = daysInMonth(date.getMonth() + 1, date.getFullYear());
    const previousMonthDays = daysInMonth(date.getMonth(), date.getFullYear());
    const startDay = startingDay(date.getMonth() + 1, date.getFullYear());
    return (
        <div className="h-full mx-[13%] p-8 mt-[300px] mb-10 bg-white rounded-md shadow-md "> {/* Container */}
            {/* Flight Details */}
            <div>
                <div className="flex justify-between mb-4">
                    <TextField label="City" variant="outlined" className="w-2/3 mr-2" />
                    <TextField label="LON" variant="outlined" className="w-1/4" />
                </div>

                {/* Options */}
                <div className="flex space-x-4 mb-4">
                    <div>
                        <Checkbox />
                        <label>One way</label>
                    </div>
                    <div>
                        <Checkbox />
                        <label>Direct flights only</label>
                    </div>
                </div>

                {/* Duration */}
                <div className="mb-4">
                    <label>Vacation duration</label>
                    <Slider valueLabelDisplay="auto" min={7} max={14} defaultValue={7} className="mt-2" />
                </div>
            </div>


            {/* Calendar */}
            <div className="bg-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                    <IconButton onClick={() => {
                        onMonthChange('prev')
                        setSelectedDay(null)
                    }}>
                        <ArrowBackIos />
                    </IconButton>
                    <Typography variant="h6">
                        {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
                    </Typography>
                    <IconButton onClick={() => {
                        onMonthChange('next')
                        setSelectedDay(null)
                    }}>
                        <ArrowForwardIos />
                    </IconButton>
                </div>
                {/* ... other elements ... */}
                <div className="grid grid-cols-7 gap-4 mt-8">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-center font-semibold">{day}</div>
                    ))}

                    {Array.from({ length: startDay }).map((_, index) => (
                        <div key={`prevMonth-${index}`} className="border p-4 text-gray-400">
                            {previousMonthDays - startDay + index + 1}
                        </div>
                    ))}

                    {Array.from({ length: monthDays }).map((_, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setSelectedDay(index + 1);
                                console.log(index + 1);
                            }}
                            className={`border p-4 cursor-pointer ${ selectedDay === (index + 1) ? 'bg-green-400' : 'bg-white'}`}
                        >
                            <div className="text-center">{index + 1}</div>
                            <div className="text-center mt-2">€{Math.floor(Math.random() * 1000)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
