import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Is it free?",
    answer: "Yes! Connective offers a free plan with essential features. You can upgrade anytime for more benefits."
  },
  {
    question: "Can I join multiple communities?",
    answer: "Absolutely! You can join as many communities as you like and interact freely within each."
  },
  {
    question: "How is my data used?",
    answer: "Your data is used solely to personalize your experience. We do not share your data with third parties."
  },
  {
    question: "Can I delete my account?",
    answer: "Yes. You can delete your account at any time from your profile settings."
  }
];

const FaqSection = () => {
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
    <section className="w-11/12 max-w-6xl mx-auto py-10">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Side */}
        <div className="bg-blue-50 p-8 rounded-2xl shadow-sm">
          <h2 className="text-4xl font-extrabold mb-4 text-blue-700">Need Help?</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Find answers to common questions. If you’re still not sure, you can reach out anytime.
          </p>
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition cursor-pointer">
            Contact Support
          </button>
        </div>

        {/* Right Side - FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                onClick={() => toggle(index)}
                className={`rounded-2xl p-5 transition-all duration-300 backdrop-blur-md shadow-md border cursor-pointer ${
                  isOpen ? "border-blue-600 bg-white/70" : "border-gray-200 bg-white/50"
                }`}
              >
                <button className="w-full flex items-center justify-between text-left cursor-pointer">
                  <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-blue-600" : "rotate-0 text-gray-400"
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 mt-4 opacity-100" : "max-h-0 mt-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ask a Question Form */}
      <div className="mt-10 max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-blue-700 mb-4">Ask Us a Question</h3>
        <p className="text-gray-600 mb-6">Have something on your mind? Let us know and we'll get back to you.</p>
        {submitted ? (
          <p className="text-green-600 font-semibold text-center">Thank you! We'll reach out to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Question</label>
              <textarea
  placeholder="Type your question..."
  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
  rows={4}
  required
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
/>

            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-blue-800 transition font-semibold"
              >
                Submit Question
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default FaqSection;
