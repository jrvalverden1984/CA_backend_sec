import express from 'express';
import {
  createUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
  getPaginatedUserHandler
} from '../Controllers/user.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: CRUD of Users
 */

router.post('/', createUserHandler);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
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

router.get('/:id', getUserByIdHandler);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get User by ID
 *     tags: [Users]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSuccess'
 *       404:
 *         description: User not found
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

router.put('/:id', updateUserHandler);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *              $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
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

router.delete('/:id', deleteUserHandler);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters: [{ in: path, name: id, schema: { type: integer }, required: true }]
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
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

router.get('/', getPaginatedUserHandler);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: List users paginated
 *     tags: [Users]
 *     parameters:
 *       - { in: query, name: page,  schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200:
 *         description: Users list successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserSuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default router;
