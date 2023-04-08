/**
 * api接口统一管理
 */
import {get, post, del} from './axios';
import axios from "axios";

//图片主机地址
// export const IMG_URL = axios.defaults.baseURL + '/img';
// const CATEGORIES_URL = '/api' //商品分类前缀
// const USER_URL = '/api' //用户有关前缀，需要token
// const USER_RECHARGE_URL = '/api/recharge' //用户充值
// const USER_ADDRESS_URL = '/api/address' //用户地址
// const USER_COLLECT_URL = '/api/collect' // 用户收藏
// const USER_CART_URL = '/api/cart' // 用户购物车
// const USER_ORDER_URL = '/api/order' // 用户订单


// 登录控制
const USER_LOGIN = '/api/login'
const USER_REGISTER = '/api/login/register' //  注册
const USER_SEND_EMAIL_CODE = '/api/login/email' // 发送邮箱验证
//首页前缀
const INDEX_URl = '/api/index'
//闲置分类前缀
const CATEGORIES_URL = '/api/goodscategory'
// 闲置前缀
const GOODS_URL = '/api/goods'
// 留言前缀
const COMMENT_URL = '/api/comment'
// 发布闲置前缀
const RELEASE_URL = '/api/release'
//个人主页前缀
const PERSON_URL = '/api/student'


//图片主机地址
export const IMG_URL = '/api/img'


/**
 * 登录控制
 */
// 登录
export const login = params => post(USER_LOGIN, params);
// 注册
export const register = params => post(USER_REGISTER, params);
//忘记密码
export const forgotPwd = params => post(USER_LOGIN + '/forgotPassword', params);
//发送验证码
export const sendEmailCode = params => get(USER_SEND_EMAIL_CODE + `/${params.email}/${params.type}` , params)



/**
 * 首页控制
 */
// 首页轮播
export const getBanner = params => get(INDEX_URl + '/banner', params);
//首页菜单
export const getMenus = params => get(INDEX_URl + '/menus', params);
//首页推荐
export const getFindByHot = params => get(INDEX_URl + '/findByHot', params);
//首页最新发布
export const getFindByNew = params => get(INDEX_URl + '/findByNew', params);



/**
 * 闲置控制
 */
//获取商品分类
export const getCategory = params => get(CATEGORIES_URL, params);
//搜索、点击分类获取商品列表
export const getGoodsList = params => get(GOODS_URL + '/goodsList', params);
//获取单个闲置物品详情
export const getGoodsDetail = params => get(GOODS_URL + `/details/${params.id}`, params);
//获取闲置物品留言总数
export const getCommentNum = params => get(COMMENT_URL + '/CommentNum/' + params.goodsId);
//获取闲置物品留言
export const getGoodsComment = params => get(COMMENT_URL + '/details/' + params.goodsId);
//留言、回复闲置物品
export const savaComment = params => post(COMMENT_URL , params);
//删除留言
export const delComment = params => del(COMMENT_URL + `/del/${params}`, null);


/**
 * 发布控制
 */
//发布闲置
export const releaseGoods = params => post(RELEASE_URL + '/addGoods', params);
//发布闲置图片上传
export const upGoodsPhoto = params => post(RELEASE_URL + '/changePic', params);







/**
 * 个人主页
 */
//统计审核不通过数量
export const countViolation = params => get(PERSON_URL + `/countViolation/${params.id}`, params);
//统计审核不通过数量
export const countGoods = params => get(PERSON_URL + `/countStuGoods/${params.id}/${params.status}`, params);
//修改个人密码
export const UpPassword = params => post(PERSON_URL + '/password', params);
//修改邮箱
export const changeEmail = params => post(PERSON_URL + '/changeEmail', params);
//获取个人信息
export const getPerson = params => get(PERSON_URL + '/getPerson', params);
//修改个人信息
export const revisePerson = params => post(PERSON_URL + '/revisePerson', params);
//修改个人头像
export const changeStuPic = params => post(PERSON_URL + '/changePic', params);
//获取最新学生个人信息,更新浏览器存储的信息
export const getNewData = params => get(PERSON_URL + `/username/${params}`, params);

