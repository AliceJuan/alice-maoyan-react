import React, { Component } from 'react'
import { fromJS, is } from 'immutable'
import './orderConfirm.scss'
import API from '../../api/api'

import HeadTop from '../../common/header/headTop'
import VideoSnack from '../../common/videoSnack/videoSnack'

class OrderConfirm extends Component {
	constructor(props){
		super(props)
		this.state={
			dealList: []
		}
	}
	initData = async() =>{
		let cinemaInfo = await API.getCinemaDetailsData({'cinemaId': this.cinemaId})
		this.setState({
			dealList: cinemaInfo.dealList.dealList
		})
	}
	componentDidMount(){
		this.initData()
	}
	shouldComponentUpdate(nextProps, nextState){
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
	immediatePay = () => {
        this.props.history.push('/orderConfirm/payment')
    }
	render(){
		let {film,cinema,video,seat} = this.props
		let totalPrice = 0
        seat.forEach((item) => { totalPrice += item.price - 0 })
		let seatList = seat.map(item => item.place).join(' ')
		return (
			<div>
		        <section>
		            <HeadTop headTitle="确认订单" goBack="true"></HeadTop>
		            <section className="box-container order">
		                <div className="order-info">
		                    <div className="movie-info">
		                        <span className="movie-name">{ film.filmName }</span><span>{ seat.length + '张' }</span>
		                        <p>{ video.day + ' ' + video.startTime + '~' + video.endTime + ' ' +  video.videoType }</p>
		                        <p>{ cinema.cinemaName }</p>
		                        <p>{ video.videoHall } { seatList }</p>
		                    </div>
		                    <ul className="cinema-activity">
		                        <li>
		                            <span>特惠活动</span>
		                            <span>暂无</span>
		                        </li>
		                        <li>
		                            <span>电影优惠卷</span>
		                            <span>无优惠卷 <i></i></span>
		                        </li>
		                        <li>
		                            <span>兑换卷</span>
		                            <span>无兑换卷 <i></i></span>
		                        </li>
		                        <li>
		                            <span>票价总计</span>
		                            <span className="total-price">{ totalPrice.toFixed(2) + '元' }</span>
		                        </li>
		                    </ul>
		                </div>
		                <p className="divide-line"></p>
		                <VideoSnack dealList={this.state.dealList}></VideoSnack>
		                <div className="order-footer">
		                    <div className="price-info">
		                        <span>退改签须知</span>
		                        <span className="price">应付 <i className="big">{ totalPrice.toFixed(2) }</i><i>元</i></span>
		                    </div>
		                    <div className="immediatePay" onClick={this.immediatePay}>立即付款</div>
		                </div>
		            </section>
		        </section>
		        {/*<router-view></router-view>*/}
		    </div>
		)
	}
}

export default OrderConfirm
