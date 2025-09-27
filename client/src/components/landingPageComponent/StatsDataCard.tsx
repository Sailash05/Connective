import icon1 from '../../assets/landingPageImage/metaDataIcons/post.png';
import icon2 from '../../assets/landingPageImage/metaDataIcons/user.png';
import icon3 from '../../assets/landingPageImage/metaDataIcons/education.png';
import icon4 from '../../assets/landingPageImage/metaDataIcons/community.png';
import icon5 from '../../assets/landingPageImage/metaDataIcons/group.png';
import icon6 from '../../assets/landingPageImage/metaDataIcons/feedback.png';

type MetaDataCardProps = {
    label: string;
    value: string;
    index: Number
};

const icons: Record<number, string> = {
    1: icon1,
    2: icon2,
    3: icon3,
    4: icon4,
    5: icon5,
    6: icon6,
};

const StatsDataCard = ({ label, value, index }: MetaDataCardProps) => {
    return (
        <div className={`w-[10rem] h-[8rem] max-sm:basis-[30%] rounded-xl text-white bg-gradient-${index} relative overflow-hidden shadow-md cursor-pointer`}>
        
            <div className="absolute w-14 h-14 md:w-24 md:h-24 rounded-full bg-white/20 top-2 left-2"></div>
            <div className="absolute w-13 h-13 md:w-20 md:h-20 rounded-full bg-white/30 top-10 right-4"></div>
            <div className="absolute w-14 h-14 md:w-28 md:h-28 rounded-full bg-white/10 bottom-[-10px] left-[30%]"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <img src={icons[Number(index)]} alt={label} width={40} className="mb-2" />
                <h1 className="text-2xl font-bold text-center">{value}</h1>
                <p className="text-sm text-center">{label}</p>
            </div>
        </div>
    );
};

export default StatsDataCard;