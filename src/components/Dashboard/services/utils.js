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

export function calcUnpaidProfitAmt(paymentData) {
    let totalUnpaidProfit = 0
    paymentData.map(record => {
        if (!record.payment_received) {
            totalUnpaidProfit += record.profit_amount
        }
    })

    return totalUnpaidProfit
}

export function calcPaidProfitAmt(paymentData) {
    let totalUnpaidProfit = 0
    paymentData.map(record => {
        if (record.payment_received) {
            totalUnpaidProfit += record.profit_amount
        }
    })

    return totalUnpaidProfit
}


