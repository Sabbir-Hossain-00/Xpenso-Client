import { use } from "react";
import { FacebookIcon, Github, Instagram, Twitter } from "lucide-react";
import { toast } from "react-toastify";
import { XpensoLogo } from "../Logo/XpensoLogo";
import { AuthContext } from "../../Context/AuthContext";

export const Footer = () => {
  const { isDark, user } = use(AuthContext);
  return (
    <section className={` ${isDark ? "bg-black" : "bg-white"}`}>
      {/* footer */}
      <footer className="pt-20 py-12  shadow-lg">
        <div className="container mx-auto px-3 md:px-6 lg:px-20 xl:px-40 flex flex-col md:flex-row gap-12   justify-between items-start">
          <div className="space-y-4">
            {/* logo */}
            <div className="flex items-center">
             <XpensoLogo/>
            </div>
            <p className={`max-w-xs ${isDark ? "text-white" : "text-black"} `}>
              A smart expense tracker that lets users add, edit, and delete expenses, view detailed analytics, and monitor spending trends effortlessly.
            </p>
            {/* social links */}
            <div className="flex space-x-4 mt-4">
              <a target="blank" href="https://www.facebook.com/jrsabbir00">
                <FacebookIcon
                  className={` hover:text-blue-600 transition duration-500 text-2xl cursor-pointer ${
                    isDark ? "text-white" : "text-black"
                  }`}
                />
              </a>
              <a
                target="blank"
                href="https://www.instagram.com/dhali_sabbir_hossain/"
              >
                <Instagram
                  className={` hover:text-blue-600 transition duration-500 text-2xl cursor-pointer ${
                    isDark ? "text-white" : "text-black"
                  }`}
                />
              </a>
              <a target="blank" href="https://x.com/ms7398037">
                <Twitter
                  className={` hover:text-blue-600 transition duration-500 text-2xl cursor-pointer ${
                    isDark ? "text-white" : "text-black"
                  }`}
                />
              </a>
              <a target="blank" href="https://github.com/Sabbir-Hossain-00">
                <Github
                  className={` hover:text-blue-600 transition duration-500 text-2xl cursor-pointer ${
                    isDark ? "text-white" : "text-black"
                  }`}
                />
              </a>
            </div>
          </div>
          {/* subscribe news-letter */}
          <div>
            <h4
              className={`text-xl font-semibold mb-4 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Stay Updated
            </h4>
            <p className="text-sm mb-3">Subscribe to our newsletter</p>
            <form className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm w-44"
              />
              <button
                type="button"
                onClick={() => {
                  toast.success("Subscribe done");
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
          {/* contact info */}
          <div className={`${isDark ? "text-white" : "text-black"}`}>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className=" mb-2">Email: support@xpenso.com</p>
            <p className=" mb-2">Phone: +1 (555) 123-4567</p>
            <p className="">Address: 123 Community Lane, Cityville</p>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-600 text-xs">
          &copy; 2025 Xpenso. All rights reserved.
        </div>
      </footer>
    </section>
  );
};
