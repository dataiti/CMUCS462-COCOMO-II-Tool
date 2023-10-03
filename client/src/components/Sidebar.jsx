import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Swal from "sweetalert2";

import useDebounce from "../hooks/useDebounce";
import logo from "../assets/cocomologo.jpg";
import Button from "./Button";
import {
  IoIosConstruct,
  IoMenu,
  IoTrash,
  FiSearch,
  BiLoaderCircle,
  IoCloseCircleSharp,
} from "../utils/icon";
import { authSelect, logoutThunkAction } from "../redux/features/authSlice";
import LoginPage from "../pages/LoginPage";
import Modal from "./Modal";
import RegisterPage from "../pages/RegisterPage";
import Loading from "./Loading";
import {
  clearListHistoryConstructions,
  constructionSelect,
  deleteConstructionThunkAction,
  getListConstructionProjectThunkAction,
} from "../redux/features/constructionSlice";
import { clearResult } from "../redux/features/caculateSlice";

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState("asc");
  const [sortBy, setSortBy] = useState("-_id");
  const [q, setQ] = useState("");

  const inputRef = useRef();

  const debouncedValue = useDebounce(q, 500);

  const { userInfo, isLoggedIn } = useSelector(authSelect);
  const { listHistoryConstructions } = useSelector(constructionSelect);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setIsLoading(true);
        if (isLoggedIn) {
          await dispatch(
            getListConstructionProjectThunkAction({
              userId: userInfo?._id,
              orderBy,
              sortBy,
              q: debouncedValue,
            })
          );
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchAPI();
  }, [userInfo?._id, orderBy, sortBy, debouncedValue, dispatch]);

  const handleSetQ = (e) => {
    setQ(e.target.value);
  };

  const handleNewProject = () => {
    dispatch(clearResult());
    navigate("/calculate");
    window.scrollTo(0, 0);
  };

  const handleClear = () => {
    setQ("");
    inputRef.current.focus();
  };

  const handleLogout = () => {
    setIsLoading(true);
    dispatch(logoutThunkAction({ refreshToken: userInfo?.refreshToken }))
      .unwrap()
      .then(() => {
        toast.success("Logout successfully !");
        dispatch(clearListHistoryConstructions());
        setIsLoading(false);
      })
      .then(() => {
        navigate("/calculate");
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteConstruction = async ({ constructionId }) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0B5345 ",
        cancelButtonColor: "#A93226",
        confirmButtonText: "Agree, delete it!",
      }).then(async (result) => {
        setIsLoading(true);
        if (result.isConfirmed) {
          await dispatch(
            deleteConstructionThunkAction({
              userId: userInfo?._id,
              constructionId,
            })
          );
          Swal.fire(
            "Deleted!",
            "Deleted construction in construction history list.",
            "Successfully!"
          );
          navigate("/calculate");
        }
        setIsLoading(false);
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-bg-sidebar h-full w-full">
      {isLoading && <Loading />}
      <div className="h-[10%] px-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link to="/">
            <img
              src={logo}
              alt=""
              className="w-14 h-14 object-cover rounded-lg"
            />
          </Link>
          <p className="uppercase text-white font-extrabold text-2xl">
            COCOMO II
          </p>
        </div>
        <span className="text-white">
          <IoMenu size={25} />
        </span>
      </div>
      {isLoggedIn && (
        <div className="h-[4%] bg-[#40414f] flex items-center justify-center text-sm text-white border-b border-t border-gray-500">
          Construction history
        </div>
      )}
      {isLoggedIn ? (
        <div className="h-[76%]  overflow-y-auto">
          <div className="px-2 py-2">
            <Button
              outline
              className="w-full rounded-full hover:bg-slate-800 transition-all"
              leftIcon={<AiOutlinePlusCircle size={18} />}
              onClick={handleNewProject}
            >
              New Project
            </Button>
          </div>
          <div className="px-2 mb-2">
            <div className="relative w-full p-1 rounded-full flex items-center bg-gray-600 z-10">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search construction ..."
                className="text-white outline-none text-sm flex-1 py-2 pl-12 placeholder:text-sm bg-transparent"
                value={q}
                onChange={handleSetQ}
                spellCheck={false}
              />
              {!!q && !isLoading && (
                <span
                  className="text-white hover:text-gray-200 cursor-pointer"
                  onClick={handleClear}
                >
                  <IoCloseCircleSharp size={24} />
                </span>
              )}
              {isLoading && (
                <span className="animate-spin text-white">
                  <BiLoaderCircle size={24} />
                </span>
              )}
              <Button
                leftIcon={<FiSearch size={20} />}
                className="absolute text-white flex items-center justify-center left-1 top-1/2 -translate-y-1/2 p-2 "
              />
            </div>
          </div>
          <div className="flex flex-col h-full">
            {listHistoryConstructions.length > 0 &&
              listHistoryConstructions.map((construction) => (
                <NavLink
                  key={construction?._id}
                  className={({ isActive }) =>
                    `flex items-center justify-between text-gray-400 px-6 py-4 font-semibold cursor-pointer hover:text-gray-300 hover:bg-[#5d5e71] transition-all group ${
                      isActive
                        ? "bg-[#40414f] text-white border-l-[6px] border-yellow-500"
                        : ""
                    }`
                  }
                  to={`/construction/${construction?._id}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="bg-slate-600 p-1 rounded-md">
                      <IoIosConstruct size={18} color="white" />
                    </span>
                    <p className="text-sm">
                      {construction?.sizeType} -{" "}
                      {construction?.projectName?.slice(0, 14)}{" "}
                      {construction?.projectName.length > 14 && "..."}
                    </p>
                  </div>
                  <span
                    className="hidden group-hover:block"
                    onClick={() =>
                      handleDeleteConstruction({
                        constructionId: construction._id,
                      })
                    }
                  >
                    <IoTrash size={24} className="hover:text-white" />
                  </span>
                </NavLink>
              ))}
          </div>
        </div>
      ) : (
        <div className="h-[82%] overflow-y-auto">
          <div className="bg-[#40414f] py-4 px-8 text-sm text-white">
            Please login for a better experience
          </div>
        </div>
      )}
      {isLoggedIn ? (
        <div className="h-[10%] w-full flex justify-between items-center gap-1 border-t border-gray-600 px-4">
          {userInfo && (
            <div className="flex flex-2 gap-2 items-center">
              <img
                src={userInfo?.avatar}
                alt=""
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-xs font-bold text-white">
                  {userInfo?.displayName || userInfo?.username}
                </p>
                <p className="text-xs font-bold text-gray-500">
                  {userInfo?.email?.slice(0, 16) + "..."}
                </p>
              </div>
            </div>
          )}
          <Button
            primary
            className="w-[100px] bg-emerald-900 hover:bg-emerald-800"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="h-[8%] flex justify-center items-center gap-2 w-full border-t border-gray-600 px-4">
          <Modal
            nameBtn="Login"
            primary={true}
            classNameBtn="w-full bg-emerald-900 hover:bg-emerald-800"
          >
            <LoginPage />
          </Modal>
          <Modal
            nameBtn="Register"
            primary={true}
            classNameBtn="w-full bg-emerald-900 hover:bg-emerald-800"
          >
            <RegisterPage />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
