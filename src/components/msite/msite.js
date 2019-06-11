import React, {Component} from 'react'
import "./msite.scss"
import API from "../../api/api"

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
            preFilms: [],
            expect: [],
            pulldown: true
	    }
	}
	initData = async () => {
		let respData = await API.getAllFilms()
	    this.setState(preState => ({
				films: [...preState.films, ...respData],
				preFilms: [...preState.films, ...respData],
				expect: [...preState.films, ...respData],
				showLoading: false,
				currentCity: store.getState().city
			}))
	}
	componentDidMount(){
		this.initData()
	}
	toggleHotItem = (hotActive) => {
		return () => {
			this.setState({
				hotShowFlag: hotActive === 0
			})
		}
    }
	render() {
		let filmList = this.state.films.map((film,index) => {
	      	return (
		        <FilmList film={film} key={index}></FilmList>
	      	);
	    });
	    return (
	      	<div>
	      		<HeadTop headTitle={this.state.headTitle} goBack={this.state.goBack}></HeadTop>
	      		<section className="box-container msite-container">
	      			<TopBar currentCity={this.state.currentCity} hotShowFlag={this.state.hotShowFlag} toggleHotItem={this.toggleHotItem}></TopBar>
		            <section className="onshow" style={this.state.hotShowFlag === true ? {} : { display: "none" }}>
	                    <div className="list">
	                    	{ filmList }
	                    </div>
		            </section>
		        </section>
		        <section className="onshow" style={this.state.hotShowFlag === true ? {display: "none"} : {}}>
	                <div className="list">
	                    <HorizontalList items={this.state.expect} showType='msite'></HorizontalList>
	                    <p className="divide-line"></p>
	                    { filmList }
	                </div>
	            </section>
	      		<FootGuide></FootGuide>
	      	</div>
	    );
	}
}

export default Miste