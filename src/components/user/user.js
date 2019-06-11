import React, { Component } from 'react'
import './user.scss'
import { Link } from 'react-router-dom'

import HeadTop from '../../common/header/headTop'
import FootGuide from '../../common/footer/footGuide'

class User extends Component {
	constructor(props){
        super(props)
        this.state = {
        	headTitle: '我的'
        }
	}
	render(){
		return (
			<div>
		        <HeadTop headTitle={this.state.headTitle}></HeadTop>
		        <div className="user">
		            <Link className="header" to={{ pathname: '/login' }}>
		                <div className="user-icon"></div>
		                <span>登录/注册</span>
		            </Link>
		            <div className="user-info">
		                <Link className="user-order" to={{ pathname: '' }}>
		                    <span className="user-order-left">我的订单</span>
		                    <div className="user-order-right">
		                        <span>全部订单</span>
		                        <i className="icon-go"></i>
		                    </div>
		                </Link>
		                <ul className="user-operation">
		                    <Link to={{ pathname: '' }} className="link-li" >
		                        <span className="wait-pay-icon"></span>
		                        <p>待付款</p>
		                    </Link>
		                    <Link to={{ pathname: '' }} className="link-li" >
		                        <span className="wait-comment-icon"></span>
		                        <p>待评价</p>
		                    </Link>
		                    <Link to={{ pathname: '' }} className="link-li" >
		                        <span className="refund-icon"></span>
		                        <p>退款</p>
		                    </Link>
		                </ul>
		                <ul className="user-activity">
		                    <Link to={{ pathname: '' }} className="link-li" >
		                        <span>会员福利</span><i className="icon-go"></i>
		                    </Link>
		                    <Link to={{ pathname: '' }} className="link-li" >
		                        <span>我的优惠</span><i className="icon-go"></i>
		                    </Link>
		                    <Link to={{ pathname: '' }} className="link-li" >
		                        <span>服务中心</span><i className="icon-go"></i>
		                    </Link>
		                    <Link to={{ pathname: '' }} className="link-li" >
		                        <span>电商之家</span><i className="icon-go"></i>
		                    </Link>
		                    <Link to={{ pathname: '' }} className="link-li" >
		                        <span>F码通道</span><i className="icon-go"></i>
		                    </Link>
		                    <Link to={{ pathname: '' }} className="link-li" >
		                        <span>设置</span><i className="icon-go"></i>
		                    </Link>
		                </ul>
		            </div>
		        </div>
		        <FootGuide></FootGuide>
		    </div>
		)
	}
}

export default User