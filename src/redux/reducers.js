import { combineReducers } from 'redux'
import * as types from "./actionTypes"
import * as localStorage from "../utils/localStorage"

//需要存储的初始状态数据
const initialState = {
	city: localStorage.getStore('city') || {'cname': '北京'},
	film: {
		filmId: localStorage.getStore('filmInfo').filmId,
		filmName: localStorage.getStore('filmInfo').filmName
	},
	cinema: {
		cinemaId: localStorage.getStore('cinemaInfo').cinemaId,
		cinemaName: localStorage.getStore('cinemaInfo').cinemaName
	},
	video: localStorage.getStore('video') || {},
	seat: localStorage.getStore('seat') || [],
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
			localStorage.setStore('city', action.city);
			return action.city;
		default:
			return city;
	}
}

function film(film = initialState.film, action){
	switch (action.type) {
		case types.SAVE_FILM_INFO:
			localStorage.setStore('filmInfo', action.filmInfo);
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
			localStorage.setStore('cinemaInfo', action.cinemaInfo);
			return action.cinemaInfo;
		default:
			return cinema;
	}
}

function video(video = initialState.video, action){
	switch (action.type) {
		case types.SAVE_VIDEO_TIME:
			localStorage.setStore('video', action.time);
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
			localStorage.setStore('seat', action.seat);
			return action.seat;
		default:
			return seat;
	}
}

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