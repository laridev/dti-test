export const LOAN_MAX_ALLOWED = 50000;

export const LOAN_REQUEST_RESPONSES = {
    amountGreaterThanMax: {
        status: "declined",
        message: `O valor máximo por operação é de: ${LOAN_MAX_ALLOWED}`
    },
    amountGreaterThamHalfDebt: {
        status: "declined",
        message: "Emprestimo solicitado maior que a metade da sua dívida."
    },
    loanApproved: {
        status: "approved",
        message: "Parabéns! Emprestimo aprovado."
    }
};