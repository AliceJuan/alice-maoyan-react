import { connect } from 'react-redux'
import { saveCinemaInfo, saveFilmInfo, saveVideoTime } from "../redux/action"
import CinemaDetail from '../components/cinemaDetail/cinemaDetail'

const mapStateToProps = (state) => ({
  	film: state.film
})

const mapDispatchToProps = (dispatch) => ({
	saveCinemaInfo: (cinemaInfo) => {
		dispatch(saveCinemaInfo(cinemaInfo));
	},
	saveFilmInfo: (filmInfo) => {
		dispatch(saveFilmInfo(filmInfo));
	},
	saveVideoTime: (time) => {
		dispatch(saveVideoTime(time))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(CinemaDetail)
