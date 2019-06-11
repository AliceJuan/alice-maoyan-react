import { connect } from 'react-redux'
import { saveFilmInfo } from "../redux/action"
import Film from '../components/film/film'

//const mapStateToProps = (state) => ({
//	city: state.city
//})

const mapDispatchToProps = (dispatch) => ({
	saveFilmInfo: (filmInfo) => {
		dispatch(saveFilmInfo(filmInfo));
	}
});

export default connect(null, mapDispatchToProps)(Film)
