import React, { Component } from 'react'
import ReactDOM from "react-dom"
import './chooseSeat.scss'
import { fromJS, is } from 'immutable'
// import { Link } from 'react-router-dom'

import HeadTop from '../../common/header/headTop'

class ChooseSeat extends Component {
	constructor(props){
        super(props)
        this.state = {
        	selectSeatInfo: [],
            seatArray: [], // 影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
            seatRow: 10, // 影院座位行数
            seatCol: 20, // 影院座位列数
            seatSize: '', // 座位尺寸
            recommendChooseMaxNum: 4, // 推荐选座最大数量
//          movieName: "小时代",
//			totalPrice: "80.00",
//			videoInfo: []
        }
	}
	componentDidMount(){
		this.initSeatArray(10, 20)
    }
    shouldComponentUpdate(nextProps, nextState){
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }
	// 初始座位数组
    initSeatArray () {
        let seatArrayTmp = Array(this.state.seatRow).fill(0).map(() => Array(this.state.seatCol).fill(0))
        
        let innerSeatWrapperDOM = ReactDOM.findDOMNode(this.refs.innerSeatWrapper);
        
        let seatSizeTmp = innerSeatWrapperDOM
            ? parseInt(parseInt(window.getComputedStyle(innerSeatWrapperDOM).width, 10) / this.state.seatCol, 10)
            : 0
      	this.initNonSeatPlace(seatArrayTmp)
      	
        this.setState({
        	seatSize: seatSizeTmp
        })
    }
    // 初始化不是座位的地方
    initNonSeatPlace (seatArrayTmp) {
        for (let i = 0; i < 9; i++) {
            seatArrayTmp[i][0] = -1
        }
        for (let i = 0; i < 8; i++) {
            seatArrayTmp[i][seatArrayTmp[0].length - 1] = -1
            seatArrayTmp[i][seatArrayTmp[0].length - 2] = -1
        }
        for (let i = 0; i < 9; i++) {
            seatArrayTmp[i][seatArrayTmp[0].length - 3] = -1
        }
        for (let i = 0; i < seatArrayTmp[0].length; i++) {
            seatArrayTmp[2][i] = -1
        }
        this.setState({
        	seatArray: seatArrayTmp
        })
    }
    // 处理座位选择逻辑
    handleChooseSeat = (row, col) => {
        let seatValue = this.state.seatArray[row][col]
        let newArray = this.state.seatArray
        let selectSeatInfoTmp = fromJS(this.state.selectSeatInfo).toJS()
        // 如果是已购座位，直接返回
        if (seatValue === 2) return
        // 如果是已选座位点击后变未选
        let place = row + '排' + col + '坐'
        if (seatValue === 1) {
            newArray[row][col] = 0
            selectSeatInfoTmp = this.state.selectSeatInfo.filter((item) => { return item.place !== place })
        } else if (seatValue === 0) {
            if (this.state.selectSeatInfo.length >= this.state.recommendChooseMaxNum) {
                alert('一次最多选择4个座位')
            } else {
                newArray[row][col] = 1
                selectSeatInfoTmp.push({place: place, price: '19.9'})
                // 测试 异步action
                this.props.addSeat({place: place, price: '19.9'})
            }
        }
        // 必须整体更新二维数组，Vue无法检测到数组某一项更新,必须复制一个数组才行
        this.setState((prevState)=>({
        	selectSeatInfo: selectSeatInfoTmp,
            seatArray: fromJS(newArray).toJS()
        }))
    }
    delSelectSeat = (place) => {
    	let selectSeatInfoTmp = []
        selectSeatInfoTmp = this.state.selectSeatInfo.filter(item => item.place !== place)
        let row = place.substring(0, place.indexOf('排'))
        let col = place.substring(place.indexOf('排') + 1, place.indexOf('坐'))
        let oldArray = fromJS(this.state.seatArray).toJS()
        oldArray[row][col] = 0
        this.setState({
        	selectSeatInfo: selectSeatInfoTmp,
        	seatArray: oldArray
        })
    }
    confirmChooseSeat = () => {
//      if (this.$store.state.login) {
//          // 存数据-->跳页面
			this.props.saveSeatInfo(this.state.selectSeatInfo)
            this.props.history.push('/orderConfirm')
//      } else {
//          this.$router.push('./login')
//      }
    }

