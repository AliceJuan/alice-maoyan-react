import React, { Component } from 'react'
import './searchBox.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class SearchBox extends Component {
	constructor(props){
        super(props)
        this.state = {
            placeNowTab: '/cinema',
            currentCity: '北京',
            keyword: ''
        }
	}
	componentDidMount(){
		this.setState({
			placeNowTab: this.props.place,
			keyword: this.props.keyword
		})
	}
    handleInput = (type, e) => {
	    let value = e.target.value
	    this.setState({
	    	keyword: value
	    })
	}
    search = (keyword) => {
    	this.setState({ keyword })
    	this.props.searchEvent(keyword)
    }
	render(){
		return (
			<div className="search-cinema-box">
				<Link to={{ pathname:'/city' }} className="city-entry">
					<span>{ this.state.currentCity }</span>
					<i className="city-entry-arrow"></i>
				</Link>
				<div className="search-input-box">
					<i className="search-icon"></i>
					<input name="keyword" placeholder="搜电影、搜影院" value={this.state.keyword} 
						onChange={(e)=>this.handleInput('keyword',e)}
						onKeyDown={(e)=>{
							if (e.keyCode === 13) {
								this.search(e.currentTarget.value)
							}
						}}/>
				</div>
		    </div>
		)
	}
}

export default connect(state => ({
	placeNow: state.place
}), {
	
})(SearchBox)