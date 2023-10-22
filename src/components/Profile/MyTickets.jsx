import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import api from '../../api/api';
import { useEffect, useState } from 'react';


const MyTickets = ()=>{
    const access = useSelector((state) => state.auth.token);
    const [currentData, setCurrentData]=useState([])
    useEffect(()=>{
        api.get('/bookings' ,{
            headers: {
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json",
            },
          }).then((res)=>setCurrentData(res.data.data))
    },[])
    const list = currentData.sort((a, b)=>new Date(b.tickets[0].issued_date) - new Date(a.tickets[0].issued_date))
    return(
        <div className="rounded-md mb-7 mt- col-span-6 ml-3 ">
            <Typography style={{marginBottom:7}} variant='h4'>My Tickets</Typography>
            {list.map(({id, tickets})=>{
            return(<Accordion key={id}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{tickets[0].booked_segments[0].origin.city}  {'to '}   {tickets[0].booked_segments[0].destination.city} | {tickets[0].booked_segments[0].departure_date}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography fontWeight='bold'>
                     Booking Number:{tickets[0].ticket_number}
                    </Typography>
                    <Typography>
                    <span style={{fontWeight:'bold'}}> Origin City:</span> {tickets[0].booked_segments[0].origin.city}
                    </Typography>
                    <Typography>
                    <span style={{fontWeight:'bold'}}> Origin Airport: </span>{tickets[0].booked_segments[0].origin.airport_name}
                    </Typography>
                    <Typography>
                    <span style={{fontWeight:'bold'}}>Destionation City: </span>{tickets[0].booked_segments[0].destination.city}
                    </Typography>
                    <Typography>
                    <span style={{fontWeight:'bold'}}> Destination Airport: </span>{tickets[0].booked_segments[0].destination.airport_name}
                    </Typography>
                    <Typography>
                    <span style={{fontWeight:'bold'}}>Class:</span> {tickets[0].booked_segments[0].booking_class.type}
                    </Typography>
                    <Typography>
                    <span style={{fontWeight:'bold'}}>Departure Date:</span> {tickets[0].booked_segments[0].departure_date}
                    </Typography>
                    <Typography>
                    <span style={{fontWeight:'bold'}}>Traveller:</span>{tickets[0].traveller}
                    </Typography>
                </AccordionDetails>
            </Accordion>)
            })}
            
        </div>
    )
}
export default MyTickets