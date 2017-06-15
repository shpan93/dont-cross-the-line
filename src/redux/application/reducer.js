import initialState from './initialState';
export default (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case 'SET_SOCKET': {
            newState.socket = action.payload;
        }
    }

    return newState;
}