/**
 * 对闲置操作
 */
//获取我的闲置
export const getMyGoodsList = params => get(PERSON_URL + '/myGoodsList', params);
//编辑
export const myGoodsEdit = params => post(PERSON_URL + '/myGoodsEdit', params);
//修改
export const myGoodsEditByIsViolation = params => post(PERSON_URL + '/myGoodsEditByIsViolation', params);
//确认售出
export const myGoodsSold = params => get(PERSON_URL + `/myGoodsSold/${params}`, null);
//下架
export const myGoodsDown = params => get(PERSON_URL + `/myGoodsDown/${params}`, null);
//重新上架
export const myGoodsAgainUp = params => get(PERSON_URL + `/myGoodsAgainUp/${params}`, null);
//删除
export const myGoodsDel = params => del(PERSON_URL + `/myGoodsDel/${params}`, null);
//获取闲置分类名称
export const findCategoryName = params => get(CATEGORIES_URL + `/${params}`, null);



//获取联系人列表
// export const getAddress = params => get(USER_ADDRESS_URL + '/list', params);

// //新增或修改联系人列表
// export const postEdit = params => post(USER_ADDRESS_URL + '/edit', params);

// //删除联系人列表
// export const postDelEdit = params => post(USER_ADDRESS_URL + '/del', params);

// //获取城市列表
// export const getCityList = params => get(USER_ADDRESS_URL + '/city_list', params);

// //获取单个联系人
// export const getAddressOne = params => get(USER_ADDRESS_URL + '/detail', params);
// //获取商品评论统计
// export const getGoodsCommentCount = params => get(PRODUCT_URL + '/reply/config/' + params.id, null);
// //收藏商品
// export const postCollectAdd = params => post(USER_COLLECT_URL + '/add', params);

// //取消收藏商品
// export const postCollectDel = params => post(USER_COLLECT_URL + '/del', params);//给商品详情页使用

// //批量取消收藏商品,清除足迹
// export const postCollectDels = params => post(USER_COLLECT_URL + `/dels/${params.ids}`, params);

// //获取用户收藏商品
// export const getCollectAll = params => get(USER_COLLECT_URL + '/user', params);

// //用户添加商品到购物车
// export const postCartAdd = params => post(USER_CART_URL + '/add', params);

// //获取用户购物车
// export const getCartList = params => get(USER_CART_URL + '/list', params);

// //删除用户购物车商品
// export const postCartDelList = params => post(USER_CART_URL + '/del', params);

// //修改购物车商品数量
// export const postUpCartNum = params => post(USER_CART_URL + '/num', params);

// //确认订单
// export const postOrderConfirm = params => post(USER_ORDER_URL + '/confirm', params);

// //取消订单
// export const postOrderCancel = params => post(USER_ORDER_URL + '/cancel', params);

// //删除订单
// export const postOrderDel = params => post(USER_ORDER_URL + '/del', params);

// //支付订单
// export const postOrderPay = params => post(USER_ORDER_URL + '/pay', params);

// //提交订单，并支付
// export const postOrderCreate = params => post(USER_ORDER_URL + `/create//${params.key}`, params);

// //计算订单总价
// export const postOrderComputed = params => post(USER_ORDER_URL + `/computed/${params.key}`, params);

// //获取订单列表
// export const getOrderList = params => get(USER_ORDER_URL + '/list', params);

// //获取订单详情
// export const getOrderDetail = params => get(USER_ORDER_URL + `/detail/${params.key}`, null);

// //获取用户信息
// export const getUserInfo = params => get(USER_URL + '/userInfo', params);

// //获取用户钱包
// export const getBalance = params => get(USER_URL + '/user/balance', params);

// //获取充值方案
// export const getRechargeIndex = params => get(USER_RECHARGE_URL + '/index', params);

// //模拟充值
// export const postRechargeTest = params => post(USER_RECHARGE_URL + '/test', params);
