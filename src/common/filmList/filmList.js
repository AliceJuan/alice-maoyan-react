import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import './filmList.scss'

class FilmList extends Component {
	constructor(props){
		super(props)
		this.state = {
			
		}
	}
	render(){
		let film = this.props.film
		return (
			<Link className="film-card" to={{pathname: '/film/'+film.movieId}}>
			    <div className="film-img">
			    	<LazyLoad throttle={200} height={125}>
			      		<img src={film.imgSrc} alt=''/>
			      	</LazyLoad>
			    </div>
			    <div className="film-outline">
			      	<div className="content">
			        	<p className="title">
			          		<span>{film.cname}</span>
			        	</p>
			        	<div className="detail">
			            	{ film.status===0 && <p className="score">观众评分：<span className="score-show">{film.score}</span></p> }
			            	{ film.status===2 && <p className="score"><span className="score-show">{film.wannerNum}</span>人想看</p> }
			            	<p className="actors">主演：
			            		{
			            			film.actors.map((actor,index)=>{
			            				return (
			            					<span key={index}>{actor.actorName} 
			            						{ index !== film.actors.length-1 && <span>,</span> }
			            					</span>
			            				)
			            			})
			            		}
			            	</p>
			            	{ film.status===0 && <p className="show-info" v-if=''>今天2家电影院放映19场</p> }
			            	{ film.status===2 && <p className="show-info">{film.releaseDate}</p> }
			        	</div>
			      	</div>
			      	<div className="buy" style={film.status==='2' ? {background: '#3c9fe6'} : {}}>
			        	{ film.status===0 && <span>购票</span> }
			        	{ film.status===2 && <span>预售</span> }
			      	</div>
			    </div>
			</Link>
		)
	}
}

export default FilmList
