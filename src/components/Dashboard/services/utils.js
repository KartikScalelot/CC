import moment from "moment/moment"

export function calculateTotalDue(paymentData) {
    let totalDue = 0
    paymentData.map(record => {
        if (!record.payment_status && (record.payment_method === "Deposit" || record.payment_method === "Cycle")) {
            let totalPaid = 0
            record.paid_amount.map(paid => {
                if ((record.payment_method === "Cycle" && paid.payment_method_flag === "Cycle Deposit") || record.payment_method === "Deposit") {
                    totalPaid += paid.paid_amount
                }
            })
            totalDue += (record.due_amount - totalPaid)
        }
    })
    return totalDue
}

export function calculateTotalPaid(paymentData) {
    let totalPaid = 0
    paymentData.map(record => {
        if ((record.payment_method === "Deposit" || record.payment_method === "Cycle")) {
            let total = 0
            record.paid_amount.map(paid => {
                if ((record.payment_method === "Cycle" && paid.payment_method_flag === "Cycle Deposit") || record.payment_method === "Deposit") {
                    total += paid.paid_amount
                }
            })
            totalPaid += total
        }
    })
    return totalPaid
}

export function calculateMonthlyTotalPaid(first, m) {
    let totalPaid = 0;
    let month = new Date(m).getMonth();
    let filtered = first.filter((data) => {
        let fmonth = new Date(moment(data.due_paid_at).format('L')).getMonth();
        return (
            fmonth === month
        )
    });
    filtered.map(record => {
        if ((record.payment_request.payment_method === "Deposit" || record.payment_request.payment_method === "Cycle")) {
            totalPaid += record.paid_amount
        }
    })
    console.log("f : ", filtered, totalPaid);
    return totalPaid
}

export function calculateDailyTotalPaid(first, d) {
    
    let totalPaid = 0;
    let day = new Date(d).getDate();
    let month = new Date(d).getMonth();
    let year = new Date(d).getFullYear();
    let filtered = first.filter((data) => {
        let fDay = new Date(moment(data.due_paid_at).format('L')).getDate();
        let fMonth = new Date(moment(data.due_paid_at).format('L')).getMonth();
        let fYear = new Date(moment(data.due_paid_at).format('L')).getFullYear();
        return (    
            ((fDay === day) && (fMonth === month) && (fYear === year))
        )
    });
    filtered.map(record => {
        if ((record.payment_request.payment_method === "Deposit" || record.payment_request.payment_method === "Cycle")) {
            totalPaid += record.paid_amount
        }
    })
    return totalPaid
}

export function calcUnpaidAmt(paymentData) {
    let totalPaid = 0;
    let totalDue = 0;
    paymentData.map(record => {
        if ((record.payment_method === "Deposit" || (record.payment_method === "Cycle" && record.payment_method_flag === "Cycle Deposit"))) {
            let total = 0
            record.paid_amount.map(paid => (
                total += paid.paid_amount
            ))
            totalPaid += total
            totalDue += record.due_amount;
        }
    })
    let totalUnpaidAmt = totalDue - totalPaid;
    return totalUnpaidAmt;
}

export function calcPaidProfitAmt(paymentData) {
    let totalPaidProfit = 0
    paymentData.map(record => {
        if (record.payment_received) {
            totalPaidProfit += record.profit_amount
        }
    })

    return totalPaidProfit
}
export function calcTotalProfitAmt(paymentData) {
    let totalProfitAmt = 0
    paymentData.map(record => {
        (record.paid_amount).map((r) => (
            totalProfitAmt += r.profit_amount
        ))
    }
    )
    return totalProfitAmt
}

// export function calcMonthlyTotalProfitAmt(first, sDate, eDate) {
//     let totalProfitAmt = 0
//     let startDate = new Date(sDate);
//     let endDate = new Date(eDate);
//     let filtered = first.filter((data) => {
//         let fdate = new Date(moment(data.due_paid_at).format('L'));
//         return (
//             fdate >= startDate && fdate <= endDate
//         )
//     });

//     filtered.map(record => {
//             totalProfitAmt += record.profit_amount
//     }
//     )
//     return totalProfitAmt
// }

export function calcMonthlyTotalProfitAmt(first, m) {
    let totalProfitAmt = 0
    let month = new Date(m).getMonth();
    let filtered = first.filter((data) => {
        let fMonth = new Date(moment(data.due_paid_at).format('L')).getMonth();
        return (
            fMonth === month
        )
    });
    filtered.map(record => {
        totalProfitAmt += record.profit_amount
    }
    )
    return totalProfitAmt
}

export function calcDailyTotalProfitAmt(first, d) {
    let totalProfitAmt = 0
    let day = new Date(d).getDate();
    let month = new Date(d).getMonth();
    let year = new Date(d).getFullYear();
    let filtered = first.filter((data) => {
        let fDay = new Date(moment(data.due_paid_at).format('L')).getDate();
        let fMonth = new Date(moment(data.due_paid_at).format('L')).getMonth();
        let fYear = new Date(moment(data.due_paid_at).format('L')).getFullYear();
        return (
            ((fDay === day) && (fMonth === month) && (fYear === year))
        )
    });
    filtered.map(record => {
        totalProfitAmt += record.profit_amount
    }
    )
    return totalProfitAmt
}

export function calcWithdrawAmt(paymentData) {
    let totalwithdrawAmt = 0;
    paymentData.map(record => {
        if (record.payment_method === "Withdraw") {
            (record.paid_amount).map((r) => (
                totalwithdrawAmt += r.withdraw_amount
            ))
        }
    })

    return totalwithdrawAmt;
}

export function calcTotalCharge(paymentData) {
    let totalcharge = 0;
    paymentData.map(record => (
        totalcharge += record.deposit_charges
    ))

    return totalcharge;
}

export function calcMonthlyTotalCharge(first, m) {
    let totalcharge = 0;
    let month = new Date(m).getMonth();
    let filtered = first.filter((data) => {
        let fMonth = new Date(moment(data.due_paid_at).format('L')).getMonth();
        return (
            fMonth === month
        )
    });
    filtered.map(record => (
        totalcharge += record.deposit_charges
    ))
    return totalcharge;
}

export function calcMonthlyTransaction(first, m) {
    let month = new Date(m).getMonth();
    let filtered = first.filter((data) => {
        let fMonth = new Date(moment(data.due_paid_at).format('L')).getMonth();
        return (
            fMonth === month
        )
    });
        console.log("len : ", filtered.length);
    return filtered.length;
}

export function calcChargePaid(paymentData) {
    let totalchargePaid = 0;
    paymentData.map(record => {
        if (record.payment_received) {
            totalchargePaid += record.deposit_charges
        }
    })

    return totalchargePaid;
}

export function calcMonthlyChargePaid(first, m) {
    let totalchargePaid = 0;
    let month = new Date(m).getMonth();
    let filtered = first.filter((data) => {
        let fMonth = new Date(moment(data.due_paid_at).format('L')).getMonth();
        return (
            fMonth === month
        )
    });
    filtered.map(record => {
        if (record.payment_received) {
            totalchargePaid += record.deposit_charges
        }
    })
    console.log("paid : ", totalchargePaid);
    return totalchargePaid;
}



