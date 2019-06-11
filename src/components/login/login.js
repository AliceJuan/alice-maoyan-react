import React, { Component } from 'react'
import './login.scss'

import HeadTop from '../../common/header/headTop'

class Login extends Component {
	constructor(props){
		super(props)
		this.state = {
			headTitle: '猫眼电影',
            accountLogin: true
		}
	}
	changeLoginType = (type) => {
		var accountLogin = false
        if (type === 'account') {
            accountLogin = true
        }
        this.setState({
        	accountLogin
        })
    }
    loginEvent = () => {
        this.props.history.push('/msite')
    }
	render(){
		return(
			<div className="login">
		        <HeadTop headTitle={this.state.headTitle} goBack="true"></HeadTop>
		        <section className="login-container">
		            <section className="login-type">
		                <div className="login-type-container">
		                    <div onClick={()=>this.changeLoginType('account')} className={this.state.accountLogin ? 'current-login-type': null }>美团账号登录</div>
		                    <div onClick={()=>this.changeLoginType('phone')} className={!this.state.accountLogin ? 'current-login-type': null }>手机验证登录</div>
		                </div>
		            </section>
		            {
		            	this.state.accountLogin && 
		            	<section className="account-login">
			                <input type="text" placeholder="帐户名/手机号/Email" />
			                <input type="passwprd" placeholder="请输入您的密码" />
			            </section>
		            }
		            {
		            	!this.state.accountLogin && 
		            	<section className="phone-login">
			                <input type="text" className="left" placeholder="请输入手机号" />
			                <span className="right">获取验证码</span>
			                <input type="passwprd" placeholder="请输入短信验证码" />
			            </section>
		            }
		            <section className="login-operation">
		                <div className="btn-group clear">
		                    <button onClick={this.loginEvent}>登录</button>
		                    <span className="left">立即注册</span>
		                    <span className="right">找回密码</span>
		                </div>
		                <span>猫眼电影 客服电话：400-670-5335</span>
		            </section>
		        </section>
		    </div>
		)
	}
}

export default Login
