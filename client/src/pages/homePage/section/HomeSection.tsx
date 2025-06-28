import StatsDataCard from "../../../components/landingPageComponent/StatsDataCard.tsx";
import socialMediaImage from '../../../assets/landingPageImage/sample3.png';
import rightArrowIcon from '../../../assets/landingPageImage/right-arrow.png';

import { metaData } from '../../../utils/constants.ts';

const HomeSection = () => {

    return(
        <div className="h-[calc(100dvh-5rem)] pt-5">
            <div className="flex w-[70%] mx-auto h-fit">
                {/* Left section */}
                <div className="w-1/2 flex flex-col justify-center">
  <h1 className="text-4xl font-extrabold">Build Meaningful Connections</h1>
  <h1 className="text-4xl font-extrabold pb-8">
    with <span className="text-blue-600">Connective</span>
  </h1>
  <p className="text-slate-700 pb-8">
    Join a growing network of professionals, creators, and learners. Discover communities, share your ideas, and grow together in a space designed for collaboration.
  </p>
  <button className="bg-blue-600 px-5 py-3 rounded-full font-extrabold text-white cursor-pointer hover:bg-blue-800 transition-all flex w-fit">
    <p className="pr-2">Get Started</p>
    <img src={rightArrowIcon} alt="" width={15} className="invert-100 my-auto" />
  </button>
</div>


                {/* Right section */}
                <div className="w-1/2 flex justify-center">
                    <img src={socialMediaImage} alt="" width={500} />
                </div>
            </div>

            {/* New section */}
            <div className="w-7/10 flex justify-between mx-auto">
                {
                    metaData.map((data, index) => (
                        <StatsDataCard key={index} label={data.label} value={data.value} index={index+1} />
                    ))
                }
            </div>
        </div>
    );
}

export default HomeSection;