import { TextField, Button, Tabs, Tab, Radio, RadioGroup, FormControlLabel, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { Close } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
const BookingCard = () => {
    return(
        <div className="w-[75%] min-h-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[10%] shadow-lg">
            <Tabs className="w-full bg-black bg-opacity-50 flex" value="" onChange={()=>{}} aria-label="basic tabs example">
                <Tab label="Book Trip" value="1" style={{ color: 'white',backgroundColor:"#0D3A8A", flexGrow: 1 }}/>
                <Tab label="Manage Booking" value="2" style={{ color: 'white', flexGrow: 1 }}/>
                <Tab label="Check in" value="3" style={{ color: 'white', flexGrow: 1 }}/>
                <Tab label="Flight Status" value="3" style={{ color: 'white', flexGrow: 1 }}/>
                <Tab label="Flight Schedule" value="3" style={{ color: 'white', flexGrow: 1 }}/>
            </Tabs>


            <div className="p-8 bg-gray-50 h-full">
                <h1 className="text-xl mb-4">Hi, where would you like to go?</h1>

                <div className="flex items-center mb-4 space-x-4">
                    <RadioGroup row defaultValue="bookFlights">
                        <FormControlLabel value="bookFlights" control={<Radio />} label="Book flights" />
                        <FormControlLabel value="redeemFlights" control={<Radio />} label="Redeem flights" />
                    </RadioGroup>
                    <div className="ml-auto">
                        <FormControlLabel control={<input type="checkbox" className="mr-2" />} label="Express Booking - quicker, easier" />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                    <TextField
                        label="FROM"
                        defaultValue="Singapore"
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputProps={{
                           endAdornment: (
                               <InputAdornment position="end">
                                   <IconButton
                                       edge="end"
                                       onClick={()=>{}}
                                   >
                                       <Close />
                                   </IconButton>
                               </InputAdornment>
                           )
                        }}
                    />
                    <TextField
                        label="To"
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        type="date"
                        label="Depart Date"
                        variant="outlined"
                        fullWidth
                        className="mr-2"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        type="date"
                        label="Return Date"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />
                </div>
                <div className="grid-cols-4 gap-2 grid mb-4">
                    <FormControl variant="outlined" size="small" style={{ minWidth: '120px' }}>
                        <InputLabel>CLASS</InputLabel>
                        <Select value="Economy" label="CLASS">
                            <MenuItem value="Economy">Economy</MenuItem>
                            <MenuItem value="Business">Business</MenuItem>
                            <MenuItem value="FirstClass">First Class</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" size="small" style={{ minWidth: '120px' }}>
                        <InputLabel>PASSENGERS</InputLabel>
                        <Select value="1 Adult" label="PASSENGERS">
                            <MenuItem value="1 Elderly">1 Elderly</MenuItem>
                            <MenuItem value="1 Adult">1 Adult</MenuItem>
                            <MenuItem value="1 Child">1 Child</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField fullWidth variant="outlined" size="small" placeholder="Apply promo code" />
                    <Button variant="contained" color="primary" size="large">SEARCH</Button>
                </div>

            </div>
        </div>
    )
}

export default BookingCard;
