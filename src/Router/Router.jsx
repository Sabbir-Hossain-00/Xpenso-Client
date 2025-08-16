import { createBrowserRouter } from "react-router";
import { MainLayout } from "../Layouts/MainLayout/MainLayout";
import { Login } from "../Pages/Auth/Login/Login";
import { Register } from "../Pages/Auth/Register/Register";
import { AuthLayout } from "../Layouts/AuthLayout/AuthLayout";
import { Error } from "../Pages/Errors/Error";
import { Home } from "../Pages/Home/Home";
import { AddExpense } from "../Pages/AddExpense/AddExpense";
import { MyExpense } from "../Pages/MyExpense/MyExpense";
import { EditExpense } from "../Pages/EditExpense/EditExpense";
import { PrivateRoute } from "../Routes/PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path:"/add-expense",
        element:<PrivateRoute><AddExpense/></PrivateRoute>
      },
      {
        path:"/my-expense",
        element:<PrivateRoute><MyExpense/></PrivateRoute>
      },
      {
        path:"/edit-expense/:id",
        element:<PrivateRoute><EditExpense/></PrivateRoute>
      }
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
