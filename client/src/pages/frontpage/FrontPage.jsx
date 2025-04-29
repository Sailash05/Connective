import NavBar from "../../component/NavBar";
import AboutSection from "./sections/AboutSection";
import MainSection from "./sections/MainSection";

const FrontPage = () => {
    return (
        <main className="">
            <NavBar />
            <MainSection />
            <AboutSection />
        </main>
    )
}

export default FrontPage;