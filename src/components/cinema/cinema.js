import React, { Component } from 'react'
import { fromJS, is } from 'immutable'
import './cinema.scss'
import API from '../../api/api'

import HeadTop from '../../common/header/headTop'
import FootGuide from '../../common/footer/footGuide'
import CinemaList from '../../common/cinemaList/cinemaList'
import SearchBox from '../../common/searchBox/searchBox'

class Cinema extends Component {
    constructor(props){
        super(props)
        this.state = {
            headTitle: '影院',
            goBack: false,
            cinemaList: [],
            movieSearchCinema: false,
            showDays: [],
            dayIndex: 0,
            movieId: ''
        }
    }
    getCinemaData = async(keyword) => {
        let cinemaList = await API.getCinemaData(keyword)
        this.setState({
            cinemaList: cinemaList
        })
    }
    async getMovieCinemaData (day) {
        let param = {
            'movieId': this.state.movieId,
            'day': day
        }
        let respData = await API.getMovieCinemaData(param)
        this.setState({
            cinemaList: respData.cinemas,
            showDays: respData.showDays.dates
        })
    }
    chooseDay = (day, index) => {
        return ()=>{
            this.setState({dayIndex: index})
            this.getMovieCinemaData(day.date)
        }
    }
    componentDidMount(){
        if(this.props.place === '/msite'){
                let nowDay = new Date().toLocaleDateString()
                this.getMovieCinemaData(nowDay.replace(/\//g, '-'))
                this.setState({
                    goBack: true,
                    movieSearchCinema: true,
                    movieId: this.props.film.filmId
                    // headTitle: movieName
                })
                this.movieSearchCinema = true
                this.headTitle = this.movieName
        }else{
            this.getCinemaData()
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
    goCinemaDetail = (cinemaId) => {
        return () => {
        	let chooseDay = this.state.showDays[this.state.dayIndex].date
            // this.props.history.push({pathname: '/cinemaDetail', query: {cinemaId: cinemaId, day: chooseDay}})
            this.props.history.push({pathname: '/cinemaDetail', search:`?cinemaId=${cinemaId}&showDate=${chooseDay}`})
            // this.props.history.push({pathname: '/cinemaDetail?cinemaId='+c/inemaId+'&day='+chooseDay})
        }
    }
    render(){
        let { headTitle, goBack, movieSearchCinema, showDays, dayIndex, cinemaList } = this.state
        return (
            <div className="cinema">
                <HeadTop headTitle={headTitle} goBack={goBack}></HeadTop>
                <section className="box-container">
                    { !movieSearchCinema && <SearchBox searchEvent={this.getCinemaData} keyword=''></SearchBox> }
                    {movieSearchCinema && <ul className="show-days">
                        {
                            showDays.map((day,index)=>{
                                return (
                                    <li key={index} onClick={this.chooseDay(day,index)} className={dayIndex===index ? 'active': null }>{ day.date }</li>
                                )
                            })
                        }
                    </ul>}
                    <CinemaList cinemaList={cinemaList} goCinemaDetail={this.goCinemaDetail} movieSearchCinema={movieSearchCinema}></CinemaList>
                </section>
                { !movieSearchCinema && <FootGuide></FootGuide> }
            </div>
        )
    }
}

export default Cinema