import * as API from "../api/api";

export const GET_TABLE = "GET_TABLE"
export const SAVE_TABLE = "SAVE_TABLE"
export const _SUCCESS = "_SUCCESS"
export const _PENDING = "_PENDING"
export const _REJECTED = "_REJECTED"

export const getTable = () => ({
    type: GET_TABLE,
    payload: API.get('/table')
})

export const saveTable = (data) => dispatch => {
    dispatch(({
        type: SAVE_TABLE + _PENDING,
        payload: []
    }))
    API.post('/table', data).then(response => {
        dispatch(({
            type: SAVE_TABLE + _SUCCESS,
            payload: response
        }))
        dispatch(getTable())
    }).catch(err => {

        dispatch(({
            type: SAVE_TABLE + _REJECTED,
            payload: []
        }))

    })

}