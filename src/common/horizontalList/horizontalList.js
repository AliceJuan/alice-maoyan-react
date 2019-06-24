import React, { Component } from 'react'
// import LazyLoad from 'react-lazyload'
import './horizontalList.scss'
import px2Vw from '../../utils/vw'

class HorizontalList extends Component {
	constructor(props){
		super(props)
		this.state = {
			
		}
	}
	gotoDetail = (movieId) => {
        return () => {
        	this.props.history.push('/film/' + movieId)
        }
    }
	render(){
		let containerWidth = (px2Vw(196) * this.props.items.length) + 'vw'
		return (
			<div>
			    <p className="expect-title">{ this.props.showType === "actor" ? "" : '近期最受期待' }</p>
			    <div className="horizontal-container noscroll-bar">
			      <div className="horizontal-scroll" style={{width: containerWidth}}>
			      	{
			      		this.props.items.map((item,index)=>{
			      			let imgSrc = this.props.showType === 'actor' ? item.actorSrc : item.imgSrc
			      			return (
			      				<div key={index} className="horizontal-scroll-item" onClick={this.gotoDetail(item.movieId)}>
									<img src={imgSrc} alt="" />
						          	{
							          	this.props.showType === "msite" ? 
							          		<div>
									          	<div className="horizontal-scroll-item-toggle"><span></span></div>
									          	<div className="horizontal-scroll-item-wanner">{item.wannerNum}人想看</div>
									          	<div className="horizontal-scroll-item-title">{item.cname}</div>
									          	<div className="horizontal-scroll-item-date">{item.releaseDate}</div>
									        </div>
							          	:
							          		<div>
								          		<div className="horizontal-scroll-item-title">{item.actorName}</div>
								          		<div className="horizontal-scroll-item-date">{item.actorMask}</div>
								          	</div>
						          	}
						        </div>
			      			)
			      		})
			      	}
			      </div>
			    </div>
			</div>
		)
	}
}

export default HorizontalList
