
/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

const CreateUser = function (request, response) {
  response.status(201).send({ message: 'Okay' })
}

module.exports = { CreateUser }
