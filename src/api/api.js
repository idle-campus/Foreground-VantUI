/**
 * api接口统一管理
 */
import { get, post, del } from './axios';
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
export const sendEmailCode = params => get(USER_SEND_EMAIL_CODE + `/${params.email}/${params.type}`, params)



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
export const savaComment = params => post(COMMENT_URL, params);
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



