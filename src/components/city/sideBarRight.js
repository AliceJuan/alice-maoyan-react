import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './city.scss'

class Loading extends Component {
	constructor(props){
        super(props)
        this.state = {
            touching: false
        }
    }
    /**
     * 指尖触摸开始的回调
     */
    start (e) {
        // e.preventDefault()
        if (!this.state.touching) {
            this.setState(preState=>({
                touching: !preState.touching
            }))
            this.props.showChar(true)
            this.move(e)
        }
    }
    /**
     * 指尖触摸移动的回调
     */
    move (e) {
        // e.preventDefault()
        if (this.state.touching) {
            const boxRect = ReactDOM.findDOMNode(this.refs.sideBarContainer).getBoundingClientRect()
            const offset = this.calcRelativePosition(e.touches[0].clientY)
            const percent = offset / boxRect.height
            const ch = this.getPositionChar(percent)
            this.updateChar(e.touches[0].clientX, e.touches[0].clientY, ch)
        }
    }
    /**
     * 指尖触摸结束的回调
     */
    end = (e) => {
        // e.preventDefault()
        if (this.state.touching) {
            this.setState(preState => ({
                touching: !preState.touching
            }))
            this.props.showChar(false)
        }
    }
    /**
     * 更新提示字母
     */
    updateChar (clientX, clientY, ch) {
        this.props.updateChar(ch)
    }
    /**
     * 获取当前指尖位置上的字母
     */
    getPositionChar (yPercent) {
        var min = 1
        var max = this.props.sideData.length
        var index = Math.ceil(yPercent * max)
        if (index < min) {
            index = min
        } else if (index > max) {
            index = max
        }
        return this.props.sideData[index - 1]
    }
    /**
     * 计算位置
     */
    calcRelativePosition (clientY) {
        const boxRect = ReactDOM.findDOMNode(this.refs.sideBarContainer).getBoundingClientRect()
        let y = clientY - boxRect.top
        if (y < 0) {
            y = 0
        } else if (y > boxRect.height) {
            y = boxRect.height
        }
        return y
    }
	render(){
		return (
			<section className="city-picker-sidecontainer" ref="sideBarContainer">
                <ul className={`city-side ${this.state.touching?"city-side-hover":null}`} 
                onTouchStart={this.start.bind(this)} 
                onTouchMove={this.move.bind(this)} 
                onTouchEnd={this.end.bind(this)}>
                {
                    this.props.sideData.map((side)=>{
                        return (
                            <li className="city-side-item" key={side}>{side}</li>
                        )
                    })
                }
                </ul>
            </section>
		)
	}
}

export default Loading