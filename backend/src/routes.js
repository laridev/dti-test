
/**
 * @swagger
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       required:
 *         - name
 *         - doc
 *         - currentDebt
 *         - requestedLoan
 *       properties:
 *         name:
 *           type: string
 *           description: The client's name min 3 max 100 chars
 *         doc:
 *           type: object
 *           description: A CPF key OR a CNPJ key, both with valid value
 *         currentDebt:
 *           type: number
 *           description: The client current debt - 0 when not applicable
 *         requestedLoan:
 *           type: number
 *           description: The requested loan amount greater than 0
 *       example:
 *         name: Larissa
 *         doc: { cpf: "01234567890" }
 *         currentDebt: 10000
 *         requestedLoan: 5000
 */

import express from "express";

import { validateRequest } from './middleware.js';
import { loanRequest } from './validations/loan-request.js';
import { loanController } from './controllers/loan';

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: loans
 *   description: The loans managing API
 * /loan/new:
 *   post:
 *     summary: Create a new loan
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Loan'
 *     responses:
 *       200:
 *         description: The loan request was processed and returned a response.
 *       500:
 *         description: Some server error
 *       400:
 *         description: Some request body validation error
 *
 */
routes.post('/loan/new', validateRequest(loanRequest), loanController.loanRequest)

routes.get('/status', (req, res) => res.status(200).send('ok'));

export default routes;