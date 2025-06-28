import NavBar from "../../components/landingPageComponent/NavBar";
import HomeSection from "./section/HomeSection";
import FeaturesSection from "./section/FeaturesSection";
import HowItWorksSection from "./section/HowItWorksSection";
import CommunityShowcaseSection from "./section/CommunityShowcaseSection";
import BlogSection from "./section/BlogSection";
import PricingPlansSection from "./section/PricingPlansSection";
import FaqSection from "./section/FaqSection";
import CtaSection from "./section/CtaSection";
import FooterSection from "./section/FooterSection";

import './homePage.css';

const HomePage = () => {

    return(
        <div className="pt-[5rem]"> 
            <NavBar/>
            <HomeSection />
            <FeaturesSection />
            <HowItWorksSection />
            <CommunityShowcaseSection />
            <BlogSection />
            <PricingPlansSection />
            <FaqSection />
            <CtaSection />
            <FooterSection />
        </div>
    );
}

export default HomePage;