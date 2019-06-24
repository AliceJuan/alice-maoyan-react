import React, { Component } from 'react'
import { fromJS, is } from 'immutable'
import './film.scss'
import API from '../../api/api'

import HeadTop from '../../common/header/headTop'
import ActorList from '../../common/horizontalList/horizontalList'
import StarScore from '../../common/starScore/starScore'

class Film extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currentFilm: {},
            actors: [],
            comments: [],
            expandDescFlag: false
        }
    }
    async getFilmDetails(){
        let filmId = this.props.match.params.filmId
        // 获取电影详情及演员列表
        let currentFilm = await API.getFilmDetailsData({'filmId': filmId})
        // 获取评论
        let comments = (await API.getFilmComments({'filmId': filmId})).data.hotComments
        this.setState({
            currentFilm: currentFilm,
            actors: currentFilm.actors,
            comments: comments
        })
    }
    componentDidMount(){
        this.getFilmDetails()
    }
    shouldComponentUpdate(nextProps, nextState){
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    expandDesc = () => {
        this.setState((preState) => ({
            expandDescFlag : !preState.expandDescFlag
        }))
    }
    goToCinema = () => {
        let movieId = this.state.currentFilm.movieId
    	let filmInfo = {
    		filmId: movieId,
    		filmName: this.state.currentFilm.cname,
    	}
    	this.props.saveFilmInfo(filmInfo)
        this.props.history.push({pathname: '/cinema', search: `?movieId=${this.state.currentFilm.movieId}`})
    }
    render () {
        let currentFilm = this.state.currentFilm
        return (
            <div>
                <HeadTop headTitle={currentFilm.cname} goBack="true"></HeadTop>
                <section className="movie-details">
                    <section className="movie-headers">
                        <div className="movie-img">
                            <img src={currentFilm.imgSrc} alt="电影海报" />
                        </div>
                        <div className="movie-content">
                            <div className="movie-name">{currentFilm.cname}</div>
                            <div className="movie-ename">{currentFilm.ename}</div>
                            { currentFilm.score && <StarScore score={currentFilm.score} peopleNum={currentFilm.peopleNum}></StarScore> }
                            { !currentFilm.score && <div className="movie-wanner"></div> }
                            <div className="movie-category">{currentFilm.categoryCat}</div>
                            <div className="movie-date">{currentFilm.releaseDate}</div>
                        </div>
                    </section>
                    <section className="movie-desc">
                        <span className={this.state.expandDescFlag ? 'expand-desc': null }>{currentFilm.desc}</span>
                        <div onClick={this.expandDesc} className={this.state.expandDescFlag ? 'desc-arrow': null }></div>
                    </section>
                    <p className="divide-line"></p>
                    <ActorList items={this.state.actors} showType="actor"></ActorList>
                    <p className="divide-line"></p>
                    <section className="movie-comments">
                        <h3>讨论</h3>
                        <ul>
                            {
                                this.state.comments.map((comment)=>{
                                    return (
                                        <li key={comment.id}>
                                            <img src={comment.avatarUrl} alt="" />
                                            <div className="comment-info">
                                                <div>
                                                    <p>{ comment.nick }</p>
                                                    <p className="score">{ '给这部作品打了' + comment.score + '分' }</p>
                                                </div>
                                                <div className="content">{ comment.content }</div>
                                                <div className="">
                                                    <span className="time">{ comment.time }</span>
                                                    <span className="up-count">{ comment.upCount }</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                    <div onClick={this.goToCinema} className="buy-btn">特惠购票</div>
                </section>
            </div>
        )
    }
}

export default Film