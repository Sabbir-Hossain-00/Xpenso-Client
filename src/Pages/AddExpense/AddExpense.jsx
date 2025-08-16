// src/pages/AddExpense.jsx
import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './customDatePickerWidth.css';
import { AuthContext } from "../../context/AuthContext";

export const AddExpense = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState(null); // for DatePicker

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const expenseData = {
        ...data,
        amount: parseFloat(data.amount),
        date: startDate, // use selected date
        userName: user?.displayName || "Unknown User",
        userEmail: user?.email || "No Email",
        userPhoto: user?.photoURL || "",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/expenses", expenseData);
      console.log("✅ Expense added:", res.data);

      toast.success("Successfully added");
      reset();
      setStartDate(null);
    } catch (error) {
      toast.error("Failed to add expense");
    }
  };

  return (
    <div className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 py-20">
      <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Expense</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Title must be at least 3 characters" },
              })}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Grocery Shopping"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block font-medium mb-1">Amount</label>
            <input
              type="number"
              step="0.01"
              {...register("amount", {
                required: "Amount is required",
                valueAsNumber: true,
                validate: (value) => value > 0 || "Amount must be greater than 0",
              })}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 1200"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Date Picker */}
          <div className=" customDatePickerWidth">
            <label className="block font-medium mb-1">Date</label>
            <Controller
              control={control}
              name="date"
              rules={{
                required: "Date is required",
              }}
              render={({ field }) => (
                <DatePicker
                  className="w-full customDatePickerWidth border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                  placeholderText="Select date"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    field.onChange(date);
                  }}
                  dateFormat="yyyy-MM-dd"
                />
              )}
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
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};
