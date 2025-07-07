import Header from "../../components/mainPageComponent/Header";
import SideNavBar from "../../components/mainPageComponent/SideNavBar";

const MainPage = () => {

    return(
        <div className="h-[100dvh] grid grid-cols-[20%_55%_25%] grid-rows-[auto_1fr]">
            
            <div className="col-span-3">
                <Header />
            </div>
            <div className="overflow-y-hidden">
                <SideNavBar />
            </div>
            <div className="bg-violet-400"></div>
            <div className="bg-blue-400"></div>

        </div>
    );
}

export default MainPage;