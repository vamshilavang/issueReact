const initialState = {
    saveEMenu: true,
    products: [],
    active: true
}

const requiredProvider = (state  = initialState,action)=>{
    debugger;
    switch (action.type){
        case "CREATE_VIEW":
            return action.payload
            break;
        case "UPDATE_VIEW":
            break;
    }
    return state;
}

export default requiredProvider