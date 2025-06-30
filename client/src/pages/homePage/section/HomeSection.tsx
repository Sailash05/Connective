import StatsDataCard from "../../../components/landingPageComponent/StatsDataCard.tsx";
import socialMediaImage from '../../../assets/landingPageImage/sample3.png';
import rightArrowIcon from '../../../assets/landingPageImage/right-arrow.png';

import { statsData } from '../../../utils/landingPageConstants.ts';

const HomeSection = ({ id }: { id: string }) => {

    return(
        <section id={id} className="min-h-[100dvh] h-fit md:h-[100dvh] pt-[5rem]">
            <div className="md:flex md:flex-row-reverse w-[90%] md:w-[70%] mx-auto h-fit">

                {/* Right section */}
                <div className="md:w-1/2 max-md:mx-auto flex justify-center">
                    <img src={socialMediaImage} alt="Social Media Image" width={500} />
                </div>

                {/* Left section */}
                <div className="md:w-1/2 flex flex-col justify-center dark:text-white">
                    <h1 className="text-[1.6rem] md:text-4xl font-extrabold">Build Meaningful Connections</h1>
                    <h1 className="text-[1.6rem] md:text-4xl font-extrabold pb-4 md:pb-8">
                        with <span className="text-blue-600 dark:text-blue-500">Connective</span>
                    </h1>
                    <p className="text-slate-700 dark:text-slate-200 pb-4 md:pb-8">Join a growing network of professionals, creators, and learners. Discover communities, share your ideas, and grow together in a space designed for collaboration.</p>
                    <button className="bg-blue-600 px-5 py-3 rounded-full font-extrabold text-white cursor-pointer hover:bg-blue-800 transition-all flex w-fit">
                        <p className="pr-2">Get Started</p>
                        <img src={rightArrowIcon} alt="" width={15} className="invert my-auto" />
                    </button>
                </div>                
            </div>

            {/* Stats section */}
            <div className="mt-12 md:mt-0 max-sm:flex-wrap max-sm:gap-2 w-[90%] md:w-[70%] flex justify-between mx-auto">
                {
                    statsData.map((data, index) => (
                        <StatsDataCard key={index} label={data.label} value={data.value} index={index+1} />
                    ))
                }
            </div>
        </section>
    );
}

export default HomeSection;