import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";

export const RecentExpenses = () => {
  const [recentExpenses, setRecentExpenses] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchRecentExpenses = async () => {
      try {
        const res = await axiosSecure.get("/recent-expenses");
        setRecentExpenses(res.data);
      } catch (err) {
        console.error("Error fetching recent expenses:", err);
      }
    };
    fetchRecentExpenses();
  }, []);

  return (
    <div className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 py-20">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Recent Expenses</h2>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className=" overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentExpenses.length > 0 ? (
                recentExpenses.map((exp) => (
                  <tr
                    key={exp._id}
                    className="hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                      {exp.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {exp.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(exp.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-500 font-semibold">
                      ${exp.amount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-400 font-medium"
                  >
                    No recent expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
