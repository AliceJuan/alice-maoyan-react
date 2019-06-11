import { connect } from 'react-redux'
import { saveSeatInfo } from "../redux/action"
import ChooseSeat from '../components/chooseSeat/chooseSeat'

const mapStateToProps = (state) => ({
  	film: state.film,
  	cinema: state.cinema,
  	video: state.video
})

const mapDispatchToProps = (dispatch) => ({
	saveSeatInfo: (seat) => {
		dispatch(saveSeatInfo(seat));
	}
});

export default connect(mapStateToProps,mapDispatchToProps)(ChooseSeat)
