import React, { Component } from 'react'
import './topBar.scss'
import { Link } from 'react-router-dom'

class TopBar extends Component {
	constructor(props){
		super(props)
		this.state = {
			hotToggleData: [{name: '正在热映', index: 0}, {name: '即将上映', index: 1}],
            hotActive: 0
		}
	}
	changeTab = (currentIndex) => {
		return () => {
			this.props.toggleHotItem(currentIndex)
			this.setState({
				hotActive: currentIndex
			})
		}
	}
	render () {
		return (
			<div className="film-top-bar">
			    <Link className="city-entry" to={{ pathname: '/city' }} >
			      	<span>{this.props.currentCity.cname}</span>
			      	<i className="city-entry-arrow"></i>
			    </Link>
			    <div className="switch-hot">
			    	{
			    		this.state.hotToggleData.map((item,index)=>{
							let hotActive = this.props.hotShowFlag ? 0 : 1
			    			return (
			    				<div className={`hot-item ${hotActive===item.index ? 'active' : null}`} key={index} onClick={this.props.toggleHotItem(item.index)}>{item.name}</div>
			    			)
			    		})
			    	}
			    </div>
			    <Link className="search-entry" to={{ pathname: '/search' }} >
			      	<span className="search-icon"></span>
			    </Link>
		  	</div>
		)
	}
}

export default TopBar
