import React, { Component } from 'react'
import './starScore.scss'
import fullStarImg from '../../assets/star-full-new.png'
import emptyStarImg from '../../assets/star-empty-new.png'
import halfStarImg from '../../assets/star-half-new.png'

class StarScore extends Component {
	constructor(props){
        super(props)
        this.state = {
            fullStars: 3,
            halfStarFlag: false,
            emptyStars: 2,
            people: '无'
        }
    }
	componentDidMount(){
		const scoreNum = Number.parseFloat(this.props.score)	//5.8
        const halfNum = scoreNum / 2	//2.9
        let fullStarsTmp = Number.parseInt(halfNum)	// 2
        let halfStarFlagTmp = false
        
        const decimal = halfNum - fullStarsTmp	//0.9
        if (decimal >= 0.25 && decimal <= 0.75) {	//false
            halfStarFlagTmp = true
        } else {
        	if(decimal > 0.75){
        		this.fullStarsTmp += 1
        	}
            halfStarFlagTmp = false
        }
		
		let emptyStars = 5 - fullStarsTmp
        if (halfStarFlagTmp) {
			emptyStars -= 1
        }
        
        let peopleTmp = ''
        if (this.props.peopleNum >= 10000) {
            peopleTmp = this.props.peopleNum / 10000 + '万'
        } else {
            peopleTmp = this.props.peopleNum
        }
        this.setState({
        	fullStars: fullStarsTmp,
			halfStarFlag: halfStarFlagTmp,
			emptyStars: emptyStars,
        	people: peopleTmp
        })
	}
	render(){
		let fullStarNode = []
		for(let i=0; i<=this.state.fullStars; i++){
			fullStarNode.push(<img src={fullStarImg} key={i+"full"} alt='' />)
		}
		let emptyStarsNode = []
		for(let i=0; i<=this.state.emptyStars; i++){
			emptyStarsNode.push(<img src={emptyStarImg} key={i+'empty'} alt='' />)
		}
		return (
			<div className="star-score">
			    <div className="star-rating">
			    	{ fullStarNode }
			        { this.state.halfStarFlag && <img src={halfStarImg} alt='' /> }
			        { emptyStarsNode }
			        <span>{ this.props.score }</span>
			    </div>
			    <div className="star-num">
			        <span>{"("+this.state.people+"人评分)"}</span>
			    </div>
			</div>
		)
	}
}

export default StarScore