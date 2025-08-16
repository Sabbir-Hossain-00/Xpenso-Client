import { Link } from "react-router";

export const Hero = () => {
  return (
    <section className="bg-blue-400 text-gray-900">
      <div className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 py-20 grid md:grid-cols-2 items-center gap-10">
        {/* Left Side Content */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Take Control of Your <span className="text-white">Expenses</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-800">
            Xpenso helps you track your spending, manage budgets, and stay
            financially fit. Start your journey towards smarter money management
            today.
          </p>
          <div className="flex gap-4">
            <Link
              to="/add-expense"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition text-sm md:text-base"
            >
              Add Expense
            </Link>
            <Link
              to="/my-expense"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition text-sm md:text-base"
            >
              View Expenses
            </Link>
          </div>
        </div>

        {/* Right Side Image/Illustration */}
        <div className="flex justify-end">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4359/4359963.png"
            alt="Expense Tracker Illustration"
            className="w-80 md:w-[400px] drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
