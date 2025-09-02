import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { faqs } from "../../../constants/landingPageConstants";

const FaqSection = ({ id }: { id: string }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [email, setEmail] = useState("");
    const [question, setQuestion] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const toggle = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Question:", question);
        setSubmitted(true);
        setEmail("");
        setQuestion("");
    };

    return (
        <section id={id} className="scroll-mt-12 md:scroll-mt-20 w-11/12 max-w-6xl mx-auto py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10 text-black dark:text-white">
                Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">

                {/* Left Side */}
                <div className="bg-blue-50 dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-sm">
                    <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4 text-blue-700 dark:text-blue-500">
                        Need Help?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-200 text-sm md:text-lg leading-relaxed">
                        Find answers to common questions. If you're still not sure, you can reach out anytime.
                    </p>
                    <button className="mt-3 md:mt-6 bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-full font-semibold transition cursor-pointer">
                        Contact Support
                    </button>
                </div>

                {/* Right Side - FAQ Accordion */}
                <div className="space-y-4">
                    {
                        faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={index} onClick={() => toggle(index)} className={`rounded-2xl p-5 transition-all duration-300 shadow-md border cursor-pointer ${isOpen ? "border-blue-600 bg-white/70 dark:bg-slate-700 dark:border-blue-500" : "border-gray-200 bg-white/50 dark:bg-slate-800 dark:border-slate-600"}`}>
                                    <button className="w-full flex items-center justify-between text-left cursor-pointer">
                                        <span className="text-lg font-semibold text-gray-800 dark:text-white">{faq.question}</span>
                                        <FaChevronDown className={`transition-transform duration-300
                                            ${isOpen
                                            ? "rotate-180 text-blue-600 dark:text-blue-400"
                                            : "rotate-0 text-gray-400 dark:text-gray-300"
                                            }`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 mt-4 opacity-100" : "max-h-0 mt-0 opacity-0"}`}>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            {/* Ask a Question Form */}
            <div className="mt-5 md:mt-10 max-w-3xl mx-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2 md:mb-4">Ask Us a Question</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
                    Have something on your mind? Let us know and we'll get back to you.
                </p>
                {
                submitted ? (
                        <p className="text-green-600 dark:text-green-400 font-semibold text-center">
                            Thank you! We'll reach out to you soon.
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Email Address</label>
                                <input type="email" placeholder="Enter your email" className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-black dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Your Question</label>
                                <textarea placeholder="Type your question..." className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-black dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" rows={4} required value={question} onChange={(e) => setQuestion(e.target.value)}/>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-full cursor-pointer transition font-semibold">Submit Question</button>
                            </div>
                        </form>
                    )
                }
            </div>
        </section>

    );
};

export default FaqSection;
