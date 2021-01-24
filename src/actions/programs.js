import { FETCH_PROGRAMS, TOGGLE_LOADER } from '../actionTypes';

export const fetchPrograms = ({url}) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_LOADER,
            loader: true
        })
        fetch(url)
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: TOGGLE_LOADER,
                loader: false
            })
            dispatch({
                type: FETCH_PROGRAMS,
                programs: data
            })
        })
    }
}
