import React, { useState, useEffect } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import DashboardIcon from "../../assets/svg/dashboard-lcon.svg";
import CardHolderIcon from "../../assets/svg/cardHolder-icon.svg";
import PaymentIcon from "../../assets/svg/payment.svg";
import TransactIons from "../../assets/svg/transactions.svg";
import CommissionIcon from "../../assets/svg/commission.svg";
import HelpIcon from "../../assets/svg/help.svg";
import LogoutIcon from "../../assets/svg/logout.svg";
import SearchIcon from "../../assets/svg/search.svg";
import Notification from "../../assets/svg/notification.svg";
import CardAdd from "../../assets/svg/newaddCard.svg";
import Profile from "../../assets/images/profile.png";
import BackArrow from "../../assets/svg/backArrow.svg";
// import Login from '../auth/Login'
import CardHolderList from "../Cardholder/CardHolderList";
import AdminAccountDetails from "../Admin/AdminAccountDetails";
import AdminCards from "../Admin/AdminCards";
import AdminAddCard from "../Admin/AdminAddCard";
import CreateAccount from "../Cardholder/CreateAccount";
import SingleCardHolderDetail from "../Cardholder/SingleCardHolderDetail";
import SingleCardHolderCardsList from "../Cardholder/SingleCardHolderCardsList";
import TransactionHistory from "../Transactions/TransactionHistory";
import Payments from "../Payments/Payments";
import SinglePaymentRequestDetails from "../Payments/SinglePaymentRequestDetails";
import SinglePaymentPaidDetails from "../Payments/SinglePaymentPaidDetails";
import Commission from "../Commission/Commission";
import CommissionPaidHistory from "../Commission/CommissionPaidHistory";
import CommissionUnpaidHistory from "../Commission/CommissionUnpaidHistory";
import CardHolderAddCard from "../Cardholder/CardHolderAddCard";
import SingleUserCommissionDetails from "../Commission/SingleUserCommissionDetails";
import { baseurl } from "../../api/baseurl";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import previewImage1 from "../../assets/svg/Previewimage.svg";
import AdminWallet from "../Admin/AdminWallet";
import SingleCardDetails from "../Cardholder/SingleCardDetails";
import CardHolderEditCard from "../Cardholder/CardHolderEditCard";
import CardList from "../Cards/CardList";
import CardDetails from "../Cards/CardDetails";
import EditCardDetails from "../Cards/EditCardDetails";
import AdminCardDetails from "../Admin/AdminCardDetails";
import AdminEditCard from "../Admin/AdminEditCard";

function SideBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [details, setDetails] = useState({});
  const [navbarOpen, setNavbarOpen] = useState(false);
  const header = {
    Authorization: `Bearer ${token}`,
  };

  const getCardDetails = async () => {
    try {
      const response = await axios.get(`${baseurl}/api/user/user-profile`, {
        headers: header,
      });
      setDetails(response.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("./");
    }, 200);
  };

  useEffect(() => {
    getCardDetails();
  }, []);

  const logout = () => {
    navigate("./");
    localStorage.clear();
  };

  const [tab, setTab] = useState("Dashboard");

  return (
    <div className="main flex min-h-screen bg-white">
      {/* <!-- Left Panel --> */}
      <div
        className={
          "leftPanel max-w-[230px] w-full bg-lightWhite border-[#CBD5E1] lg:translate-x-0 border-r-2 fixed left-0 inset-y-0 lg:relative z-30 anim " +
          (navbarOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex flex-col min-h-full relative">
          <button
            className="absolute top-3 right-3 lg:hidden"
            onClick={() => setNavbarOpen((prev) => !prev)}
          >
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g id="Close">
                  <rect
                    id="Rectangle"
                    fillRule="nonzero"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  ></rect>
                  <line
                    x1="16.9999"
                    y1="7"
                    x2="7.00001"
                    y2="16.9999"
                    id="Path"
                    stroke="#0C0310"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></line>
                  <line
                    x1="7.00006"
                    y1="7"
                    x2="17"
                    y2="16.9999"
                    id="Path"
                    stroke="#0C0310"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></line>
                </g>
              </g>
            </svg>
          </button>
          <div className="mx-auto p-[64px]">
            <img src={Logo} alt="logo images" />
          </div>
          <nav className="SideNav px-[24px]">
            <NavLink
              to="../dashboard"
              activeclassname="active"
              onClick={() => setTab("Dashboard")}
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray "
            >
              <img src={DashboardIcon} alt="DashboardIcon" />
              <span className="text-sm font-bold leading-5  pl-[13px]">
                Dashboard
              </span>
            </NavLink>
            <NavLink
              to="../cardholder"
              activeclassname="active"
              onClick={() => setTab("Cardholder")}
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray"
            >
              <img src={CardHolderIcon} alt="DashboardIcon" />
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Cards Holder
              </span>
            </NavLink>
            <NavLink
              to="../cards"
              activeclassname="active"
              onClick={() => setTab("All Cards")}
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray"
            >
              <img src={CardHolderIcon} alt="DashboardIcon" />
              <span className="text-sm font-bold leading-5 pl-[13px]">
                All Cards
              </span>
            </NavLink>
            <NavLink
              to="../payment"
              activeclassname="active"
              onClick={() => setTab("Payment")}
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray"
            >
              <img src={PaymentIcon} alt="DashboardIcon" />
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Payments
              </span>
            </NavLink>
            <NavLink
              to="../transaction"
              activeclassname="active"
              onClick={() => setTab("Transaction")}
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray"
            >
              <img src={TransactIons} alt="DashboardIcon" />
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Transactions
              </span>
            </NavLink>
            <NavLink
              to="../commission"
              activeclassname="active"
              onClick={() => setTab("Profit")}
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray"
            >
              <img src={CommissionIcon} alt="DashboardIcon" />
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Profit
              </span>
            </NavLink>
          </nav>
          <div className="mt-auto px-[24px] mb-[80px]">
            <NavLink
              to="../dashboard"
              className="SideLink flex items-center rounded-lg px-[18px] py-3.5 text-lightGray"
            >
              <img src={HelpIcon} alt="DashboardIcon" />
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Help
              </span>
            </NavLink>
            <button
              onClick={() => logout()}
              className="SideLink w-full flex items-center rounded-lg px-[18px] py-3.5 text-lightGray"
            >
              <img src={LogoutIcon} alt="DashboardIcon" />
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Right Panel  */}
      <div className="w-full lg:max-w-[calc(100%-230px)] h-screen">
        {/* <!-- Top Header --> */}
        <div className="w-full bg-lightWhite p-3 sm:py-6 sm:px-6 xl:px-20 xl:py-7 flex flex-wrap items-center border-[#CBD5E1] border-b-2">
          <div className="w-full flex justify-between items-center ">
            <div className="flex items-center space-x-3">
              <button
                className="lg:hidden"
                onClick={() => setNavbarOpen((prev) => !prev)}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="#000"
                    clipRule="#000"
                    d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"
                    fill="#000000"
                  />
                </svg>
              </button>
              <h2 className="block font-bold leading-[48px] text-[#0F172A]">
                {tab}
              </h2>
            </div>
            <div className="flex items-center space-x-5 sm:space-x-10">
              <button type="button" className="">
                <img src={SearchIcon} alt="Search Icon" />
              </button>
              <div className="relative group">
                <button type="button" className="">
                  <img src={Notification} alt="Notification Icon" />
                </button>
                {/* Notification Box  */}
                <div className="absolute right-0 top-10 w-full min-w-[482px] bg-white rounded-2xl p-6 shadow-shadowbox invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-0 z-40 anim">
                  <h6 className="text-[#1F2937] text-lg font-bold leading-8 border-b-2 border-[#CBD5E1] pb-2">
                    Notifications
                  </h6>
                  <div className="space-y-6 pt-6">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                      <div className="space-x-4">
                        <button
                          type="button"
                          className="text-xs font-semibold text-[#64748B] border-[#64748B] border-2 rounded-lg py-2 px-3"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold bg-darkGreen text-white border-darkGreen border-2 rounded-lg py-2 px-3"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                      <div className="space-x-4">
                        <button
                          type="button"
                          className="text-xs font-semibold text-[#64748B] border-[#64748B] border-2 rounded-lg py-2 px-3"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold bg-darkGreen text-white border-darkGreen border-2 rounded-lg py-2 px-3"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                      <div className="space-x-4">
                        <button
                          type="button"
                          className="text-xs font-semibold text-[#64748B] border-[#64748B] border-2 rounded-lg py-2 px-3"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold bg-darkGreen text-white border-darkGreen border-2 rounded-lg py-2 px-3"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <button type="button" className=""><img src={CardAdd} alt="New ADD Card Icon" /></button> */}
              <button
                type="button"
                className="relative flex items-center bg-azureishWhite rounded-full p-2 sm:py-[6px] sm:px-4 group"
              >
                <div className="relative">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <div className="w-9 h-9 overflow-hidden rounded-full bg-white">
                        <img
                          src={
                            details?.profile_pic && details?.profile_pic !== ""
                              ? details?.profile_pic
                              : previewImage1
                          }
                          alt="Profile Avatar"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <span className="hidden sm:block text-left max-w-[120px] min-w-[120px] w-full text-sm font-bold leading-5 text-[#1E293B] ml-3 truncate">
                        {details?.first_name + " " + details?.last_name}
                      </span>
                    </div>
                    <img
                      src={BackArrow}
                      alt="Back Arrow Icon"
                      className="hidden sm:inline-block pl-2"
                    />
                  </div>
                </div>
                {/* Profile Details Box   */}
                <div className="absolute w-full top-[54px] right-0 bg-white rounded-2xl shadow-shadowbox max-w-[218px] min-w-[218px] invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 z-40 anim">
                  <div className="">
                    <span
                      onClick={() => navigate("../adminaccountdetails")}
                      className="w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2 pt-4"
                    >
                      Account Details
                    </span>
                    {/* <span onClick={() => navigate('dashboard/admincards')} className='w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2'>Cards</span> */}
                    <span
                      onClick={() => navigate("adminwallet")}
                      className="w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2"
                    >
                      My wallet
                    </span>
                    {/* <span className='w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2'>Bank Accounts</span> */}
                    <span
                      onClick={() => navigate("transaction")}
                      className="w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2 pb-4"
                    >
                      Transactions
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Content In --> */}
        <div className="rightInContent">
          <Routes>
            <Route path="adminaccountdetails" element={<AdminAccountDetails />} />
            <Route path="adminwallet" element={<AdminWallet />} />
            <Route path="adminaddcard" element={<AdminAddCard />} />
            <Route path="admincards" element={<AdminCards />} />
            <Route path="admincarddetails" element={<AdminCardDetails />} />
            <Route path="admineditcard" element={<AdminEditCard />} />
            <Route path="dashboard">
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="cards">
              <Route index element={<CardList />} />
              <Route path="carddetails" element={<CardDetails />} />
              <Route path="editcarddetails" element={<EditCardDetails />} />
            </Route>
            <Route path="cardholder">
              <Route index element={<CardHolderList />} />
              <Route path="createaccount" element={<CreateAccount />} />
              <Route path="singlecardholderdetail" element={<SingleCardHolderDetail />} />
              <Route path="singlecardholdercardlist" element={<SingleCardHolderCardsList />} />
              <Route path="singlecarddetails" element={<SingleCardDetails />} />
              <Route path="addcardholdercard" element={<CardHolderAddCard />} />
              <Route path="editcardholdercard" element={<CardHolderEditCard />} />
            </Route>
            <Route path="transaction">
              <Route index element={<TransactionHistory />} />
            </Route>
            <Route path="payment">
              <Route index element={<Payments />} />
              <Route path="singlepaymentrequestdetails" element={<SinglePaymentRequestDetails />} />
              <Route path="singlepaymentpaiddetails" element={<SinglePaymentPaidDetails />} />
            </Route>
            <Route path="commission">
              <Route index element={<Commission />} />
              <Route path="commissionpaidhistory" element={<CommissionPaidHistory />} />
              <Route path="commissionunpaidhistory" element={<CommissionUnpaidHistory />} />
              <Route path="singleusercommissiondetails" element={<SingleUserCommissionDetails />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
