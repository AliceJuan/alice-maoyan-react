import React, { Component } from 'react'
import { fromJS, is } from 'immutable'

import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'

import './cinemaDetail.scss'
import API from '../../api/api'

import HeadTop from '../../common/header/headTop'
import VideoSnack from '../../common/videoSnack/videoSnack'

class CinemaDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            cinemaId: '', // 影院id
            cinemaInfo: {}, // 影院信息
            movieList: [], // 影院上映的电影
            movieIndex: 0, // 当前电影索引
            movieTime: [], // 电影场次时间
            timeIndex: 0, // 当前日期索引
            dealList: [] // 观影小吃
        }
    }
    getQueryString (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = this.props.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null) context = r[2];
        reg = null;
        r = null;
        return context == null || context === "" || context === "undefined" ? "" : context;
    }
    async componentDidMount(){
        // let cinemaId = this.props.location.state.cinemaId //this.props.location.state	//{cinemaId: '', day: ''}
        // let day = this.props.location.state.day
        let cinemaId = this.getQueryString('cinemaId')
        let day = this.getQueryString('showDate')
        let cinemaInfoTmp = await API.getCinemaDetailsData({cinemaId, day})

        let showMovieIndex = 0
        cinemaInfoTmp.movies.forEach((item, index) => {
            if (item.movieId === this.props.film.filmId) {
                showMovieIndex = index
            }
        })

        this.setState({
            cinemaInfo: cinemaInfoTmp,
            movieList: cinemaInfoTmp.movies,
            dealList: cinemaInfoTmp.dealList.dealList,
            cinemaId: cinemaId,
            movieIndex: showMovieIndex,
            movieTime: cinemaInfoTmp.movies[showMovieIndex].movieTime,
        })
        
        this.props.saveCinemaInfo({
        	cinemaId: cinemaInfoTmp.cinemaId,
        	cinemaName: cinemaInfoTmp.name
        })

        var that = this
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 4,
            spaceBetween: 30,
            slideToClickedSlide: true,
            centeredSlides: true,
            on:{
                transitionEnd: function(){
                    that.setState((preState)=>({
                        movieIndex: this.activeIndex,
                        movieTime: preState.movieList[this.activeIndex].movieTime 
                    }))
                }
            }
        });
        swiper.slideTo(showMovieIndex, 1000, false);
    }
    shouldComponentUpdate(nextProps, nextState){
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    switchThis = (index) => {
    	this.setState(preState => ({
            movieIndex: index,
            movieTime: preState.movieList[index].movieTime 
    	}))
    }
    picFix (wh) {
        if (wh !== undefined) {
            return wh.replace('w.h', '65.94')
        }
    }
    changeMoiveTime = (index) => {
        return () => {
            this.setState({timeIndex: index})
        }
    }
    goBuyTicket = (timeObj) => {
        let movieInfo= this.state.movieList[this.state.movieIndex]
        if(movieInfo.cname !== this.props.film.filmName){
        	this.props.saveFilmInfo({
        		movieId: movieInfo.movieId,
        		movieName: movieInfo.cname
        	})
        }
        timeObj.day = this.state.movieTime[this.state.timeIndex].movieDay
        this.props.saveVideoTime(timeObj)
		this.props.history.push('./chooseSeat')
    }
    render(){
        let {cinemaInfo,movieList,movieIndex,movieTime,timeIndex,dealList} = this.state
        return (
            <div>
                <HeadTop headTitle={cinemaInfo.name} goBack="true"></HeadTop>
                <section className="box-container">
                    <section className="cinema-detail-title">
                        <div>
                            <h3>{ cinemaInfo.name }</h3>
                            <span>{ cinemaInfo.address }</span>
                        </div>
                        <span><i></i></span>
                    </section>
                    <section className="cinema-nav">
                        <div className="cinema-nav-list">
                            <div className="post-bg"></div>
                            <div className="post-bg-filter">
                                {/* <!--背景图--> */}
                                { movieList.length && 
                                    <div className="box">
                                        <img className="bg-img" src={this.picFix(movieList[movieIndex].imgSrc)} alt="" />
                                    </div>
                                }
                            </div>
                            <div className="swiper-box">
                                {/* <!-- 轮播 --> */}
                                <div className="swiper-container">
								    <div className="swiper-wrapper">
								      	{
								      		movieList.map((movies, index)=>{
								      			return (
								      				<div key={movies.movieId} className="swiper-slide">
								      					<div>
				                                            <img src={this.picFix(movies.imgSrc)} alt="" onClick={()=>this.switchThis(index)} />
				                                        </div>
								      				</div>
								      			)
								      		})
								      	}
								    </div>
								</div>
                            </div>
                        </div>
                        {/* <!-- 电影介绍 --> */}
                        { movieList.length && <div className="movie-introduction">
                            <h3>{ movieList[movieIndex].cname }</h3>
                            <p>{ movieList[movieIndex].duration} | {movieList[movieIndex].categoryCat} | {movieList[movieIndex].actors.join(",") }</p>
                        </div> }
                    </section>
                    <section className="movie-time">
                        <ul className="day-list">
                            {
                                movieTime.map((item,index)=>{
                                    return (
                                        <li key={index} onClick={this.changeMoiveTime(index)} className={timeIndex===index ? 'active' : null}>{ item.movieDay }</li>
                                    )
                                })
                            }
                        </ul>
                        <section className="date-list">
                            { movieTime.length && <ul>
                                {
                                    movieTime[timeIndex].showTime.map((timeObj,index)=>{
                                        return (
                                            <li key={index}>
                                                <div className="time-details">
                                                    <div>
                                                        <span className="start-time">{ timeObj.startTime }</span>
                                                        <span className="video-type">{ timeObj.videoType }</span>
                                                        <span className="price"><i>￥</i><i className="price-str">{ timeObj.price }</i></span>
                                                    </div>
                                                    <div>
                                                        <span className="end-time">{ timeObj.endTime + '散场' }</span>
                                                        <span className="video-hall">{ timeObj.videoHall }</span>
                                                        <span className="discount-price">{ '折扣卡首单' }</span>
                                                    </div>
                                                </div>
                                                <div className="buy-btn">
                                                    <button onClick={()=>this.goBuyTicket(timeObj)}>购票</button>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul> }
                        </section>
                    </section>
                    <p className="divide-line"></p>
                    <VideoSnack dealList={dealList}></VideoSnack>
                </section>
            </div>
        )
    }
}

export default CinemaDetail