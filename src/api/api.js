/**
 * api接口统一管理
 */
import {get, post, del} from './axios';
import axios from "axios";

/**
 *
 * @param {string} params
 * 我们定义了一个topics方法
 * 这个方法有一个参数params
 * params是我们请求接口时携带的参数对象
 * 而后调用了我们封装的post方法
 * post方法的第一个参数是我们的接口地址
 * 第二个参数是topics的params参数
 * 即请求接口时携带的参数对象
 * 最后通过export导出topics。
 */
//图片主机地址
// export const IMG_URL = axios.defaults.baseURL + '/img';
export const IMG_URL = '/api/img';

const INDEX_URl = '/api/index' //首页前缀

// const CATEGORIES_URL = '/api' //商品分类前缀
const CATEGORIES_URL = '/api/goodscategory' //商品分类前缀

const USER_URL = '/api' //用户有关前缀，需要token

const USER_RECHARGE_URL = '/api/recharge' //用户充值

const USER_ADDRESS_URL = '/api/address' //用户地址

const PRODUCT_URL = '/api' // 商品控制

const USER_COLLECT_URL = '/api/collect' // 用户收藏

const USER_CART_URL = '/api/cart' // 用户购物车

const USER_ORDER_URL = '/api/order' // 用户订单

const USER_REGISTER = '/api/student/register'
// 注册
export const register = params => post(USER_REGISTER, params);

//发送验证码
export const registerCode = params => post(USER_REGISTER + '/verify', params)

// 登录
// export const login = params => post('/api/login', params);
// export const login = params => post('/api/student/login', params);
export const login = params => post('/api/login', params);

//退出登录
export const loginOut = params => post('/api/student/logout', params);

//
export const UpPassword = params => post('/api/student/password', params);

// 首页轮播
export const getBanner = params => get(INDEX_URl + '/banner', params);

//首页菜单
export const getMenus = params => get(INDEX_URl + '/menus', params);

//首页推荐
// export const getBoutiqueList = params => get(INDEX_URl + '/boutiqueList', params);
export const getFindByHot = params => get('/api/index/findByHot', params);

//首页猜你喜欢
// export const getLike = params => get(INDEX_URl + '/like', params);
//首页最新发布
export const getFindByNew = params => get('/api/index/findByNew', params);

//获取搜索页热门搜索关键字
// export const getKeyword = params => get('/api/search/keyword', params);
export const getKeyword = params => get('/api/goods/page', params);

//获取商品分类
// export const getCategory = params => get(CATEGORIES_URL + '/category', params);
export const getCategory = params => get(CATEGORIES_URL, params);

//获取商品列表
// export const getGoodsList = params => get(PRODUCT_URL + '/products', params);
// export const getGoodsList = params => get(PRODUCT_URL + '/findByCategoryTwo/'+ params.sid, params);
// export const getGoodsList = params => get(PRODUCT_URL + `/findByCategoryTwo/${params.ids}`, params);
export const getGoodsList = params => get(PRODUCT_URL + '/findByCategoryTwo', params);

//获取闲置物品留言
// export const getGoodsComment = params => get(PRODUCT_URL + '/reply/list/' + params.id, params.way);
export const getGoodsComment = params => get(PRODUCT_URL + '/comment/details/' + params.id, params.way);

//回复闲置物品留言
export const savaComment = params => get(PRODUCT_URL + '/comment/', params);

//获取单个闲置物品详情
// export const getGoodsDetail = params => get(PRODUCT_URL + '/product/detail/' + params.id, null);
export const getGoodsDetail = params => get(`/api/goods/details/${params.id}` , null);

//发布闲置
export const releaseGoods = params => post('/api/release/addGoods', params);

//闲置图片上传
export const upGoodsPhoto = params => post('/api/release/changePic', params);

//
// export const getOrderList = params => get(USER_ORDER_URL + '/list', params);






//获取联系人列表
export const getAddress = params => get(USER_ADDRESS_URL + '/list', params);

//新增或修改联系人列表
export const postEdit = params => post(USER_ADDRESS_URL + '/edit', params);

//删除联系人列表
export const postDelEdit = params => post(USER_ADDRESS_URL + '/del', params);

//获取城市列表
export const getCityList = params => get(USER_ADDRESS_URL + '/city_list', params);

//获取单个联系人
export const getAddressOne = params => get(USER_ADDRESS_URL + '/detail', params);
//获取商品评论统计
export const getGoodsCommentCount = params => get(PRODUCT_URL + '/reply/config/' + params.id, null);
//收藏商品
export const postCollectAdd = params => post(USER_COLLECT_URL + '/add', params);

//取消收藏商品
export const postCollectDel = params => post(USER_COLLECT_URL + '/del', params);//给商品详情页使用

//批量取消收藏商品,清除足迹
export const postCollectDels = params => post(USER_COLLECT_URL + `/dels/${params.ids}`, params);

//获取用户收藏商品
export const getCollectAll = params => get(USER_COLLECT_URL + '/user', params);

//用户添加商品到购物车
export const postCartAdd = params => post(USER_CART_URL + '/add', params);

//获取用户购物车
export const getCartList = params => get(USER_CART_URL + '/list', params);

//删除用户购物车商品
export const postCartDelList = params => post(USER_CART_URL + '/del', params);

//修改购物车商品数量
export const postUpCartNum = params => post(USER_CART_URL + '/num', params);

//确认订单
export const postOrderConfirm = params => post(USER_ORDER_URL + '/confirm', params);

//取消订单
export const postOrderCancel = params => post(USER_ORDER_URL + '/cancel', params);

//删除订单
export const postOrderDel = params => post(USER_ORDER_URL + '/del', params);

//支付订单
export const postOrderPay = params => post(USER_ORDER_URL + '/pay', params);

//提交订单，并支付
export const postOrderCreate = params => post(USER_ORDER_URL + `/create//${params.key}`, params);

//计算订单总价
export const postOrderComputed = params => post(USER_ORDER_URL + `/computed/${params.key}`, params);

//获取订单列表
export const getOrderList = params => get(USER_ORDER_URL + '/list', params);

//获取订单详情
export const getOrderDetail = params => get(USER_ORDER_URL + `/detail/${params.key}`, null);

//获取用户信息
export const getUserInfo = params => get(USER_URL + '/userInfo', params);

//获取用户钱包
export const getBalance = params => get(USER_URL + '/user/balance', params);

//获取充值方案
export const getRechargeIndex = params => get(USER_RECHARGE_URL + '/index', params);

//模拟充值
export const postRechargeTest = params => post(USER_RECHARGE_URL + '/test', params);
