import firebase from 'firebase'

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILED'

function loginRequest() {
    return {
        type: LOGIN_REQUEST
    }
}

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

function loginFailed(error) {
    return {
        type: LOGIN_FAILED,
        payload:error
    }
}

//thunk
export function login(email, password) {
    return (dispatch) => {
        dispatch(loginRequest());

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            dispatch(loginSuccess());
        })
        .catch((error)=> {
            console.log(error);
            dispatch(loginFailed(error));
          });
      
    }

    //api call

    //sucess -> dispatch(loginRequest())
    //failed -> dispatch(loginFailed())

}

const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    error:null,
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
                error:null,
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
            })
        case LOGIN_FAILED:
            const error = action.payload;
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error:error,
            })

        default:
            return state;
    }

}