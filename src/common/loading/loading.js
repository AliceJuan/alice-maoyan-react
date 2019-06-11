import React, { Component } from 'react'
import './loading.scss'
import loadingImg from '../../assets/loading.gif'

class Loading extends Component {
	constructor(props){
        super(props)
        this.state = {
            
        }
    }
	render(){
		return (
			<div className="loading">
			    <div className="loading-content">
			      	<img src={loadingImg} alt='' />
			      	{/*<p className="desc">{{title}}</p>*/}
			    </div>
			</div>
		)
	}
}

export default Loading