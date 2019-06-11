import React, {Component} from 'react'
import "./headTop.scss";

class HeadTop extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      	
	    }
	}
	goBackEvent() {
    	window.history.back();
	}
	render() {
	    return (
	      	<div>
	      		<header className="head-top">
			        { this.props.goBack && <span onClick={this.goBackEvent} className="head-top-back left"></span> }
			        <span className="head-top-text">{ this.props.headTitle }</span>
			    </header>
	      	</div>
	    );
	}
}

export default HeadTop