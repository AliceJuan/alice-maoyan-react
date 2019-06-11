import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import "./footGuide.scss";
import { changePlace } from '../../redux/action'
import { connect } from 'react-redux'

class footGuide extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      	selectedType: this.props.history.location.pathname,
            tabData: [{title: '电影', path: '/msite', icon: 'msite-icon', selectedIcon: 'selected-msite-icon'},
                      {title: '影院', path: '/cinema', icon: 'cinema-icon', selectedIcon: 'selected-cinema-icon'},
                      {title: '我的', path: '/user', icon: 'user-icon', selectedIcon: 'selected-user-icon'}]
	    }
	}
	gotoAddress = (path) => {
		this.props.changePlace(path)
 		this.props.history.push(path)
	}
	render() {
		let selectedType = this.state.selectedType;
		let tabData = this.state.tabData.map((item) => {
			let iconClass = selectedType === item.path ? item.selectedIcon : item.icon;
		    let titleClass = selectedType === item.path ? 'selected-title' : '';
	      	return (
		        <div key={item.path} onClick={()=>this.gotoAddress(item.path)} className="guide-item">
		            <span className={iconClass}></span>
		            <span className={titleClass}>{ item.title }</span>
		        </div>
	      	);
	    });
	    return (
	      	<div id="foot-guide">{tabData}</div>
	    );
	}
}

export default connect(state => ({
	
}), {
	changePlace
})(withRouter(footGuide))