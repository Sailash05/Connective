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
        <div className=" bg-white dark:bg-slate-950">
            <NavBar/>
            <HomeSection id={'home'} />
            <FeaturesSection id={'features'} />
            <HowItWorksSection />
            <CommunityShowcaseSection id={'reviews'} />
            <BlogSection id={'blogs'} />
            {/* <PricingPlansSection /> */}
            <FaqSection id={'faq'} />
            <CtaSection />
            <FooterSection />
        </div>
    );
}

export default HomePage;