// src/pages/EditExpense.jsx
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext";

export const EditExpense = () => {
  const { id } = useParams(); // expense id from URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch expense details
  const fetchExpense = async () => {
    try {
      const res = await axiosSecure.get(`/expenses/${id}`);
      const data = res.data;

      reset({
        title: data.title,
        amount: data.amount,
        category: data.category,
        date: new Date(data.date).toISOString().split("T")[0], // format for input type date
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch expense", "error");
      navigate("/my-expense"); // go back if error
    }
  };

  useEffect(() => {
    fetchExpense();
  }, [id]);

  // Update expense
  const onSubmit = async (formData) => {
    try {
      await axiosSecure.patch(`/expenses/${id}`, formData);
      Swal.fire("Updated!", "Expense has been updated.", "success");
      navigate("/my-expense"); // back to MyExpense page
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update expense", "error");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="py-20">
      <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Expense</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block font-medium mb-1">Amount</label>
            <input
              type="number"
              step="0.01"
              {...register("amount", { required: "Amount is required" })}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Category --</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-400 text-black py-2 px-4 rounded-md font-medium hover:bg-blue-500 transition"
          >
            Update Expense
          </button>
        </form>
      </div>
    </div>
  );
};
