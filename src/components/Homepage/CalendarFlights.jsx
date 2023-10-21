import {useState} from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { TextField, Checkbox, Slider } from '@mui/material';
import api from "../../api/api.js";
import { Autocomplete } from '@mui/material';
const cities = [
    "New York City",
    "London",
    "Rome",
    "Tirana"
];

export default function FlightPicker() {
    const [date, setDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);
    const [departureState, setDepartureState] = useState('');
    const [arrivalState, setArrivalState] = useState('');
    const [flights, setFlights] = useState([]); // Store the flights data
    const [searched, setSearched] = useState(false);

    const currentDate = new Date();
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
    const fetchCalendar = () => {
        api.get(`flights/?origin_city=${departureState}&destination_city=${arrivalState}`)
            .then(response => {
                // Filter out flights with a departure date earlier than the current date
                const relevantFlights = response.data.filter(flight =>
                    new Date(flight.departure_date) > currentDate
                );
                setFlights(relevantFlights);
                setSearched(true);
            })
            .catch(error => {
                console.error("Error fetching flight data:", error);
            });
    }
    const getFlightPriceForDay = (day) => {
        const flightOnDay = flights.find(flight =>
            new Date(flight.departure_date).getDate() === day &&
            new Date(flight.departure_date).getMonth() === date.getMonth() &&
            new Date(flight.departure_date).getFullYear() === date.getFullYear()
        );
        return flightOnDay ? `€${Math.floor(Math.random() * 1000)}` : null;
    }


    return (
        <>
            <div className="mt-[230px] flex flex-row whitespace-nowrap mx-[13%] mb-8">
                <div className="w-full relative top-3 h-1 bg-[#0D3A8A]"></div>
                <Typography variant="h5" component="div" className="px-4 bg-white" sx={{fontWeight:"bold"}}>
                    FLIGHT PLANNER
                </Typography>
                <div className="w-full h-1 relative top-3 bg-[#0D3A8A]"></div>
            </div>
            <div className="h-full mx-[13%] p-8 mb-10 bg-white rounded-md shadow-md grid grid-cols-4 gap-3"> {/* Container */}
                {/* Flight Details */}

                <div className="col-span-1">
                    <div className="flex flex-col justify-between mb-4">
                        <Autocomplete
                            options={cities}
                            getOptionLabel={(option) => option}
                            onChange={(e,value) => setDepartureState(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Departure State"
                                    variant="outlined"
                                    value={departureState}
                                />
                            )}
                        />

                        <Autocomplete
                            options={cities}
                            getOptionLabel={(option) => option}
                            onChange={(event, value) => setArrivalState(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Arrival State"
                                    variant="outlined"
                                    sx={{mt:2,mb:2}}
                                    value={arrivalState}
                                />
                            )}
                        />

                        <Button variant="contained"  onClick={fetchCalendar}>Search</Button>
                    </div>

                    {/* Options */}
                    <div className="flex mb-4">
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
                    <div className="mb-4 ">
                        <label>Vacation duration</label>
                        <Slider valueLabelDisplay="auto" min={7} max={14} defaultValue={7} className="mt-2" />
                    </div>
                </div>


                {/* Calendar */}
                <div className="bg-[#F9FAFB] col-span-3 p-8">
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

                        {Array.from({ length: monthDays }).map((_, index) => {
                            const flightDateMatches = flights.some(flight =>
                                new Date(flight.departure_date).getDate() === index + 1 &&
                                new Date(flight.departure_date).getMonth() === date.getMonth() &&
                                new Date(flight.departure_date).getFullYear() === date.getFullYear()
                            );
                            const isClickable = searched && flightDateMatches;

                            return (
                                <div
                                    key={index}
                                    onClick={isClickable ? () => { setSelectedDay(index + 1) } : null}
                                    className={`border p-4 cursor-pointer ${!isClickable ? 'text-gray-400' : selectedDay === (index + 1) ? 'bg-green-400' : 'bg-white'}`}
                                >
                                    <div className="text-center">{index + 1}</div>
                                    <div className="text-center mt-2">{isClickable ? getFlightPriceForDay(index + 1) : null}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
          );
}
