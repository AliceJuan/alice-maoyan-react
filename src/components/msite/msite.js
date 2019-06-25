import React, {Component} from 'react'
import "./msite.scss"
import API from "../../api/api"
// import { CSSTransition, TransitionGroup } from "react-transition-group"
import { fromJS, is } from "immutable"
// import { forceCheck } from 'react-lazyload';

import store from '../../redux/store'

import HeadTop from '../../common/header/headTop'
import FootGuide from '../../common/footer/footGuide'
import FilmList from '../../common/filmList/filmList'
import HorizontalList from '../../common/horizontalList/horizontalList'
import TopBar from './children/topBar'

class Miste extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      	headTitle: '猫眼电影',
	      	goBack: false,
            showLoading: true,
            currentCity: {'cname':'北京'},
            hotShowFlag: true,
            films: [],
            comingFilms: [],
            expect: [],
            pulldown: true
	    }
	}
	initData = async () => {
		let respData = await API.getAllFilms()
		let expectFilm = await API.getExpectFilms()
		let comingFilm = await API.getComingFilms()
	    this.setState(preState => ({
				films: [...preState.films, ...respData],
				comingFilms: [...preState.comingFilms, ...comingFilm],
				expect: [...preState.expect, ...expectFilm],
				showLoading: false,
				currentCity: store.getState().city
			}))
	}
	componentDidMount(){
		this.initData()
	}
	shouldComponentUpdate(nextProps, nextState){
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
	}
	toggleHotItem = (hotActive) => {
		return () => {
			this.setState({
				hotShowFlag: hotActive === 0
			})
			document.documentElement.scrollTop = 1
			// forceCheck()
		}
    }
	render() {
		let filmList = this.state.films.map((film,index) => {
	      	return (
		        <FilmList film={film} key={index}></FilmList>
	      	);
		});
		let comingFilmList = this.state.comingFilms.map((film,index) => {
			return (
			  <FilmList film={film} key={index}></FilmList>
			);
	  	});
	    return (
	      	<div>
	      		<HeadTop headTitle={this.state.headTitle} goBack={this.state.goBack}></HeadTop>
	      		<section className="box-container msite-container">
	      			<TopBar currentCity={this.state.currentCity} hotShowFlag={this.state.hotShowFlag} toggleHotItem={this.toggleHotItem}></TopBar>
					{/* <CSSTransition in={this.state.hotShowFlag} timeout={300} classNames="translate"> */}
		      			<section className="onshow" style={this.state.hotShowFlag === true ? {} : { display: "none" }}>
		                    <div className="list">
		                    	{ filmList }
		                    </div>
			            </section>
	                {/* </CSSTransition> */}
					{/* <CSSTransition in={!this.state.hotShowFlag} timeout={300} classNames="translate"> */}
			           	<section className="onshow" style={this.state.hotShowFlag === true ? {display: "none"} : {}}>
			                <div className="list">
			                    <HorizontalList items={this.state.expect} showType='msite'></HorizontalList>
			                    <p className="divide-line"></p>
			                    { comingFilmList }
			                </div>
			            </section>
		            {/* </CSSTransition> */}
	      		</section>
	      		<FootGuide></FootGuide>
	      	</div>
	    );
	}
}

export default Miste