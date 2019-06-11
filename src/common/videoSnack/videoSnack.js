import React, { Component } from 'react'
import './videoSnack.scss'

class VideoSnack extends Component {
	constructor(props){
		super(props)
		this.state = {
			
		}
	}
	picFix (imgUrl) {
		if (imgUrl !== undefined) {
            return imgUrl.replace('w.h', '92.92')
        }
	}
	render(){
		return (
			<div className="video-snack">
		        <h3>观影小吃</h3>
		        <ul>
		        	{
		        		this.props.dealList.map((item,index)=>{
		        			return (
		        				<li key={index}>
					                <div className="snack-img">
					                    <img src={this.picFix(item.imageUrl)} alt="" />
					                </div>
					                <div className="snack-info">
					                    <div className="snack-title">{ item.title }</div>
					                    <div className="snack-price">{ item.price + '元' }</div>
					                    <div className="buy-snack">购买</div>
					                </div>
					            </li>
		        			)
		        		})
		        	}
		        </ul>
		    </div>
		)
	}
}

export default VideoSnack

