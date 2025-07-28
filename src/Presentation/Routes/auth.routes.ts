import express from 'express';
import {
  authenticateHandler
} from '../Controllers/auth.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */

router.post('/login', authenticateHandler);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - CompanyID
 *               - Login
 *               - Password
 *             properties:
 *               CompanyID:
 *                 type: integer
 *                 description: Company ID
 *                 example: 1
 *               Login:
 *                 type: string
 *                 description: User login
 *                 example: "usuario@ejemplo.com"
 *               Password:
 *                 type: string
 *                 description: User password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     message:
 *                       type: string
 *                       example: "Autenticación exitosa"
 *                 message:
 *                   type: string
 *                   example: "Success"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Invalid credentials
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

export default router; 