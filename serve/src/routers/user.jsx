/**
 * @swagger
 * /api/addExam:
 *    post:
 *      tags:
 *      - 测试
 *      summary: 提交考试答案
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: name
 *        in: query
 *        description: 姓名
 *        required: false
 *        type: integer
 *        maximum:
 *        minimum: 1
 *        format:
 *      - name: phone
 *        in: query
 *        description: 电话
 *        required: false
 *        type: integer
 *        maximum:
 *        minimum: 1
 *        format:
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */

/**
 * @swagger
 * /api/v1/user/list:
 *    get:
 *      tags:
 *      - 用户
 *      summary: 获取用户
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: page
 *        in: query
 *        description: 第几页
 *        default: "1"
 *        required: false
 *      - name: pageSize
 *        in: query
 *        description: 一页有多少数据
 *        default: "20"
 *        required: false
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */


/**
 * @swagger
 * /api/v1/user/login:
 *    post:
 *      tags:
 *      - 用户
 *      summary: 登录
 *      description:
 *      produces:
 *      - application/json
 *      parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             username:
 *               type: "string"
 *               default: "zhangsan"
 *               description: 用户登录名
 *               required: true
 *             password:
 *               type: "string"
 *               default: "123456"
 *               description: 密码
 *               required: true
 *      responses:
 *        200:
 *          description: successful operation
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */

/**
 * @swagger
 * /api/v1/user/logout:
 *    get:
 *      tags:
 *      - 用户
 *      summary: 登出
 *      description:
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: params
 *        in: query
 *        description: params
 *        default: ""
 *        required: false
 *      responses:
 *        200:
 *          description: successful operation
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */

/**
 * @swagger
 * /api/v1/user/register:
 *    post:
 *      tags:
 *      - 用户
 *      summary: 注册
 *      description:
 *      produces:
 *      - application/json
 *      parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             username:
 *               type: "string"
 *               default: "shangsan"
 *               description: 用户名
  *             chinesename:
 *               type: "string"
 *               default: "shangsan"
 *               description: 中文名
 *             password:
 *               type: "string"
 *               default: "123456"
 *               description: 密码
 *             email:
 *               type: "string"
 *               default: "123@163.com"
 *               description: 邮箱
 *             phone:
 *               type: "string"
 *               default: "123XXXXXXX"
 *               description: 手机号
 *             birth:
 *               type: "string"
 *               default: "2021-10-16"
 *               description: 生日
 *      responses:
 *        200:
 *          description: successful operation
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */


/**
 * @swagger
 * /api/v1/user/rest-password:
 *    put:
 *      tags:
 *      - 用户
 *      summary: 修改密码
 *      description:
 *      produces:
 *      - application/json
 *      parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             id:
 *               type: "string"
 *               default: "1"
 *               description: 用户id
 *             oldpassword:
 *               type: "string"
 *               default: "123"
 *               description: 老密码
 *             newpassword:
 *               type: "string"
 *               default: "123456"
 *               description: 新密码
 *      responses:
 *        200:
 *          description: successful operation
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */



/**
 * @swagger
 * /api/v1/user/info:
 *    put:
 *      tags:
 *      - 用户
 *      summary: 修改用户信息
 *      description: id为必填参数
 *      produces:
 *      - application/json
 *      parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             id:
 *               type: "string"
 *               default: "1"
 *               description: 用户id
 *             username:
 *               type: "string"
 *               default: "shangsan"
 *               description: 用户名
 *             email:
 *               type: "string"
 *               default: "123@163.com"
 *               description: 邮箱
 *             phone:
 *               type: "string"
 *               default: "123XXXXXXX"
 *               description: 手机号
 *             birth:
 *               type: "string"
 *               default: "2021-10-16"
 *               description: 生日
 *      responses:
 *        200:
 *          description: successful operation
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */


/**
 * @swagger
 * /api/v1/user/one:
 *    delete:
 *      tags:
 *      - 用户
 *      summary: 删除用户
 *      description: id为必填参数
 *      produces:
 *      - application/json
 *      parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             id:
 *               type: "string"
 *               default: "1"
 *               description: 用户id
 *      responses:
 *        200:
 *          description: successful operation
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
