
import { useSelector } from "react-redux";
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import ContactUs from "./ContactUs";
import Features from "./Features";

const Home = () => {

    const user = useSelector(state => state?.user) ;
    console.log(user)

    return (
        <div>
            <Banner/>
            <Features/>
            <AboutUs/>
            <ContactUs/>
        </div>
    );
};

export default Home;
