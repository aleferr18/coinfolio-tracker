import { createContext, useReducer, useState } from "react";

export const UserContext = createContext({
    isLoggedIn: false,
    localId: '',
    token: '',
    watchlist: [],
    changeIsLoggedIn: () => {},
    changeWatchlist: (newWatchlist) => {}
})

const userReducer = (state, action) => {

    if (action.type === 'Logout')
        return {isLoggedIn: false, token: '', localId: '', watchlist: []};

    if (action.type === 'NewToken')
        return {...state, isLoggedIn: true, token: action.token, localId: action.localId};   
        
    if (action.type === 'watchlist')
        return {...state, watchlist: action.data};
}

const UserContextProvider = (props) => {

    const initialToken = (typeof window !== 'undefined') ? localStorage.getItem('token') : null;
    const initialLocalId = (typeof window !== 'undefined') ? localStorage.getItem('localId') : null;
      
    
    const [token, setToken] = useState(initialToken);
    const [localId, setLocalId] = useState(initialLocalId);
    const [watchlist, setWatchlist] = useState([]);
    const userIsLoggedIn = !!token;

    const [userState, dispatchUserAction] = useReducer(userReducer, {
        isLoggedIn: userIsLoggedIn,
        localId: localId,
        token: token,
        watchlist: watchlist
    });

    const changeIsLoggedIn = (action) => {

        dispatchUserAction(action);

        if (action.type !== "Logout"){
            setToken(action.token);
            localStorage.setItem('token', action.token)
            localStorage.setItem('localId', action.localId);
            setLocalId(action.localId);
        } else {
            setToken(null);
            setLocalId(null);
            localStorage.removeItem('token');
            setWatchlist([]);
        }
        
    }

    const changeWatchlist = (data) => {
        dispatchUserAction({type: 'watchlist', data: data});
        setWatchlist(data);
    }

    const userContext = {
        isLoggedIn: userState.isLoggedIn,
        localId: userState.localId,
        token: userState.token,
        watchlist: watchlist,
        changeIsLoggedIn: changeIsLoggedIn,
        changeWatchlist: changeWatchlist
    }

    return (
        <UserContext.Provider value={userContext}>{props.children}</UserContext.Provider>
    )
}

export default UserContextProvider;