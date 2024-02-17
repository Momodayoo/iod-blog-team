const express = require("express");
const {validationResult} = require('express-validator');
const { userValidator, userUpdateValidator } = require("../validators/userValidator");
const { idParamValidator } = require("../validators");
const router = express.Router();
const userController = require("../controllers/userController");
const multer  = require('multer');
const upload = multer({ dest: process.env.UPLOADS_DIR || 'uploads'});

/**
 * @swagger
 * /api/users:
 *  get:
 *    description: Use to request all users
 *    tags:
 *      - Users
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User not found
 *      '500':
 *        description: Server error
 */
router.get("/", async (req, res, next) => {
  try{
    const data = await userController.getUsers();
    res.send({ result: 200, data: data });
  }
  catch(err){
    next(err);
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    description: Use to request a user by ID
 *    tags:
 *      - Users
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/:id", idParamValidator, async (req, res, next) => {
  try{
    let data;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      data = await userController.getUser(req.params.id);
      if (!data) {
        res.status(404).json({ result: 404, message: "User not found" });
      } else {
        res.send({ result: 200, data: data });
      }
    } else {
      res.status(422).json({result: 422, errors: errors.array()});
    }
  }
  catch(err){
    next(err);
  }
});


/** 
 * @swagger
 * /api/users:
 *  post:
 *    description: Use to create a user
 *    consumes:
 *      - multipart/form-data
 *    tags:
 *      - Users
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *          example: John Doe
 *         email:
 *          type: string
 *          example: john@dudes.com
 *         password:
 *          type: string
 *          example: password
 *         avatar:
 *          type: string
 *          format: binary
 *        required:
 *         - name
 *         - email
 *         - password
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User not found
 *      '422':
 *         description: Validation error
 *      '500':
 *        description: Server error
* */
router.post("/", upload.single('avatar'), userValidator, async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      let user = req.body;
      if (req.file) user.avatar = req.file.filename;
      const data = await userController.createUser(user);
      res.send({ result: 200, data: data });
    } else {
      res.status(422).json({result: 422, errors: errors.array()});
    }
  }
  catch(err){
    // handle duplicate email error
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(422).json({result: 422, errors: err.errors});
    }else{
      next(err);
    }
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    description: Use to update a user by ID
 *    tags:
 *      - Users
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - name
 *         - email
 *         - password
 *        properties:
 *         name:
 *          type: string
 *          example: John Doe
 *         email:
 *          type: string
 *          example: john@dudes.com
 *         password:
 *          type: string
 *          example: password
 *    parameters:
 *     - name: id
 *       in: path
 *       description: ID of user to update
 *       required: true
 *       type: integer
 *       minimum: 1
 *       example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User not found
 *      '400':
 *        description: Invalid JSON
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.put("/:id", userUpdateValidator, async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = await userController.updateUser(req.params.id, req.body);
      if (data[0] === 0) {
        res.status(404).json({ result: 404, message: "User not found" });
      } else {
        res.send({ result: 200, data: data });
      }
    } else {
      res.status(422).json({result: 422, errors: errors.array()});
    }
  }
  catch(err){
    next(err);
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    description: Use to delete a user by ID
 *    tags:
 *      - Users
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to delete
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.delete("/:id", idParamValidator, async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = await userController.deleteUser(req.params.id);
      if (!data) {
        res.status(404).json({ result: 404, message: "User not found" });
      } else {
        res.send({ result: 200, data: data });
      }
    } else {
      res.status(422).json({result: 422, errors: errors.array()});
    }
  }
  catch(err){
    next(err);
  }
});

module.exports = router;
