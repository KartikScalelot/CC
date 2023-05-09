import React, { useEffect, useState } from 'react'
import PaymentPaid from './PaymentPaid';
import PaymentRequests from './PaymentRequests';
import Modal from '../../common/Modals/Modal';
import PaymentDetails from '../Admin/Popup/PaymentDetails';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../../api/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import { ProgressSpinner } from 'primereact/progressspinner';
import Withdraw from './Withdraw';

function Payments() {
    const [tab, setTab] = useState(1);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [paymentRequests, setPaymentRequests] = useState([]);
    const [isPayPopUpOpen, setIsPayPopUpOpen] = useState(false);
    const [payerData, setPayerData] = useState({});
    const [reload, setReloade] = useState(false);
    let totalDueAmount = 0;

    const token = localStorage.getItem("Token");
    localStorage.removeItem("card_id");
    localStorage.removeItem("user_id");
    localStorage.removeItem("request_id");
    const header = {
        'Authorization': `Bearer ${token}`,
    }
    const getPaymentRequests = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/paymentRequest/payment-request-list`, { headers: header });
            if (response.data.IsSuccess) {
                // toast.success(response.data.Message);

                setPaymentRequests(response.data.Data);
                setLoading(false);
            } else {
                toast.error("Something went wrong!!");
            }
        } catch (error) {
            toast.error("Something went wrong!!");
            console.log(error);
        }
    }
    paymentRequests.map((amount) => totalDueAmount += amount.due_amount);

    useEffect(() => {
        getPaymentRequests();
    }, [reload]);
    return (
        <>
            {
                loading ?
                    <div className="flex items-center justify-center pt-5">
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                    </div> :
                    <div className="wrapper min-h-full">
                        <div className="relative flex flex-wrap items-center- justify-start mb-3 md:mb-[50px]">
                            <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                                <div className="bg-[#e52b2b14] py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                                    <h2 className="text-[#E52B2B] mb-3">₹ {totalDueAmount}</h2>
                                    <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                                        Total Due Amount
                                    </span>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                                <div className="bg-white py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                                    <h2 className="text-[#E52B2B] mb-3">₹ 0</h2>
                                    <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                                        Total Payment Paid
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="relative md:flex items-center justify-between mb-10">
                            {/* <h3 className="text-yankeesBlue leading-8 space-x-3">
                                <button className={"cursor-pointer pr-3 " + (tab === 1 ? "active" : "text-lightGray")} data-tab="PaymentRequests" onClick={() => setTab(1)}>Due Requests</button>|
                                <button className={"cursor-pointer pr-3 " + (tab === 2 ? "active" : "text-lightGray")} data-tab="PaymentPaid" onClick={() => setTab(2)}>Payment Paid</button>|
                                <button className={"cursor-pointer " + (tab === 3 ? "active" : "text-lightGray")} data-tab="Withdraw" onClick={() => setTab(3)}>Withdraw</button>
                            </h3> */}
                            <div className="flex w-full border-b-2 border-b-[#D7DFE9]">
                                <div className="ml-0 xsm:ml-8 md:ml-14 space-x-1">
                                    <button type="button" className={"inline-block font-extrabold text-sm sm:text-base px-3 sm:px-8 py-2 " + (tab === 1 ? "text-yankeesBlue  border-[#D7DFE9] rounded-tr-xl rounded-tl-xl translate-y-[2px] border-2 border-b-white" : "text-lightGray translate-y-[2px] border-transparent border-2")} data-tab="Deposit" onClick={() => setTab(1)}>Deposit Requests</button>
                                    <button type="button" className={"inline-block font-extrabold text-sm sm:text-base px-3 sm:px-8 py-2 " + (tab === 3 ? "text-yankeesBlue  border-[#D7DFE9] rounded-tr-xl rounded-tl-xl translate-y-[2px]  border-2 border-b-white" : "text-lightGray translate-y-[2px] border-transparent border-2")} data-tab="Withdraw" onClick={() => setTab(3)}>Withdraw Requests</button>
                                    <button type="button" className={"inline-block font-extrabold text-sm sm:text-base px-3 sm:px-8 py-2 " + (tab === 2 ? "text-yankeesBlue  border-[#D7DFE9] rounded-tr-xl rounded-tl-xl translate-y-[2px]  border-2 border-b-white" : "text-lightGray translate-y-[2px] border-transparent border-2")} data-tab="Cycle" onClick={() => setTab(2)}>Cycle Requests</button>
                                </div>
                            </div>
                            {/* <div>
                                <div className="flex w-32 ml-auto items-center rounded-lg border-2 border-lightGray cursor-pointer px-5 py-2.5 mt-3 md:mt-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 4.25C5.58579 4.25 5.25 4.58578 5.25 5C5.25 5.41421 5.58579 5.75 6 5.75L14 5.75C14.4142 5.75 14.75 5.41421 14.75 5C14.75 4.58579 14.4142 4.25 14 4.25L6 4.25Z" fill="#94A3B8" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.47246 0.25C2.16114 0.25 0.25 2.07558 0.25 4.37307C0.25 5.53648 0.752889 6.64108 1.62728 7.41966L4.87987 10.3159C5.75613 11.0961 6.25 12.1925 6.25 13.336V17.5134C6.25 19.3745 8.38547 20.367 9.85896 19.3261L11.8002 17.9547C12.7061 17.3147 13.25 16.2855 13.25 15.1817V13.4521C13.25 12.2522 13.7936 11.107 14.7465 10.3238L18.2668 7.43032C19.2037 6.66027 19.75 5.52281 19.75 4.318C19.75 2.05092 17.8642 0.25 15.5842 0.25H4.47246ZM1.75 4.37307C1.75 2.94477 2.94821 1.75 4.47246 1.75H15.5842C17.0772 1.75 18.25 2.92011 18.25 4.318C18.25 5.06517 17.9116 5.78069 17.3144 6.27151L13.7941 9.165C12.5015 10.2274 11.75 11.7946 11.75 13.4521V15.1817C11.75 15.7872 11.4519 16.3642 10.9347 16.7295L8.99346 18.101C8.44746 18.4867 7.75 18.0779 7.75 17.5134V13.336C7.75 11.7567 7.0674 10.2552 5.87738 9.19561L2.62479 6.29941C2.06416 5.80021 1.75 5.10064 1.75 4.37307Z" fill="#94A3B8" />
                                    </svg>
                                    <span className="text-base font-extrabold text-lightGray pl-3">Filter</span>
                                </div>
                            </div> */}
                        </div>
                        {tab === 1 && <PaymentRequests paymentRequestData={paymentRequests} setReloade={setReloade}/>}
                        {tab === 2 && <PaymentPaid paymentPaidData={paymentRequests} setReloade={setReloade}/>}
                        {tab === 3 && <Withdraw WithdrawData={paymentRequests} setReloade={setReloade}/>}
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                    </div >
            }
        </>

    )
}

export default Payments