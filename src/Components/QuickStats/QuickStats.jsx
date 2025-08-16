import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { Loader } from "../../Pages/Loader/Loader";

const COLORS = ["#FBBF24", "#60A5FA", "#34D399", "#F87171", "#A78BFA"];

export default function DashboardPreview() {
  const [stats, setStats] = useState(null);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axiosSecure.get("/quick-stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <Loader/>;

  return (
    <section className="py-16 bg-gradient-to-r from-blue-100 via-gray-50 to-blue-50">
      {/* stats cards */}
        <div className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition">
          <h3 className="text-xl font-semibold text-gray-700">
            Total Expenses
          </h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">
            ${stats.totalExpenses}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition">
          <h3 className="text-xl font-semibold text-gray-700">This Month</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">
            ${stats.monthlyExpenses}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition">
          <h3 className="text-xl font-semibold text-gray-700">
            Top Category
          </h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">
            {stats.topCategory}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Expenses by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {stats.categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Monthly Expense Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#60A5FA" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
        </div>
      {/* Stats Grid */}
      
    </section>
  );
}
