import React, { useEffect, useState, useLayoutEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DemoImage from "../../assets/images/profile.png";
import axios from "axios";
import { baseurl } from "../../api/baseurl";
import { ToastContainer, toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
// CHART
import { Chart } from "primereact/chart";
import { calcPaidProfitAmt, calcUnpaidAmt, calcWithdrawAmt, calculateTotalDue, calculateTotalPaid, calcTotalProfitAmt, calcTotalCharge, calcChargePaid, calculateMonthlyTotalPaid, calcMonthlyTotalProfitAmt, calcMonthlyTotalCharge, calcMonthlyChargePaid, calcMonthlyTransaction, calculateDailyTotalPaid, calcDailyTotalProfitAmt, calDailyChargePaid, calcDailyTotalCharge, calcDailyTransaction, calcMonthlyWithdrawAmt, calcMonthlyUnpaidAmt } from "./services/utils";

import { Skeleton } from 'primereact/skeleton';

import PieChart from "./PieChart";
import BarChart from "./BarChart";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
//chart type
import * as am5percent from "@amcharts/amcharts5/percent";
import { Dropdown } from 'primereact/dropdown';

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
  const [chartLoading, setChartLoading] = useState(true);

  const [first, setfirst] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [totalDue, setTotalDue] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [unpaidAmt, setUnpaidAmt] = useState(0);
  const [paidProfitAmt, setPaidProfitAmt] = useState(0);
  const [withdrawAmt, setWithdrawAmt] = useState(0);
  const [totalProfitAmt, setTotalProfitAmt] = useState(0);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [totalCharge, setTotalCharge] = useState(0);
  const [totalChargePaid, setTotalChargePaid] = useState(0);
  const [chart1, setChart1] = useState(false);
  const [chart3, setChart3] = useState(false);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dateNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  const months = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
  ];
  const header = {
    Authorization: `Bearer ${token}`,
  };

  const chartID1 = "chartdiv";
  const chartID2 = "pie-two";
  const chartID3 = "pie-one";
  const chartID4 = "pie-t";
  const chartID5 = "pie-tw";
  const chartID6 = "pie";

  // first -- monthly
  useLayoutEffect(() => {
    if (totalTransaction) {

      //var root = am5.Root.new("chartdiv2");
      const rroot = am5.Root.new(chartID1);

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      rroot.setThemes([am5themes_Animated.new(rroot)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
      const chart = rroot.container.children.push(am5xy.XYChart.new(rroot, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: rroot.verticalLayout
      }));

      let legend = chart.children.push(
        am5.Legend.new(rroot, {
          centerX: am5.p50,
          x: am5.p50
        })
      );
      //   paymentData.map(record => {
      //     if ((record.payment_method === "Deposit" || record.payment_method === "Cycle")) {
      //         let total = 0
      //         record.paid_amount.map(paid => {
      //             if ((record.payment_method === "Cycle" && paid.payment_method_flag === "Cycle Deposit") || record.payment_method === "Deposit") {
      //                 total += paid.paid_amount
      //             }
      //         })
      //         totalPaid += total
      //     }
      // })
      let data = [];

      for (let i = 0; i<=11; i++) {
        data.push({
          "month" : monthName[i],
          "totalPaid": calculateMonthlyTotalPaid(first, i),
          "totalEarning": calcMonthlyTotalProfitAmt(first, i),
        })
      }
      // let data = [{
      //   "month": "January",
      //   "totalPaid": calculateMonthlyTotalPaid(first, "01"),
      //   "totalEarning": calcMonthlyTotalProfitAmt(first, "01"),
      // }, {
      //   "month": "February",
      //   "totalPaid": calculateMonthlyTotalPaid(first, "02"),
      //   "totalEarning": calcMonthlyTotalProfitAmt(first, "02"),
      // }, {
      //   "month": "March",
      //   "totalPaid": calculateMonthlyTotalPaid(first, "03"),
      //   "totalEarning": calcMonthlyTotalProfitAmt(first, "03"),
      // }, {
      //   "month": "April",
      //   "totalPaid": calculateMonthlyTotalPaid(first, "04"),
      //   "totalEarning": calcMonthlyTotalProfitAmt(first, "04"),
      // }, {
      //   "month": "May",
      //   "totalPaid": calculateMonthlyTotalPaid(first, "05"),
      //   "totalEarning": calcMonthlyTotalProfitAmt(first, "05"),
      // }, {
      //   "month": "June",
      //   "totalPaid": calculateMonthlyTotalPaid(first, "06"),
      //   "totalEarning": calcMonthlyTotalProfitAmt(first, "06"),
      // }, {
      //   "month": "July",
      //   "totalPaid": calculateMonthlyTotalPaid(first, "07"),
      //   "totalEarning": calcMonthlyTotalProfitAmt(first, "07"),
      // }, {
      //   "month": "August",
      //   "totalPaid": calculateMonthlyTotalPaid(first, "08"),
      //   "totalEarning": calcMonthlyTotalProfitAmt(first, "08"),
      // }, {
      //   "month": "September",
      //   "totalPaid": calculateMonthlyTotalPaid(first, "09"),
      //   "totalEarning": calcMonthlyTotalProfitAmt(first, "09"),
      // }, {
      //   "month": "October",
      //   "totalPaid": calculateMonthlyTotalPaid(first, "10"),
      //   "totalEarning": calcMonthlyTotalProfitAmt(first, "10"),
      // }, {
      //   "month": "November",
      //   "totalPaid": calculateMonthlyTotalPaid(first, "11"),
      //   "totalEarning": calcMonthlyTotalProfitAmt(first, "11"),
      // }, {
      //   "month": "December",
      //   "totalPaid": calculateMonthlyTotalPaid(first, "12"),
      //   "totalEarning": calcMonthlyTotalProfitAmt(first, "12"),
      // },]


      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xRenderer = am5xy.AxisRendererX.new(rroot, {
        cellStartLocation: 0.1,
        cellEndLocation: 0.9
      })

      let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(rroot, {
        categoryField: "month",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(rroot, {})
      }));

      xRenderer.grid.template.setAll({
        location: 1
      })

      xAxis.data.setAll(data);

      let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(rroot, {
        renderer: am5xy.AxisRendererY.new(rroot, {
          strokeOpacity: 0.1
        })
      }));

      chart.get("colors").set("colors", [
        am5.color(0xD2E19E),
        am5.color(0x1D7C4D),
        // am5.color(0x5aaa95),
        // am5.color(0x86a873),
        // am5.color(0xbb9f06)
      ]);
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      function makeSeries(name, fieldName) {
        let series = chart.series.push(am5xy.ColumnSeries.new(rroot, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "month"
        }));

        series.columns.template.setAll({
          tooltipText: "{name}, {categoryX}:{valueY}",
          width: am5.percent(90),
          tooltipY: 0,
          strokeOpacity: 0
        });

        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        series.bullets.push(function () {
          return am5.Bullet.new(rroot, {
            locationY: 0,
            sprite: am5.Label.new(rroot, {
              text: "{valueY}",
              fill: rroot.interfaceColors.get("alternativeText"),
              centerY: 0,
              centerX: am5.p50,
              populateText: true
            })
          });
        });

        legend.data.push(series);
      }

      makeSeries("Total Paid Amount", "totalPaid");
      makeSeries("Total Earning Amount", "totalEarning");


      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
    }

  }, [totalPaid]);
  // -- day - first
  useLayoutEffect(() => {
    console.log("day");
    if (totalTransaction) {

      //var root = am5.Root.new("chartdiv2");
      const rroot = am5.Root.new(chartID4);

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      rroot.setThemes([am5themes_Animated.new(rroot)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
      const chart = rroot.container.children.push(am5xy.XYChart.new(rroot, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: rroot.verticalLayout
      }));

      let legend = chart.children.push(
        am5.Legend.new(rroot, {
          centerX: am5.p50,
          x: am5.p50
        })
      );

      //   paymentData.map(record => {
      //     if ((record.payment_method === "Deposit" || record.payment_method === "Cycle")) {
      //         let total = 0
      //         record.paid_amount.map(paid => {
      //             if ((record.payment_method === "Cycle" && paid.payment_method_flag === "Cycle Deposit") || record.payment_method === "Deposit") {
      //                 total += paid.paid_amount
      //             }
      //         })
      //         totalPaid += total
      //     }
      // })

      let data = [];
      for (let i = 0; i<=30; i++) {
        data.push({
          "day" : dateNumber[i],
          "totalPaid": calculateDailyTotalPaid(first, '05-'+i+'-2023'),
        "totalEarning": calcDailyTotalProfitAmt(first, '05-'+i+'-2023'),
        })
      }

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xRenderer = am5xy.AxisRendererX.new(rroot, {
        cellStartLocation: 0.1,
        cellEndLocation: 0.9
      })

      let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(rroot, {
        categoryField: "day",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(rroot, {})
      }));

      xRenderer.grid.template.setAll({
        location: 1
      })

      xAxis.data.setAll(data);

      let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(rroot, {
        renderer: am5xy.AxisRendererY.new(rroot, {
          strokeOpacity: 0.1
        })
      }));

      chart.get("colors").set("colors", [
        am5.color(0xD2E19E),
        am5.color(0x1D7C4D),
        // am5.color(0x5aaa95),
        // am5.color(0x86a873),
        // am5.color(0xbb9f06)
      ]);
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      function makeSeries(name, fieldName) {
        let series = chart.series.push(am5xy.ColumnSeries.new(rroot, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "day"
        }));

        series.columns.template.setAll({
          tooltipText: "{name}, {categoryX}:{valueY}",
          width: am5.percent(90),
          tooltipY: 0,
          strokeOpacity: 0
        });

        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        series.bullets.push(function () {
          return am5.Bullet.new(rroot, {
            locationY: 0,
            sprite: am5.Label.new(rroot, {
              text: "{valueY}",
              fill: rroot.interfaceColors.get("alternativeText"),
              centerY: 0,
              centerX: am5.p50,
              populateText: true
            })
          });
        });

        legend.data.push(series);
      }

      makeSeries("Total Paid Amount", "totalPaid");
      makeSeries("Total Earning Amount", "totalEarning");


      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
    }

  }, [totalPaid]);
  // pie chart yearly
  useLayoutEffect(() => {


    if (totalPaid) {
      //var root = am5.Root.new("chartdiv2");
      const root = am5.Root.new(chartID2);

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          endAngle: 270
        })
      );


      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
      const series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          endAngle: 270
        })
      );

      series.states.create("hidden", {
        endAngle: -90
      });
      //dataset
      const data = [
        {
          category: "Paid Amount",
          value: totalPaid
        },
        {
          category: "Withdraw Amount",
          value: withdrawAmt
        },
        {
          category: "Unpaid Amount",
          value: unpaidAmt
        },
      ];
      series.get("colors").set("colors", [
        am5.color(0x1D7C4D),
        am5.color(0x077597),
        am5.color(0x097C69),
        // am5.color(0x86a873),
        // am5.color(0xbb9f06)
      ]);
      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
      series.data.setAll(data);

      series.appear(1000, 100);
    } else {
      // console.log("NA");
      // <div className="w-full md:w-6 p-3">
      //   <h1 >Squasssdsdsdsdsdsre</h1>
      //   <div className="flex align-items-end">
      //     <Skeleton size="2rem" className="mr-2"></Skeleton>
      //     <Skeleton size="3rem" className="mr-2"></Skeleton>
      //     <Skeleton size="4rem" className="mr-2"></Skeleton>
      //     <Skeleton size="5rem"></Skeleton>
      //   </div>
      // </div>
    }
  }, [totalPaid]);  

  // pie chart monthly
  useLayoutEffect(() => {


    if (totalPaid) {
      //var root = am5.Root.new("chartdiv2");
      const root = am5.Root.new(chartID5);

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          endAngle: 270
        })
      );


      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
      const series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          endAngle: 270
        })
      );

      series.states.create("hidden", {
        endAngle: -90
      });
      //dataset
      let data = [
        {
          category: "Paid Amount",
          value: calculateMonthlyTotalPaid(first, "06-01-2023")
        },
        {
          category: "Withdraw Amount",
          value: calcMonthlyWithdrawAmt(pieData, "06-01-2023")
        },
        {
          category: "Unpaid Amount",
          value: calcMonthlyUnpaidAmt(pieData, "06-01-2023")
        },
      ];

      series.get("colors").set("colors", [
        am5.color(0x1D7C4D),
        am5.color(0x077597),
        am5.color(0x097C69),
        // am5.color(0x86a873),
        // am5.color(0xbb9f06)
      ]);
      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
      series.data.setAll(data);

      series.appear(1000, 100);
    } else {
      // console.log("NA");
      // <div className="w-full md:w-6 p-3">
      //   <h1 >Squasssdsdsdsdsdsre</h1>
      //   <div className="flex align-items-end">
      //     <Skeleton size="2rem" className="mr-2"></Skeleton>
      //     <Skeleton size="3rem" className="mr-2"></Skeleton>
      //     <Skeleton size="4rem" className="mr-2"></Skeleton>
      //     <Skeleton size="5rem"></Skeleton>
      //   </div>
      // </div>
    }
  }, [totalPaid]);
  // third -- monthly
  useLayoutEffect(() => {
    if (totalTransaction) {
      //var root = am5.Root.new("chartdiv2");
      var lroot = am5.Root.new(chartID3);


      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      lroot.setThemes([
        am5themes_Animated.new(lroot)
      ]);


      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = lroot.container.children.push(am5xy.XYChart.new(lroot, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: lroot.verticalLayout
      }));
      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/

      let data = [];
      for (let i = 0; i<=11; i++) {
        data.push({
          "month" : monthName[i],
          "transaction": calcMonthlyTransaction(first, i),
          "charges": calcMonthlyTotalCharge(first, i),
          "customerCharges": calcMonthlyChargePaid(first, i),
          "profit": calcMonthlyTotalProfitAmt(first, i)
        })
      }

      //   "month": "January",
      //   "transaction": calcMonthlyTransaction(first, "01"),
      //   "charges": calcMonthlyTotalCharge(first, "01"),
      //   "customerCharges": calcMonthlyChargePaid(first, "01"),
      //   "profit": calcMonthlyTotalProfitAmt(first, "01")
      // }, {
      //   "month": "February",
      //   "transaction": calcMonthlyTransaction(first, "02"),
      //   "charges": calcMonthlyTotalCharge(first, "02"),
      //   "customerCharges": calcMonthlyChargePaid(first, "02"),
      //   "profit": calcMonthlyTotalProfitAmt(first, "02")
      // }, {
      //   "month": "March",
      //   "transaction": calcMonthlyTransaction(first, "03"),
      //   "charges": calcMonthlyTotalCharge(first, "03"),
      //   "customerCharges": calcMonthlyChargePaid(first, "03"),
      //   "profit": calcMonthlyTotalProfitAmt(first, "03")
      // }, {
      //   "month": "April",
      //   "transaction": calcMonthlyTransaction(first, "04"),
      //   "charges": calcMonthlyTotalCharge(first, "04"),
      //   "customerCharges": calcMonthlyChargePaid(first, "04"),
      //   "profit": calcMonthlyTotalProfitAmt(first, "04")
      // }, {
      //   "month": "May",
      //   "transaction": calcMonthlyTransaction(first, "05"),
      //   "charges": calcMonthlyTotalCharge(first, "05"),
      //   "customerCharges": calcMonthlyChargePaid(first, "05"),
      //   "profit": calcMonthlyTotalProfitAmt(first, "05")
      // }, {
      //   "month": "June",
      //   "transaction": calcMonthlyTransaction(first, "06"),
      //   "charges": calcMonthlyTotalCharge(first, "06"),
      //   "customerCharges": calcMonthlyChargePaid(first, "06"),
      //   "profit": calcMonthlyTotalProfitAmt(first, "06")
      // }, {
      //   "month": "July",
      //   "transaction": calcMonthlyTransaction(first, "07"),
      //   "charges": calcMonthlyTotalCharge(first, "07"),
      //   "customerCharges": calcMonthlyChargePaid(first, "07"),
      //   "profit": calcMonthlyTotalProfitAmt(first, "07")
      // }, {
      //   "month": "August",
      //   "transaction": calcMonthlyTransaction(first, "08"),
      //   "charges": calcMonthlyTotalCharge(first, "08"),
      //   "customerCharges": calcMonthlyChargePaid(first, "08"),
      //   "profit": calcMonthlyTotalProfitAmt(first, "08")
      // }, {
      //   "month": "September",
      //   "transaction": calcMonthlyTransaction(first, "09"),
      //   "charges": calcMonthlyTotalCharge(first, "09"),
      //   "customerCharges": calcMonthlyChargePaid(first, "09"),
      //   "profit": calcMonthlyTotalProfitAmt(first, "09")
      // }, {
      //   "month": "October",
      //   "transaction": calcMonthlyTransaction(first, "10"),
      //   "charges": calcMonthlyTotalCharge(first, "10"),
      //   "customerCharges": calcMonthlyChargePaid(first, "10"),
      //   "profit": calcMonthlyTotalProfitAmt(first, "10")
      // }, {
      //   "month": "November",
      //   "transaction": calcMonthlyTransaction(first, "11"),
      //   "charges": calcMonthlyTotalCharge(first, "11"),
      //   "customerCharges": calcMonthlyChargePaid(first, "11"),
      //   "profit": calcMonthlyTotalProfitAmt(first, "11")
      // }, {
      //   "month": "December",
      //   "transaction": calcMonthlyTransaction(first, "12"),
      //   "charges": calcMonthlyTotalCharge(first, "12"),
      //   "customerCharges": calcMonthlyChargePaid(first, "12"),
      //   "profit": calcMonthlyTotalProfitAmt(first, "12")
      // },];


      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xRenderer = am5xy.AxisRendererX.new(lroot, {});
      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(lroot, {
        categoryField: "month",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(lroot, {})
      }));

      xRenderer.grid.template.setAll({
        location: 1
      })

      xAxis.data.setAll(data);

      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(lroot, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(lroot, {
          strokeOpacity: 0.1
        })
      }));
      chart.get("colors").set("colors", [
        am5.color(0xD2E19E),
        am5.color(0x1D7C4D),
        am5.color(0x077597),
        am5.color(0x8FB50B),
        // am5.color(0xbb9f06)
      ]);

      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.children.push(am5.Legend.new(lroot, {
        centerX: am5.p50,
        x: am5.p50
      }));


      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      function makeSeries(name, fieldName) {
        var series = chart.series.push(am5xy.ColumnSeries.new(lroot, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "month"
        }));

        series.columns.template.setAll({
          tooltipText: "{name}, {categoryX}: {valueY}",
          tooltipY: am5.percent(10)
        });
        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        series.bullets.push(function () {
          return am5.Bullet.new(lroot, {
            sprite: am5.Label.new(lroot, {
              text: "{valueY}",
              fill: lroot.interfaceColors.get("alternativeText"),
              centerY: am5.p50,
              centerX: am5.p50,
              populateText: true
            })
          });
        });

        legend.data.push(series);
      }

      makeSeries("Total Transaction", "transaction");
      makeSeries("Total Charges", "charges");
      makeSeries("Charges Paid By Customer", "customerCharges");
      makeSeries("Profit", "profit");


      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
    }

  }, [totalPaid]);
  // console.log("day : ", new Date("02-17-2002").getDate());
  //  day - third
  useLayoutEffect(() => {
    if (totalTransaction) {
      //var root = am5.Root.new("chartdiv2");
      var lroot = am5.Root.new(chartID6);


      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      lroot.setThemes([
        am5themes_Animated.new(lroot)
      ]);


      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = lroot.container.children.push(am5xy.XYChart.new(lroot, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: lroot.verticalLayout
      }));
      // console.log("month : ", new Date("11").getMonth());
      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/

      let data = [];

      for (let i = 0; i<=30; i++) {
        data.push({
          "day" : dateNumber[i],
          "transaction": calcDailyTransaction(first, '05-'+i+'-2023'),
        "charges": calcDailyTotalCharge(first, '05-'+i+'-2023'),
        "customerCharges": calDailyChargePaid(first, '05-'+i+'-2023'),
        "profit": calcDailyTotalProfitAmt(first, '05-'+i+'-2023'),
        })
      }
     
      //   "day": "01",
      //   "transaction": calcDailyTransaction(first, "05-01-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-01-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-01-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-01-2023"),
      // }, {
      //   "day": "02",
      //   "transaction": calcDailyTransaction(first, "05-02-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-02-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-02-2023"),
      //   "totalEarning": calcDailyTotalProfitAmt(first, "05-02-2023"),
      // }, {
      //   "day": "03",
      //   "transaction": calcDailyTransaction(first, "05-03-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-03-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-03-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-03-2023"),
      // }, {
      //   "day": "04",
      //   "transaction": calcDailyTransaction(first, "05-04-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-04-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-04-2023"),
      //   "totalEarning": calcDailyTotalProfitAmt(first, "05-04-2023"),
      // }, {
      //   "day": "05",
      //   "transaction": calcDailyTransaction(first, "05-05-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-05-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-05-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-05-2023"),
      // }, {
      //   "day": "06",
      //   "transaction": calcDailyTransaction(first, "05-06-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-06-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-06-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-06-2023"),
      // }, {
      //   "day": "07",
      //   "transaction": calcDailyTransaction(first, "05-07-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-07-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-07-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-07-2023"),
      // }, {
      //   "day": "08",
      //   "transaction": calcDailyTransaction(first, "05-08-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-08-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-08-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-08-2023"),
      // }, {
      //   "day": "09",
      //   "transaction": calcDailyTransaction(first, "05-09-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-09-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-09-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-09-2023"),
      // }, {
      //   "day": "10",
      //   "transaction": calcDailyTransaction(first, "05-10-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-10-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-10-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-10-2023"),
      // }, {
      //   "day": "11",
      //   "transaction": calcDailyTransaction(first, "05-11-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-11-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-11-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-11-2023"),
      // }, {
      //   "day": "12",
      //   "transaction": calcDailyTransaction(first, "05-12-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-12-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-12-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-12-2023"),
      // }, {
      //   "day": "13",
      //   "transaction": calcDailyTransaction(first, "05-13-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-13-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-13-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-13-2023"),
      // }, {
      //   "day": "14",
      //   "transaction": calcDailyTransaction(first, "05-14-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-14-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-14-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-14-2023"),
      // }, {
      //   "day": "15",
      //   "transaction": calcDailyTransaction(first, "05-15-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-15-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-15-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-15-2023"),

      // }, {
      //   "day": "16",
      //   "transaction": calcDailyTransaction(first, "05-16-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-16-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-16-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-16-2023"),
      // }, {
      //   "day": "17",
      //   "transaction": calcDailyTransaction(first, "05-17-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-17-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-17-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-17-2023"),
      // }, {
      //   "day": "18",
      //   "transaction": calcDailyTransaction(first, "05-18-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-18-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-18-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-18-2023"),
      // }, {
      //   "day": "19",
      //   "transaction": calcDailyTransaction(first, "05-19-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-19-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-19-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-19-2023"),
      // }, {
      //   "day": "20",
      //   "transaction": calcDailyTransaction(first, "05-20-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-20-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-20-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-20-2023"),
      // }, {
      //   "day": "21",
      //   "transaction": calcDailyTransaction(first, "05-21-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-21-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-21-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-21-2023"),
      // }, {
      //   "day": "22",
      //   "transaction": calcDailyTransaction(first, "05-22-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-22-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-22-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-22-2023"),
      // }, {
      //   "day": "23",
      //   "transaction": calcDailyTransaction(first, "05-23-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-23-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-23-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-23-2023"),
      // }, {
      //   "day": "24",
      //   "transaction": calcDailyTransaction(first, "05-24-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-24-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-24-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-24-2023"),
      // }, {
      //   "day": "25",
      //   "transaction": calcDailyTransaction(first, "05-25-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-25-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-25-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-25-2023"),
      // }, {
      //   "day": "26",
      //   "transaction": calcDailyTransaction(first, "05-26-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-26-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-26-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-26-2023"),
      // }, {
      //   "day": "27",
      //   "transaction": calcDailyTransaction(first, "05-27-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-27-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-27-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-27-2023"),
      // }, {
      //   "day": "28",
      //   "transaction": calcDailyTransaction(first, "05-28-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-28-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-28-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-28-2023"),
      // }, {
      //   "day": "29",
      //   "transaction": calcDailyTransaction(first, "05-29-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-29-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-29-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-29-2023"),
      // }, {
      //   "day": "30",
      //   "transaction": calcDailyTransaction(first, "05-30-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-30-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-30-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-30-2023"),
      // }, {
      //   "day": "31",
      //   "transaction": calcDailyTransaction(first, "05-31-2023"),
      //   "charges": calcDailyTotalCharge(first, "05-31-2023"),
      //   "customerCharges": calDailyChargePaid(first, "05-31-2023"),
      //   "profit": calcDailyTotalProfitAmt(first, "05-31-2023"),
      // },]


      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xRenderer = am5xy.AxisRendererX.new(lroot, {});
      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(lroot, {
        categoryField: "day",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(lroot, {})
      }));

      xRenderer.grid.template.setAll({
        location: 1
      })

      xAxis.data.setAll(data);

      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(lroot, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(lroot, {
          strokeOpacity: 0.1
        })
      }));
      chart.get("colors").set("colors", [
        am5.color(0xD2E19E),
        am5.color(0x1D7C4D),
        am5.color(0x077597),
        am5.color(0x8FB50B),
        // am5.color(0xbb9f06)
      ]);

      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.children.push(am5.Legend.new(lroot, {
        centerX: am5.p50,
        x: am5.p50
      }));


      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      function makeSeries(name, fieldName) {
        var series = chart.series.push(am5xy.ColumnSeries.new(lroot, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "day"
        }));

        series.columns.template.setAll({
          tooltipText: "{name}, {categoryX}: {valueY}",
          tooltipY: am5.percent(10)
        });
        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        series.bullets.push(function () {
          return am5.Bullet.new(lroot, {
            sprite: am5.Label.new(lroot, {
              text: "{valueY}",
              fill: lroot.interfaceColors.get("alternativeText"),
              centerY: am5.p50,
              centerX: am5.p50,
              populateText: true
            })
          });
        });

        legend.data.push(series);
      }

      makeSeries("Total Transaction", "transaction");
      makeSeries("Total Charges", "charges");
      makeSeries("Charges Paid By Customer", "customerCharges");
      makeSeries("Profit", "profit");


      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
    }

  }, [totalPaid]);

  // bar chart
  const getDashboardData = async () => {
    try {
      const response = await axios.get(
        `${baseurl}/api/transaction/profit-unpaidprofit-view?payment_status=True`,
        { headers: header }
      );

      if (response.data.Data) {
        // setUnpaidAmt(calcUnpaidAmt(response.data.Data))
        setPaidProfitAmt(calcPaidProfitAmt(response.data.Data))
        setTotalTransaction(response.data.Data.length)
        setTotalCharge(calcTotalCharge(response.data.Data))
        setTotalChargePaid(calcChargePaid(response.data.Data))
        setfirst(response.data.Data);
      }
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
      if (response.data.Data) {
        const paymentData = response.data.Data
        setPieData(paymentData);
        setTotalDue(calculateTotalDue(paymentData))
        setTotalPaid(calculateTotalPaid(response.data.Data))

        setWithdrawAmt(calcWithdrawAmt(paymentData))
        setUnpaidAmt(calcUnpaidAmt(paymentData))
        setTotalProfitAmt(calcTotalProfitAmt(paymentData))
      }

    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };

  useEffect(() => {
    getDashboardData();
    getDashboardPaymentData();
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
            <h2 className="text-[#F6A351] mb-3">₹ {unpaidAmt}</h2>
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
      <div className="relative flex items-center justify-between pt-5 md:pt-0 pb-9">
        <div className="card flex">
        <span className="p-float-label">
    <Dropdown inputId="dd-month" value={month} onChange={(e) => setMonth(new Date(e.value).getMonth())} options={months} optionLabel="name" className="w-full md:w-14rem" />
    <label htmlFor="dd-month">Month</label>
</span>
        </div>
        {/* <div className='w-full md:w-1/2 mb-4 md:mb-0'>
          <label htmlFor="year" className="p-float-label">Year</label>
          <input type="text" name="year" className="btn-secondary flex" placeholder='Year' onChange={(e) => setYear(e.target.value)} />
        </div> */}
        <div className="flex items-center space-x-3">
          {/* <Link to='../dashboard/adminaddcard' className="btn-secondary flex">
						<svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
						</svg>
						Add Card
					</Link> */}
        </div>
      </div>
      <div className="flex flex-wrap w-full space-y-8 lg:space-y-0">
        <div className="w-full lg:w-1/2 max-h-[500px] lg:pr-5">
          <div
            className="w-full h-full bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"
          >
            <div id={chartID1} className={`w-full h-[500px] ${month === 0 ? "" : "hidden"}`} ></div>
            <div id={chartID4} className={`w-full h-[500px] ${month === 0 ? "hidden" : ""}`} ></div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 max-h-[500px] lg:pl-5">
          <div
            className="w-full h-full flex justify-center items-center bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"
          >
            <div id={chartID2} className={`w-full h-[500px] ${month === 0 ? "" : "hidden"}`} ></div>
            <div id={chartID5} className={`w-full h-[500px] ${month === 0 ? "hidden" : ""}`} ></div>

          </div>
        </div>
        <div className="w-full h-full pt-5 md:mt-10">
          <div
            className="bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"
          >
            <div id={chartID3} className={`w-full h-[500px] ${month === 0 ? "" : "hidden"}`} ></div>
            <div id={chartID6} className={`w-full h-[500px] ${month === 0 ? "hidden" : ""}`} ></div>

          </div>
        </div>


      </div>
      <div>


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
    </div>

  );
}
