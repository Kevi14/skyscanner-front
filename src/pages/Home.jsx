import Banner from "../components/Homepage/Banner.jsx";
import BookingCard from "../components/Homepage/BookingCard.jsx";
import CalendarFlights from "../components/Homepage/CalendarFlights.jsx";
import DiscountBanner from "../components/Shared/DiscountBanner.jsx";
import {useRef} from "react";

const Home = ()=>{
    const bookingCardRef = useRef(null)
    return(
        <>
            <DiscountBanner />
            <Banner />
            <BookingCard bookingCardRef={bookingCardRef} />
            <CalendarFlights bookingCardRef={bookingCardRef}/>
        </>
    )
}
export default Home