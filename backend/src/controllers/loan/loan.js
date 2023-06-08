import { LOAN_REQUEST_RESPONSES, LOAN_MAX_ALLOWED } from "./loan.const.js";

export const loanRequest = (req, res) => {
    const {
      name,
      doc,
      currentDebt,
      requestedLoan,
    } = req.body;
  
    const loanRequester = { name, doc };
  
    if (requestedLoan > LOAN_MAX_ALLOWED) {
      return res.status(200).send({ ...loanRequester, ...LOAN_REQUEST_RESPONSES.amountGreaterThanMax });
    }
    if (currentDebt > 0 && requestedLoan > currentDebt / 2) {
        return res.status(200).send({... loanRequester, ... LOAN_REQUEST_RESPONSES.amountGreaterThamHalfDebt})
    }
  
    return res.status(200).send({ ...loanRequester, ... LOAN_REQUEST_RESPONSES.loanApproved })
  }