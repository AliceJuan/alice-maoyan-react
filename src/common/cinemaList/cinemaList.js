import React, { Component } from 'react'
import './cinemaList.scss'

class CinemaList extends Component {
    constructor(props){
        super(props)
        this.state = {
            cinemaActivity: [{'type': '1', 'title': '惠', 'desc': '宝贝儿等三部影片特惠'},
                            {'type': '2', 'title': '卡', 'desc': '开卡特惠，首单2张立减10元'}]
        }
    }
    render(){
        return (
            <div className="cinema-list-container">
                <ul>
                    {
                        this.props.cinemaList.map((cinema)=>{
                            return (
                                <li onClick={this.props.goCinemaDetail(cinema.cinemaId)} key={cinema.cinemaId}>
                                    <div className="cinema-item cinema-title">
                                        <p>{ cinema.name }</p>
                                        <span><i className="color">48</i><span className="color">元</span>起</span>
                                    </div>
                                    <div className="cinema-item cinema-address">
                                        <p>{ cinema.address }</p>
                                        <span>2.2km</span>
                                    </div>
                                    {
                                        !this.props.movieSearchCinema && cinema.tags.length > 1 &&
                                        <ul className="cinema-tag">
                                            {
                                                cinema.tags.map((tag,index)=>{
                                                    return (
                                                        <li key={index}>{ tag }</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    }
                                    {
                                        this.state.cinemaActivity.length &&
                                        <ul className="cinema-activity">
                                            {
                                                this.state.cinemaActivity.map((item,index)=>{
                                                    return (
                                                        <li key={index}>
                                                            <i style={{background: item.type==='1' ? '#FAAF00' : '#3C9FE6'}}>{ item.title }</i>
                                                            <span>{ item.desc }</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default CinemaList