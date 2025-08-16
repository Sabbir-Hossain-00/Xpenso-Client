import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

export const MyExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch user expenses with optional category
  const fetchExpenses = async (category = "All") => {
    if (!user?.email) return;
    try {
      const url =
        category !== "All" ? `/my-expense?category=${category}` : "/my-expense";
      const res = await axiosSecure.get(url);
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses(categoryFilter);
  }, [user, categoryFilter]);

  // Fetch quick stats
  useEffect(() => {
    axiosSecure.get("/quick-stats").then((res) => setStats(res.data));
  }, []);

  const deleteExpense = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This expense will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/expenses/${id}`);
          setExpenses(expenses.filter((exp) => exp._id !== id));
          Swal.fire("Deleted!", "Your expense has been deleted.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 pt-24">
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center py-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">My Expenses</h1>
        <div className=" flex flex-col items-end gap-3">
          <h1 className="text-2xl font-bold text-gray-700 mb-2 ">
            Total Expenses: {stats?.totalExpenses}$
          </h1>
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.length > 0 ? (
                expenses.map((exp) => (
                  <tr
                    key={exp._id}
                    className="hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800 font-medium">
                      {exp.title}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                      {new Date(exp.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      {exp.category}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-blue-500 font-semibold">
                      ${exp.amount}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap flex gap-2 justify-center">
                      <button
                        className="bg-blue-400 hover:bg-blue-500 cursor-pointer font-medium px-3 py-1 rounded transition"
                        onClick={() => navigate(`/edit-expense/${exp._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-100 hover:bg-red-200 font-medium cursor-pointer px-3 py-1 rounded transition"
                        onClick={() => deleteExpense(exp._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-400 font-medium"
                  >
                    No expenses found
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
