import { connect } from 'react-redux'
import { updateCity } from "../redux/action"
import City from '../components/city/city'

const mapStateToProps = (state) => ({
  	city: state.city
})

const mapDispatchToProps = (dispatch) => ({
	updateCity: (city) => {
		dispatch(updateCity(city));
	}
});

export default connect(mapStateToProps,mapDispatchToProps)(City)
