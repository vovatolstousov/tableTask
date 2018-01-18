import {GET_TABLE} from "../actions/table.action";

const initialState = {
    token: null,
    loading: false,
    errors: [],
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_TABLE + "_PENDING":
            return {
                ...state,
                loading: true,
            }

        case GET_TABLE + "_FULFILLED":
            return {
                ...state,
                data: payload.data,
                columns: payload.columns,
                loading: false
            }

        case GET_TABLE + "_REJECTED":
            return {
                ...state,
                errors: payload,
                loading: false
            }


        default: {
            return state;
        }
    }
};