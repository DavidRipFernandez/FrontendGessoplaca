




export function UserReducer(initialState,action){
    
    if(action.type='login'){
        return { 
            ...initialState, 
            user:action.payload,
            isLogged: true 
        }
    }
    if(action.type == 'logout'){
        return {
            ...initialState,
            user: null,
            isLogged: false
        }
    }


    return initialState;
}