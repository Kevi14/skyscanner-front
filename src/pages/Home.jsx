import Banner from "../components/Homepage/Banner.jsx";
import BookingCard from "../components/Homepage/BookingCard.jsx";
import CalendarFlights from "../components/Homepage/CalendarFlights.jsx";
import DiscountBanner from "../components/Shared/DiscountBanner.jsx";

const Home = ()=>{
    return(
        <>
            <DiscountBanner />
            <Banner />
            <BookingCard />
            <CalendarFlights />
        </>
    )
}
export default Home