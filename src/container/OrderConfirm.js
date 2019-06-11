import { connect } from 'react-redux'
// import { updateCity } from "../redux/action"
import OrderConfirm from '../components/orderConfirm/orderConfirm'

const mapStateToProps = (state) => ({
    film: state.film,
    cinema: state.cinema,
    video: state.video,
    seat: state.seat  
})

// const mapDispatchToProps = (dispatch) => ({
	
// });

export default connect(mapStateToProps)(OrderConfirm)
