const express = require('express')
const {handleCreateUser,handleUserGet,handleUserLogin,handleUserGetById} = require('../controllers/user')
const {restrictToLoggedInUserOnly, restrictTo} = require('../middlewares/auth')

const userRouter = express.Router()

/**
 * @openapi
 * /user:
 *   post:
 *     tags:
 *       - user
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       '201':
 *         description: User Successfully Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       '409':
 *         description: Conflict
 *       '400':
 *         description: Bad request
 *                      
 */
userRouter.route('/').post(handleCreateUser)


/**
 * @openapi
 * /user/all:
 *   get:
 *     tags:
 *       - user
 *     description: Get all users
 *     responses:
 *       '200':
 *         description: All users
 */

userRouter.get('/all', handleUserGet)

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     tags:
 *       - userById
 *     summary: Get a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       '404':
 *         description: User not found
 *       '400':
 *         description: Bad request
 */

userRouter.get('/:id', handleUserGetById)

userRouter.post('/login', handleUserLogin)

module.exports = userRouter