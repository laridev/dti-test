import Joi from 'joi';

import { validateCPF, validateCNPJ } from './helpers.js';

export const loanRequest = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  doc: Joi.object({
    cpf: Joi.string().custom(validateCPF),
    cnpj: Joi.string().custom(validateCNPJ),
  }).xor('cpf', 'cnpj').required(),
  currentDebt: Joi.number().required(),
  requestedLoan: Joi.number().greater(0).required(),
});
