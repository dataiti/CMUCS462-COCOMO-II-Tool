import React from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { useSelector } from "react-redux";
import { authSelect } from "../redux/features/authSlice";

const HomePage = () => {
  const { isLoggedIn } = useSelector(authSelect);

  return (
    <div className="bg-slate-200/80 min-h-screen flex flex-col gap-3 items-center justify-center">
      <h3 className="font-extrabold text-2xl">
        COCOMO II - Constructive Cost Model
      </h3>
      <div className="flex items-center gap-2">
        {!isLoggedIn && (
          <>
            <div className="flex items-center gap-2">
              <Modal
                nameBtn="Login"
                primary={true}
                classNameBtn="w-[160px] bg-emerald-900 hover:bg-emerald-800"
              >
                <LoginPage />
              </Modal>
              <Modal
                nameBtn="Register"
                primary={true}
                classNameBtn="w-[160px] bg-emerald-900 hover:bg-emerald-800"
              >
                <RegisterPage />
              </Modal>
            </div>
            <div className="w-[2px] h-10 bg-gray-700"></div>
          </>
        )}
        <Button
          primary
          to="/calculate"
          className="w-[160px] bg-sky-950 hover:bg-sky-900"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
