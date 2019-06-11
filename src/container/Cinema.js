import { connect } from 'react-redux'
// import { updateCity } from "../redux/action"
import Cinema from '../components/cinema/cinema'

const mapStateToProps = (state) => ({
    place: state.place,
    film: state.film
})

// const mapDispatchToProps = (dispatch) => ({
// 	updateCity: (city) => {
// 		dispatch(updateCity(city));
// 	}
// });

export default connect(mapStateToProps)(Cinema)
