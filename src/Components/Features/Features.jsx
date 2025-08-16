import { Shield, PieChart, Wallet, TrendingUp } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <Wallet className="w-10 h-10 text-blue-400" />,
      title: "Smart Expense Tracking",
      desc: "Easily log your daily expenses with categories and keep your financial life organized.",
    },
    {
      icon: <PieChart className="w-10 h-10 text-blue-400" />,
      title: "Budget Planning",
      desc: "Set monthly budgets and track your spending progress in real-time with helpful alerts.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-blue-400" />,
      title: "Insightful Analytics",
      desc: "Visualize your expenses through charts and gain insights into where your money goes.",
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-400" />,
      title: "Secure & Private",
      desc: "Your financial data is encrypted and protected, ensuring privacy and security.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-400">Xpenso?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay on top of your finances with features designed to give you
            complete control and clarity over your money.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center"
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
