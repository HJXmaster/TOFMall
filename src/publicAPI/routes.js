import App from './../App'
import Login from './../components/User/login'
import Register from './../components/User/register'
import LoginBox from './../components/User/comsforUser/loginbox'
import Registerbox from './../components/User/comsforUser/registerbox'
import UpdateUserInfoBox from './../components/Center/comsforCenter/UpdateUserInfoBox'
import GetUserinfobox from './../components/Center/comsforCenter/Getuserinfobox'
import ChangePassword from './../components/Center/comsforCenter/ChangePassword'
import byCategory from './../components/Search/byCategory'
import byType from './../components/Search/byType'
import ItemInfo from './../components/Item/ItemInfo'

import Order from './../components/Order/Order'
import OrderDetail from './../components/Order/OrderDetail'
import ShoppingCart from './../components/ShoppingCart/ShoppingCart'

import Header from './../components/Public/Header/Header'
import UserIndex from './../components/Center/UserIndex'
import account_Management from './../components/Center/comsforCenter/account_Management'
import order_Management from './../components/Center/comsforCenter/order_Management'
import shoppingCart_Management from './../components/ShoppingCart/ShoppingCart'
import OrdersListResult from './../components/Center/comsforCenter/OrdersListResult'

export default [

	{
		path: '/OrdersListResult',
		name: 'OrdersListResult',
		component: OrdersListResult,
	},
	{
		path: '/UserIndex',
		name: 'UserIndex',
		component: UserIndex,
		children:[{
			 path:'',
		},
		{
			 path:'account',
			 component:account_Management
		},
		{
			 path:'order',
			 component:order_Management
		},
		{
			 path:'shoppingCart',
			 component:shoppingCart_Management
		},
		]

	},
	{
		path: '/OrderDetail/:newOrderID',
		name: 'OrderDetail',
		component: OrderDetail,
				 children:[{
						path:'',
				 }]
	},
	{
		path: '/Header',
		name: 'Header',
		component: Header,
	},
	{
		path: '/ShoppingCart',
		name: 'ShoppingCart',
		component: ShoppingCart,
	},
	{
		path: '/Order',
		name: 'Order',
		component: Order,
	},
	{
		path: '/',
		name: 'app',
		component: App,
	},

	{
		path:'/ItemInfo/:newID',
		name: 'ItemInfo',
		component:ItemInfo,
				 children:[{
						path:'',
				 }]
	},
	{
		path:'/byType',
		component:byType,
		meta: {
			keepAlive: true
		},
	},

	{
		path:'/byCategory',
		component:byCategory,
		meta: {
			keepAlive: true
		},
	},

	{
		path: '/login',
		name: 'login',
		component: Login,
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
	},
	{
		path: '/loginbox',
		name: 'loginbox',
		component: LoginBox,
	},
	{
		path: '/registerbox',
		name: 'registerbox',
		component: Registerbox,
	},
	{
		path: '/getUserinfobox',
		name: 'getUserinfobox',
		component: GetUserinfobox,
	},
	{
		path: '/updateuserinfobox',
		name: 'updateuserinfobox',
		component: UpdateUserInfoBox,
	},
	{
		path: '/ChangePassword',
		name: 'ChangePassword',
		component: ChangePassword,
	},
	{//重定向到首页
		path: '*', redirect: '/'
	},
]
