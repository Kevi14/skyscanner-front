import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import api from "../../api/api";
import { toast } from "react-toastify";

const cities = ["New York City", "London", "Rome", "Tirana"];

const BookingCard = ({ bookingCardRef }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [flightClass, setFlightClass] = useState("Economy");
  const [departureDate, setDepartureDate] = useState("");
  const access = useSelector((state) => state.auth.token); // Replace with your actual access token or its retrieval logic
  const flightDetails = useSelector((state) => state.flightDetails);
  const { departure, arrival, price, selectedDate, discountedPrice } =
    flightDetails;

  const handleGetDiscounts = async () => {
    try {
      const response = await api.get("reward-info/generate_promo/", {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      });

      console.log(JSON.parse(response.data.data));
    } catch (error) {
      console.error("Error fetching discount info:", error);
    }
  };

  const handleBooking = async () => {
    try {
      const response = await api.post(
        "/bookings/",
        {
          departure_location: from,
          arrival_location: to,
          departure_date: departureDate,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Ticket bought successfully");
    } catch (error) {
      toast.error("Something happened, please try again");
    }
  };

  useEffect(() => {
    setFrom(departure);
    setTo(arrival);
    setDepartureDate(selectedDate);
  }, [departure, arrival, selectedDate]);
  return (
    <div
      ref={bookingCardRef}
      className="w-[75%] min-h-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[10%] shadow-lg"
    >
      <Tabs
        className="w-full bg-black bg-opacity-50 flex"
        value=""
        onChange={() => {}}
        aria-label="basic tabs example"
      >
        <Tab
          label="Book Trip"
          value="1"
          style={{ color: "white", backgroundColor: "#0D3A8A", flexGrow: 1 }}
        />
        <Tab
          label="Manage Booking"
          value="2"
          style={{ color: "white", flexGrow: 1 }}
        />
        <Tab
          label="Check in"
          value="3"
          style={{ color: "white", flexGrow: 1 }}
        />
        <Tab
          label="Flight Status"
          value="4"
          style={{ color: "white", flexGrow: 1 }}
        />
        <Tab
          label="Flight Schedule"
          value="5"
          style={{ color: "white", flexGrow: 1 }}
        />
      </Tabs>

      <div className="p-8 bg-gray-50 h-full">
        <h1 className="text-xl mb-4">Hi, where would you like to go?</h1>

        <div className="flex items-center mb-4 space-x-4">
          <RadioGroup row defaultValue="bookFlights">
            <FormControlLabel
              value="bookFlights"
              checked={true}
              control={<Radio />}
              label="Book flights"
            />
            <FormControlLabel
              value="redeemFlights"
              disabled={true}
              control={<Radio />}
              label="Redeem flights"
            />
          </RadioGroup>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option}
            onChange={(e, value) => setFrom(value)}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Departure"
                variant="outlined"
                value={from}
              />
            )}
            value={from}
          />
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option}
            onChange={(event, value) => setTo(value)}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Arrival"
                variant="outlined"
                value={to}
              />
            )}
            value={to}
          />
          <TextField
            type="date"
            label="Depart Date"
            value={departureDate} // Use the state variable as value
            onChange={(e) => setDepartureDate(e.target.value)} // Update state on change
            variant="outlined"
            fullWidth
            className="mr-2"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl
            variant="outlined"
            size="small"
            style={{ minWidth: "120px" }}
          >
            <InputLabel>CLASS</InputLabel>
            <Select
              value={flightClass}
              onChange={(event) => setFlightClass(event.target.value)}
              label="CLASS"
            >
              <MenuItem value="Economy">Economy</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="FirstClass">First Class</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="grid-cols-4 gap-2 grid mb-4">
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Apply promo code"
          />
          <div className="flex justify-between px-1 pr-32 items-center border border-1.5 rounded-md border-gray-400">
            <Typography variant="body1">Price</Typography>
            <Typography>{price ? price : "---"} </Typography>
            <div className="relative inline-block">
              <span className="relative z-10">{discountedPrice}</span>
              <div className="absolute left-0 bottom-1/2 w-full h-0.5 bg-black"></div>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleBooking}
          >
            BUY NOW
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGetDiscounts}
          >
            BUY NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
