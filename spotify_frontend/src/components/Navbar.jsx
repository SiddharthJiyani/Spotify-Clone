import React from "react";
import TextWithHover from "../components/TextWithHover";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Toaster, toast } from "react-hot-toast";

const Navbar = () => {

  const [cookies, setCookie] = useCookies(['token']); 
  const navigate = useNavigate();

  const logout = () => {
    toast.success("Logged out successfully", {
      duration: 1000,
    });
    setTimeout(() => {
      setCookie("token", "", { path: "/" }); // remove the token and go to login page
      // window.location.reload(); // refresh the page
      navigate("/login");
    }, 1000);
  };
  return (
    <div className="navbar w-full h-[10%] bg-[#101010] flex items-center justify-end mb-4 rounded-b-lg ">
      <div className="w-[60%] flex h-full">
        <div className=" w-[50%] flex justify-around items-center">
          <TextWithHover displayText={"Premium"} />
          <TextWithHover displayText={"Support"} />
          <TextWithHover displayText={"Download"} />
          <div className="h-1/2 border-r border-white"></div>
        </div>
        <div className="w-[55%] flex justify-around h-full items-center pr-6 gap-1">
          <Link to="/uploadSong">
            <TextWithHover
              displayText={"Upload Song"}
              properties={"hover:scale-[1.08] ml-2"}
            />
          </Link>
          <Link
            to="/login"
            className="bg-white mr-2 h-2/3 px-6 flex items-center justify-center rounded-full font-semibold cursor-pointer hover:scale-[1.05] transition-all duration-150">
            {/* Log in */}
            {cookies.token ? (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}>
                Log Out
              </span>
            ) : (
              "Log In"
            )}
          </Link>
          <div className="text-white relative">
            <Link to="/profile">
              <img className="w-11 h-11  hover:cursor-pointer" src="https://cdn-icons-png.freepik.com/512/848/848006.png?ga=GA1.1.627870064.1704298417&" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
