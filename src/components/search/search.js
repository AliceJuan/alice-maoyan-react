import React, { Component } from 'react'
import './search.scss'
import { getStore, setStore } from '../../utils/localStorage'
import API from '../../api/api'

import HeadTop from '../../common/header/headTop'
import FilmList from '../../common/filmList/filmList'

class Search extends Component {
	constructor(props){
        super(props)
        this.state = {
        	headTitle: '搜索',
            showHistoryPanel: true,
            searchResFilms: [],
            hotSearch: [],
            historySearch: [],
            keyword: ''
        }
	}
	componentDidMount(){
		setStore('hotSearch', ['后来的我们', '宝贝儿', '海王', '我不是药神', '小时代'])
		this.setState({
			hotSearch: getStore('hotSearch') || [],
			historySearch: getStore('historySearch') || []
		})
	}
	searchFilms = async (keyword) => {
		if (!keyword) {
			this.setState({
				searchResFilms: [],
				showHistoryPanel: true,
				keyword: keyword
			})
			return
		}
		let searchFilm = await API.searchFilms(keyword)
		this.setState({
			keyword: keyword,
			showHistoryPanel: false,
			searchResFilms: searchFilm
		})
		const flag = this.state.historySearch.find(item => item === keyword)
		if (!flag) {
			this.setState(preState => ({
				historySearch: [...preState.historySearch, keyword]
			}))
			setStore('historySearch', this.state.historySearch)
		}
    }
    deleteHistoryKey = (index, event) => {
		event.stopPropagation()
		let historySearchNew = this.state.historySearch
		historySearchNew.splice(index, 1)
        this.setState({
			historySearch: historySearchNew
		})
        setStore('historySearch', historySearchNew)
	}
	handleInput = (e) => {
	    this.setState({
	    	keyword: e.target.value
	    })
	}
    search = (keyword) => {
    	this.setState({ keyword })
    	this.searchFilms(keyword)
	}
	cancelSearch = () => {
		this.setState({
			searchResFilms: [],
			showHistoryPanel: true,
			keyword: ''
		})
	}
	render(){
		let {headTitle,showHistoryPanel,searchResFilms,hotSearch,historySearch,keyword} = this.state
		return (
			<div>
		        <HeadTop headTitle={headTitle} goBack="true"></HeadTop>
		        <div className="box-container search">
					<div className="search-box">
						<i className="search-icon"></i>
						<input name="keyword" placeholder="搜电影、搜影院" value={keyword} 
						onChange={(e)=>this.handleInput(e)}
						onKeyDown={(e)=>{
							if (e.keyCode === 13) {
								this.search(e.currentTarget.value)
							}
						}}/>
						<span onClick={this.cancelSearch}>取消</span>
					</div>
		            <section className="search-content">
		            	{
		            		showHistoryPanel && 
		            		<div className="">
			            		{
			            			historySearch.length > 0 && 
			            			<section className="search-history">
				                        <div className="search-title">最近搜索</div>
				                        <ul>
				                        	{
				                        		historySearch.map((historyKey, index)=>{
				                        			return (
				                        				<li key={index} onClick={()=>this.searchFilms(historyKey)}>
							                                <span>{ historyKey }</span>
							                                <span className="del-icon" onClick={(e)=>this.deleteHistoryKey(index,e)}></span>
							                            </li>
				                        			)
				                        		})
				                        	}
				                        </ul>
				                    </section>
			            		}
			                    <p className="divide-line"></p>
			                    {
			                    	hotSearch.length > 0 && 
			                    	<section className="search-hot">
				                        <div className="search-title">热门搜索</div>
				                        <ul>
				                        	{
				                        		hotSearch.map((hotKey,index)=>{
				                        			return (
				                        				<li key={index} onClick={()=>this.searchFilms(hotKey)}>
							                                <span>{ hotKey }</span>
							                            </li>
				                        			)
				                        		})
				                        	}
				                        </ul>
				                    </section>
			                    }
			                </div>
		            	}
		            	{
		            		searchResFilms.length > 0 && 
		            		<div>
			                    <div className="search-title">电影/电视剧/综艺</div>
			                    {
			                    	searchResFilms.map((film,index)=>{
			                    		return (
			                    			<FilmList film={film} placeNow="search" key={index}></FilmList>
			                    		)
			                    	})
			                    }
			                </div>
		            	}
		            </section>
		        </div>
		    </div>
		)
	}
}

export default Search