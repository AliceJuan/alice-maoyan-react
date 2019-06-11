import { combineReducers } from 'redux'
import * as types from "./actionTypes"
import * as localStorage from "../utils/localStorage"

//需要存储的初始状态数据
const initialState = {
	city: {'cname': '北京'},
	film: {
		filmId: '',
		filmName: ''
	},
	cinema: {
		cinemaId: '',
		cinemaName: ''
	},
	video: {},
	seat: [],
	place: '/msite',
	user: {}
};

//拆分Reducer
function place(place = initialState.place, action) {
	switch (action.type) {
	  case types.CHANGE_PLACE:
			return action.place;
		default:
			return place;
	}
}

function city(city = initialState.city, action) {
	switch (action.type) {
		case types.UPDATE_CITY:
			localStorage.setStore(action.city);
			return action.city;
		default:
			return city;
	}
}

function film(film = initialState.film, action){
	switch (action.type) {
		case types.SAVE_FILM_INFO:
			return action.filmInfo;
		case types.CHANGE_FILM_INFO:
			return action.filmInfo;
		default:
			return film;
	}
}

function cinema(cinema = initialState.cinema, action){
	switch (action.type) {
		case types.SAVE_CINEMA_INFO:
			return action.cinemaInfo;
		default:
			return cinema;
	}
}

function video(video = initialState.video, action){
	switch (action.type) {
		case types.SAVE_VIDEO_TIME:
			return action.time;
		default:
			return video;
	}
}

function seat(seat=initialState.seat, action){
	switch (action.type) {
//		case types.ADD_SEAT:
//			return action.seatInfo;
//		case types.DELETE_SEAT:
//			return action.seatInfo;
		case types.SAVE_SEAT:
			return action.seat;
		default:
			return seat;
	}
}


//修改当前歌曲
//function song(song = initialState.song, action) {
//switch (action.type) {
//  case ActionTypes.CHANGE_SONG:
//    localStorage.setCurrentSong(action.song);
//    return action.song;
//  default:
//    return song;
//}
//}

//添加或移除歌曲
//function songs(songs = initialState.songs, action) {
//switch (action.type) {
//  case ActionTypes.SET_SONGS:
//    localStorage.setSongs(action.songs);
//    return action.songs;
//  case ActionTypes.REMOVE_SONG_FROM_LIST:
//    let newSongs = songs.filter(song => song.id !== action.id);
//    localStorage.setSongs(newSongs);
//    return newSongs;
//  default:
//    return songs;
//}
//}


//合并Reducer
const reducer = combineReducers({
	place,
	city,
	film,
	cinema,
	video,
	seat
});

export default reducer