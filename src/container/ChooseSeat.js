import { connect } from 'react-redux'
import { saveSeatInfo, addSeat } from "../redux/action"
import ChooseSeat from '../components/chooseSeat/chooseSeat'

const mapStateToProps = (state) => ({
  	film: state.film,
  	cinema: state.cinema,
  	video: state.video
})

const mapDispatchToProps = (dispatch) => ({
	saveSeatInfo: (seat) => {
		dispatch(saveSeatInfo(seat));
	},
	addSeat: (seat) => {
		dispatch(addSeat(seat))
	}
});

export default connect(mapStateToProps,mapDispatchToProps)(ChooseSeat)
