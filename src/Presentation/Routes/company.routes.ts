import { Company } from '../../Domain/Company/Company';
import express from 'express'
import {
  createCompanyHandler,
  getCompanyByIdHandler,
  updateCompanyHandler,
  deleteCompanyHandler,
  getPaginatedCompanyHandler,
  getCompanyByRucHandler
} from '../Controllers/company.controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: CRUD of Company
 */

router.post('/', createCompanyHandler)
/**
 * @swagger
 * /company:
 *   post:
 *     summary: Create a Company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/CompanyRequest'
 *     responses:
 *       201:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/:id', getCompanyByIdHandler)
/**
 * @swagger
 * /company/{id}:
 *   get:
 *     summary: Get Company by ID
 *     tags: [Company]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: Company found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanySuccess'
 *       404:
 *         description: Company not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.put('/:id', updateCompanyHandler)
/**
 * @swagger
 * /company/{id}:
 *   put:
 *     summary: Update company
 *     tags: [Company]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/CompanyRequest'
 *     responses:
 *       200:
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.delete('/:id', deleteCompanyHandler)
/**
 * @swagger
 * /company/{id}:
 *   delete:
 *     summary: Delete company
 *     tags: [Company]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses:
 *       204:
 *         description: Company deleted successfully
 *       404:
 *         description: Company not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/', getPaginatedCompanyHandler)
/**
 * @swagger
 * /company:
 *   get:
 *     summary: List companies paginated
 *     tags: [Company]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: Companies list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CompanySuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/ruc/:ruc', getCompanyByRucHandler)
/**
 * @swagger
 * /company/ruc/{ruc}:
 *   get:
 *     summary: Get Company by RUC
 *     tags: [Company]
 *     parameters: [{ in: path, name: ruc, required: true, schema: { type: string } }]
 *     responses:
 *       200:
 *         description: Company found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanySuccess'
 *       404:
 *         description: Company not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default router
