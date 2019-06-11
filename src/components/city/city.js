import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './city.scss'
import API from '../../api/api'
import { getStore } from '../../utils/localStorage'

import SideBarRight from './sideBarRight'

class City extends Component {
	constructor(props){
        super(props)
        this.state = {
            currentCity: '',
            currentChar: '',
            cityHistory: [],
            charFlag: false,
            sideData: ['定位', '最近', '热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            cityList: {}
        }
    }
	async initData() {
		let cityList = await API.getAllCity()
		let cityHistory = getStore('historyCities') || []
        this.setState({
        	cityList: cityList,
        	cityHistory: cityHistory
        })
	}
	componentWillMount(){
        this.initData()
	}
	selectCityEvent = (city) => {
        this.props.updateCity(city)
        this.props.history.go(-1)
    }
    updateChar = (msg) => {
		this.setState({
			currentChar: msg.substr(0, 1)
		})
        const target = ReactDOM.findDOMNode(this.refs.scrollBar).querySelector('[data-ch="' + msg + '"]')
        if (target) {
            target.scrollIntoView()
        }
    }
    showChar = (flag) => {
		this.setState({
			charFlag: flag
		})
    }
	render(){
		let {currentChar, cityHistory, charFlag, sideData, cityList} = this.state 
		return (
			<div className="city-picker noscroll-bar" ref="scrollBar">
		        {/*<locate-city title='定位城市'></locate-city>*/}
		        {
		        	cityHistory.length > 0 && 
		        	<section>
			            <div className="city-inline" data-ch="最近">
			                <div className='city-title city-title-left'>最近访问城市</div>
			                <div className="city-inline-list">
			                {
			                	cityHistory.map((city)=>{
			                		return (
			                			<div className="city-inline-cell" key={city.cname} onClick={()=>this.selectCityEvent(city)}>{city.cname}</div>
			                		)
			                	})
			                }
			                </div>
			            </div>
			        </section>
		        }
		        <section>
		            <div className="city-inline" data-ch="热门">
		                <div className='city-title city-title-left'>热门城市</div>
		                <div className="city-inline-list">
		                {
		                	cityList.hot && cityList.hot.map((hotCity)=>{
		                		return (
		                			<div className="city-inline-cell" key={hotCity.cname} onClick={()=>this.selectCityEvent(hotCity)}>{hotCity.cname}</div>
		                		)
		                	})
		                }
		                </div>
		            </div>
		        </section>
		        <section>
		        {
		        	cityList.nomal && cityList.nomal.map((cityGroup)=>{
		        		return (
		        			<div key={cityGroup.capital} className="city-group" data-ch={cityGroup.capital}>
				                <div className="city-title">{cityGroup.capital}</div>
				                <div className="city-group-list">
				                {
				                	cityGroup.cities.map((city)=>{
				                		return (
				                			<div className="city-group-cell" key={city.cname} onClick={()=>this.selectCityEvent(city)}>{city.cname}</div>
				                		)
				                	})
				                }
				                </div>
				            </div>
		        		)
		        	})
		        }
		        </section>
		        <SideBarRight sideData={sideData} updateChar={this.updateChar} showChar={this.showChar}></SideBarRight>
		        <div className={`city-picker-current-char ${charFlag ? 'city-picker-current-char-show' : null} `}>{currentChar}</div>
		    </div>
		)
	}
}

export default City