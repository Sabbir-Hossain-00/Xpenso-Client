import {
  FaWallet,
  FaReceipt,
  FaChartLine,
  FaEdit,
  FaUserAlt,
} from "react-icons/fa";

export const HowItWorks = () => {
  // seteps array
  const steps = [
    {
      icon: <FaUserAlt className="text-blue-500 w-10 h-10" />,
      title: "Sign Up / Login",
      description:
        "Create your account or log in to start managing your expenses securely.",
    },
    {
      icon: <FaWallet className="text-blue-500 w-10 h-10" />,
      title: "Add Expenses",
      description:
        "Easily add your daily expenses with title, amount, category, and date.",
    },
    {
      icon: <FaChartLine className="text-blue-500 w-10 h-10" />,
      title: "Track & Analyze",
      description:
        "View your spending patterns, top categories, and monthly trends.",
    },
    {
      icon: <FaEdit className="text-blue-500 w-10 h-10" />,
      title: "Edit/Delete anytime",
      description:
        "Update or remove any expense whenever you want, keeping your records accurate.",
    },
  ];

  return (
    <div className=" bg-blue-50">
      <div className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 text-center mb-12">
          How It Works
        </h2>
        {/* show all steps how it works */}
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-blue-100 rounded-full p-5 mb-4 flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