    // 向前后某个方向进行搜索的函数,参数是起始行，终止行,推荐座位个数
    searchSeatByDirection (fromRow, toRow, num) {
        /* 推荐座位规则
        * (1)初始状态从座位行数的一半处的后一排的中间开始向左右分别搜索，取离中间最近的，如果满足条件，
        *    记录下该结果离座位中轴线的距离，后排搜索完成后取距离最小的那个结果座位最终结果，优先向后排进行搜索，
        *    后排都没有才往前排搜，前排逻辑同上
        * (2)只考虑并排且连续的座位，不能不在一排或者一排中间有分隔
        * */
        /*
        * 保存当前方向搜索结果的数组,元素是对象,result是结果数组，offset代表与中轴线的偏移距离
        * {
        *   result:Array([x,y])
        *   offset:Number
        * }
        */
        let currentDirectionSearchResult = []
        let largeRow = fromRow > toRow ? fromRow : toRow
        let smallRow = fromRow > toRow ? toRow : fromRow
        for (let i = smallRow; i <= largeRow; i++) {
            // 每一排的搜索,找出该排里中轴线最近的一组座位
            let tempRowResult = []
            let minDistanceToMidLine = Infinity
            for (let j = 0; j <= this.state.seatCol - num; j++) {
                // 如果有合法位置
                if (this.checkRowSeatContinusAndEmpty(i, j, j + num - 1)) {
                    // 计算该组位置距离中轴线的距离:该组位置的中间位置到中轴线的距离
                    let resultMidPos = parseInt((j + num / 2), 10)
                    let distance = Math.abs(parseInt(this.state.seatCol / 2) - resultMidPos)
                    // 如果距离较短则更新
                    if (distance < minDistanceToMidLine) {
                        minDistanceToMidLine = distance
                        // 该行的最终结果
                        tempRowResult = this.generateRowResult(i, j, j + num - 1)
                    }
                }
            }
            // 保存该行的最终结果
            currentDirectionSearchResult.push({
                result: tempRowResult,
                offset: minDistanceToMidLine
            })
        }
        // 处理后排的搜索结果:找到距离中轴线最短的一个
        // 注意这里的逻辑需要区分前后排，对于后排是从前往后，前排则是从后往前找
        let isBackDir = fromRow < toRow
        let finalReuslt = []
        let minDistanceToMid = Infinity
        if (isBackDir) {
            // 后排情况,从前往后
            currentDirectionSearchResult.forEach((item) => {
                if (item.offset < minDistanceToMid) {
                    finalReuslt = item.result
                    minDistanceToMid = item.offset
                }
            })
        } else {
            // 前排情况，从后往前找
            currentDirectionSearchResult.reverse().forEach((item) => {
                if (item.offset < minDistanceToMid) {
                    finalReuslt = item.result
                    minDistanceToMid = item.offset
                }
            })
        }
        // 直接返回结果
        return finalReuslt
    }
    // 推荐选座,参数是推荐座位数目
    smartChoose = (num) => {
        // 找到影院座位水平垂直中间位置的后一排
        let rowStart = parseInt((this.state.seatRow - 1) / 2, 10) + 1
        // 先从中间排往后排搜索
        let backResult = this.searchSeatByDirection(rowStart, this.state.seatRow - 1, num)
        if (backResult.length > 0) {
            this.chooseSeat(backResult)
            return
        }
        // 再从中间排往前排搜索
        let forwardResult = this.searchSeatByDirection(rowStart - 1, 0, num)
        if (forwardResult.length > 0) {
            this.chooseSeat(forwardResult)
            return
        }
        // 提示用户无合法位置可选
        alert('无合法位置可选!')
    }
    // 辅助函数，判断每一行座位从i列到j列是否全部空余且连续
    checkRowSeatContinusAndEmpty (rowNum, startPos, endPos) {
        let isValid = true
        for (let i = startPos; i <= endPos; i++) {
            if (this.state.seatArray[rowNum][i] !== 0) {
                isValid = false
                break
            }
        }
        return isValid
    }
    // 辅助函数：返回每一行的某个合理位置的座位数组
    generateRowResult (row, startPos, endPos) {
        let result = []
        for (let i = startPos; i <= endPos; i++) {
            result.push([row, i])
        }
        return result
    }
    // 辅助函数:智能推荐的选座操作
    chooseSeat (result) {
        this.setState({
        	selectSeatInfo: []
        })
        let oldArray = fromJS(this.state.seatArray).toJS()
        for (let i = 0; i < result.length; i++) {
            // 选定座位
            oldArray[result[i][0]][result[i][1]] = 1
            let place = result[i][0] + '排' + result[i][1] + '坐'
            this.setState(preState => ({
	        	selectSeatInfo: [...preState.selectSeatInfo, {place: place, price: '19.9'}]
	        }))
        }
        this.setState({
        	seatArray: oldArray
        })
    }
	render(){
		let { selectSeatInfo, seatArray, seatRow, seatCol, seatSize, recommendChooseMaxNum } = this.state
		let { film, cinema, video } = this.props
		let seatRowDom = []
		if(seatArray.length > 0){
			for(let row = 0; row < seatRow; row++){
                let seatColDom = []
				for(let col = 0; col < seatCol; col++){
					seatColDom.push(
	    				<div key={'row'+row+'col'+col} className="seat" style={{width:seatSize+'px',height:seatSize+'px'}}>
	    					{
	    						seatArray[row][col]!==-1 && 
	    						<div onClick={()=>this.handleChooseSeat(row,col)} 
	                            className={`inner-seat ${seatArray[row][col]===2?'bought-seat':(seatArray[row][col]===1?'selected-seat':'unselected-seat')}`}>
	                            </div>
	    					}
	                    </div>
	               )
	    		}
				seatRowDom.push(
					<div key={'row'+row}>{ seatColDom }</div>
				)
			}
		}
		let recommendSeatDom = []
		for(let z=0; z<recommendChooseMaxNum; z++){
			recommendSeatDom.push(<li key={'chooseNum'+z} onClick={()=>this.smartChoose(z+1)}>{ z + 1 + '人' }</li>)
		}

		return (
			<div>
		        <HeadTop headTitle={cinema.cinemaName} goBack="true"></HeadTop>
		        <section className="box-container choose-seat">
		            <section className="movie-info">
		                <h3>{ film.filmName }</h3>
		                <p>{ video.day + ' ' + video.startTime + ' ' +  video.videoType }</p>
		            </section>
		            <section>
		                <div className="seat-wrapper">
		                    <div className="screen">{ video.videoHall }</div>
		                    <div className="screen-center">银幕中央<div className="mid-line"></div></div>
		                    <div className="inner-seat-wrapper" ref="innerSeatWrapper" >
		                    	{ seatRowDom }
		                    </div>
		                </div>
		            </section>
		            <section className="seat-tip-info">
		                <ul className="seat-tip">
		                    <li><i className="unselected-seat"></i><span>可选</span></li>
		                    <li><i className="selected-seat"></i><span>不可选</span></li>
		                    <li><i className="bought-seat"></i><span>已选</span></li>
		                </ul>
		                <div className="seat-recommend">
		                    <div className="seat-recommend-num">
		                        <span>推荐座位</span>
		                        <ul>
		                        	{ recommendSeatDom }
		                        </ul>
		                    </div>
		                    <div className="confirmBtn">请先选座</div>
		                </div>
		            </section>
		            {
		            	selectSeatInfo.length > 0 && 
		            	<section className="seat-info">
			                <p>已选座位</p>
			                <ul className="seat-info-details">
			                	{
			                		selectSeatInfo.map((item,index)=>{
			                			return (
			                				<li key={index}>
						                        <p>{ item.place }</p>
						                        <p>{ item.price + '元' }</p>
						                        <span className="del-icon" onClick={()=>this.delSelectSeat(item.place)}></span>
						                    </li>
			                			)
			                		})
			                	}
			                </ul>
			                <div className="confirmBtn" onClick={this.confirmChooseSeat}>{ this.state.totalPrice }元 确认选座</div>
			            </section>
		            }
		        </section>
		    </div>
		)
	}
}

export default ChooseSeat