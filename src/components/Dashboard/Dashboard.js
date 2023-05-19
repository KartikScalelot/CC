import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DemoImage from "../../assets/images/profile.png";
import axios from "axios";
import { baseurl } from "../../api/baseurl";
import { ToastContainer, toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
// CHART
import { Chart } from "primereact/chart";
import { calcPaidProfitAmt, calcUnpaidProfitAmt, calculateTotalDue, calculateTotalPaid } from "./services/utils";

export default function Dashboard() {
  localStorage.removeItem("card_id");
  localStorage.removeItem("user_id");
  localStorage.removeItem("request_id");

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const [chartData1, setChartData1] = useState({});
  const [chartOptions1, setChartOptions1] = useState({});

  const [chartData2, setChartData2] = useState({});
  const [chartOptions2, setChartOptions2] = useState({});

  const [transaction, setTransaction] = useState([]);

  const token = localStorage.getItem("Token");
  const [loading, setLoading] = useState(true);

  const [first, setfirst] = useState([]);
  const [totalDue, setTotalDue] = useState();
  const [totalPaid, setTotalPaid] = useState();
  const [unpaidProfitAmt, setUnpaidProfitAmt] = useState();
  const [paidProfitAmt, setPaidProfitAmt] = useState();
  
  const header = {
    Authorization: `Bearer ${token}`,
  };

  // bar chart
  const getDashboardData = async () => {
    try {
      const response = await axios.get(
        `${baseurl}/api/transaction/profit-unpaidprofit-view?payment_status=True`,
        { headers: header }
      );

      if(response.data.Data){
        setUnpaidProfitAmt(calcUnpaidProfitAmt(response.data.Data))
        setPaidProfitAmt(calcPaidProfitAmt(response.data.Data))
      }
      // console.log("Dashboard Data ", response.data.Data);
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };

  // pai chart

  const getDashboardPaymentData = async () => {
    try {
      const response = await axios.get(
        `${baseurl}/api/transaction/paid-unpaid-withdraw`,
        { headers: header }
      );
      if(response.data.Data){
        console.log("Payment Data ", response.data.Data);
        const paymentData = response.data.Data
        setTotalDue(calculateTotalDue(paymentData))
        setTotalPaid(calculateTotalPaid(paymentData))

        setfirst(response.data.Data);
      }
     
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };

  useEffect(() => {
    getDashboardData();
    getDashboardPaymentData();
  }, []);

  useEffect(() => {
    // getTransactions();
  }, []);

  // chart 1
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Total Paid Amount",
          data: [65, 59, 80, 81, 56, 55, 40, 85.78, 12, 90, 50],
          // fill: false,
          borderColor: documentStyle.getPropertyValue("--dash4"),
          backgroundColor: documentStyle.getPropertyValue("--dash4"),
          // tension: 0.4,
        },
        {
          label: "Total Earning Amount",
          data: [28, 48, 40, 19, 86, 27, 90, 75, 48, 85, 69, 85],
          // fill: false,
          borderColor: documentStyle.getPropertyValue("--dash1"),
          backgroundColor: documentStyle.getPropertyValue("--dash1"),
          // tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  // chart 2
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Paid", "Unpiad", "Withdraw"],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue("--dash1"),
            documentStyle.getPropertyValue("--dash2"),
            documentStyle.getPropertyValue("--dash3"),
          ],
          // hoverBackgroundColor: [
          //   documentStyle.getPropertyValue('--blue-400'),
          //   documentStyle.getPropertyValue('--yellow-400'),
          //   documentStyle.getPropertyValue('--green-400')
          // ]
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData1(data);
    setChartOptions1(options);
  }, []);

  // chart3
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          type: "bar",
          label: "Total Transaction",
          backgroundColor: documentStyle.getPropertyValue("--dash4"),
          data: [50, 25, 12, 48, 90, 76, 42, 95, 72, 55, 68, 120],
        },
        {
          type: "bar",
          label: "Total Charges",
          backgroundColor: documentStyle.getPropertyValue("--dash1"),
          data: [21, 84, 24, 75, 37, 65, 34, 85, 95, 65, 88, 52],
        },
        {
          type: "bar",
          label: "Charges Paid By Customer",
          backgroundColor: documentStyle.getPropertyValue("--dash3"),
          data: [41, 52, 24, 74, 23, 21, 32, 85, 79, 12, 65, 90],
        },
        {
          type: "bar",
          label: "Profit",
          backgroundColor: documentStyle.getPropertyValue("--dash5"),
          data: [58, 25, 85, 65, 79, 25, 38, 99, 76, 45, 19, 85],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData2(data);
    setChartOptions2(options);
  }, []);

  return (
    <div className="wrapper min-h-full relative">
      <div className="relative flex flex-wrap items-center- justify-start mb-[50px] -mx-3">
        <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
          <div className="bg-[#ed4d3714] py-7 px-7 2xl::px-11 rounded-xl h-full">
            <h2 className="text-[#ED4D37] mb-3">₹ {totalDue}</h2>
            <span className="text-[# 64748B] text-base 2xl:text-xl font-semibold">
              Total Due Amount
            </span>
          </div>
        </div>
       
        <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
          <div className="bg-darkGreen bg-opacity-10 py-7 px-7 2xl::px-11 rounded-xl h-full">
            <h2 className="text-yankeesBlue mb-3">₹ {totalPaid}</h2>
            <span className="text-[# 64748B] text-base 2xl:text-xl font-semibold">
              Total Payment Paid
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
          <div className="bg-[#FFF0E0] py-7 px-7 2xl::px-11 rounded-xl h-full">
            <h2 className="text-[#F6A351] mb-3">₹ {unpaidProfitAmt}</h2>
            <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
              Total Unpaid Profit Amount
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
          <div className="bg-darkGreen bg-opacity-10 py-7 px-7 2xl::px-11 rounded-xl h-full">
            <h2 className="text-yankeesBlue mb-3">₹ {paidProfitAmt}</h2>
            <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
              Total Received Profit Amount
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-full space-y-8 lg:space-y-0">
        <div className="w-full lg:w-1/2 max-h-[500px] lg:pr-5">
          <Chart
            className="w-full h-full bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"
            type="bar"
            data={chartData}
            options={chartOptions}
          />
        </div>
        <div className="w-full lg:w-1/2 max-h-[500px] lg:pl-5">
          <Chart
            type="pie"
            className="w-full h-full flex justify-center items-center bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"
            data={chartData1}
            options={chartOptions1}
          />
        </div>
        <div className="w-full h-full pt-5 md:mt-10">
          <Chart
            className="bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"
            type="bar"
            data={chartData2}
            options={chartOptions2}
          />
        </div>
      </div>
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
    </div>
  );
}
