import AboutSectionCard from "../../../component/AboutSectionCard"

import { about } from "../../../utils/constants" 

const AboutSection = () => {
    return (
        <section className="pt-[5rem] px-[12rem] dark:bg-gray-950">
            <h1 className="text-4xl max-sm:text-3xl font-extrabold dark:text-white"><span className="text-blue-600">C</span>onnect. <span className="text-blue-600">S</span>hare. <span className="text-blue-600">D</span>iscover</h1>
            <h2 className="text-slate-800 dark:text-slate-200 mt-3">Join a community of creators, share your thoughts, and make lasting connections.</h2>
            
            <div className="mt-[5rem] flex flex-wrap justify-center gap-8">
                {
                    about.map((element) => (
                        <AboutSectionCard value={element.value} txt={element.txt} image={element.image} bgcolor={element.bgcolor} key={element.value}/>
                    ))
                }
            </div>
            {/* <AboutSectionCard /> */}
            
        </section>
    )
}

export default AboutSection