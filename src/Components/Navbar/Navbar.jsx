import { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Loader } from "../../Pages/Loader/Loader";
import { XpensoLogo } from "../Logo/XpensoLogo";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

export const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const [open, setOpen] = useState(false);

  // li and links
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-medium" : "font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-expense"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-medium" : "font-medium"
          }
        >
          My Expense
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-expense"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-medium" : "font-medium"
          }
        >
          Add Expense
        </NavLink>
      </li>
    </>
  );

  // sign out function
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            console.log("Sign out successful");
            Swal.fire("Signed Out!", "You have been logged out.", "success");
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div className="bg-white/30 backdrop-blur-md shadow fixed w-full top-0 z-100">
      <div className="navbar py-4 container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <XpensoLogo />
        </div>
        <div className=" navbar-center">
          <ul className="gap-4 px-1 hidden lg:flex">{links}</ul>
        </div>
        <div className=" navbar-end">
          <div className="relative flex items-center gap-4">
            {user ? (
              <div className=" flex justify-center items-center gap-4">
                <button
                  onClick={() => {
                    handleSignOut();
                    setOpen(false);
                  }}
                  className="px-4 font-medium py-2 hover:bg-blue-500 cursor-pointer bg-blue-400 rounded"
                >
                  Logout
                </button>
                <img
                  className="w-9 h-9 rounded-full"
                  src={user?.photoURL}
                  alt="User"
                  title={user.displayName}
                />
              </div>
            ) : (
              <Link
                to="/login"
                className="btn border-none shadow-none  bg-blue-500 text-white"
              >
                Join Us
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
