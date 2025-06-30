import { FaCheckCircle } from "react-icons/fa";

import { plans } from "../../../utils/landingPageConstants";

const PricingPlansSection = () => {
    return (
        <section className="w-11/12 max-w-6xl mx-auto py-6 md:py-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2 md:mb-4 dark:text-white">Choose Your Plan</h2>
            <p className="text-center text-gray-500 dark:text-gray-200 mb-7 md:mb-14 max-w-xl mx-auto">
                Simple pricing for everyone. No hidden fees. Cancel anytime.
            </p>

            <div className="grid md:grid-cols-3 gap-5 md:gap-10">
                {
                    plans.map((plan, index) => (
                        <div key={index} className={`rounded-3xl p-8 shadow-lg dark:shadow-slate-900 border ${plan.highlight
                        ? "bg-gradient-to-br from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600 dark:border-slate-800 text-white"
                        : "bg-white border-gray-200"}`}>
                            <h3 className={`text-2xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-gray-800'}`}>{plan.name}</h3>
                            <p className={`text-sm mb-4 ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>{plan.subtitle}</p>

                            <div className={`text-4xl font-extrabold mb-6 ${plan.highlight ? 'text-white' : 'text-blue-600'}`}>{plan.price}</div>

                            <ul className="space-y-3 mb-8">
                            {
                                plan.features.map((feature, idx) => (
                                    <li key={idx} className={`flex items-start gap-2 text-sm ${plan.highlight ? 'text-white' : 'text-gray-700'}`}>
                                        <FaCheckCircle className={`${plan.highlight ? 'text-white' : 'text-blue-600'} mt-1`} />
                                        <span>{feature}</span>
                                    </li>
                                ))
                            }
                            </ul>

                            <button className={`w-full py-3 rounded-full font-semibold transition cursor-pointer ${plan.highlight
                            ? "bg-white text-blue-600 hover:bg-gray-100"
                            : "bg-blue-600 text-white hover:bg-blue-800"}`}>
                                {
                                    plan.name === "Free" ? "Get Started" : "Upgrade to " + plan.name
                                }
                            </button>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default PricingPlansSection;
