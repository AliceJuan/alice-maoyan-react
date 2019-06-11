import * as types from "./actionTypes"

export const changePlace = place => ({
  type: types.CHANGE_PLACE,
  place
})

export const updateCity = city => ({
  type: types.UPDATE_CITY,
  city
})

export const saveFilmInfo = filmInfo => ({
  type: types.SAVE_FILM_INFO,
  filmInfo
})

export const saveCinemaInfo = cinemaInfo => ({
  type: types.SAVE_CINEMA_INFO,
  cinemaInfo
})

export const saveVideoTime = time => ({
  type: types.SAVE_VIDEO_TIME,
  time
})

export const saveSeatInfo = seat => ({
  type: types.SAVE_SEAT,
  seat
})



/*export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}*/