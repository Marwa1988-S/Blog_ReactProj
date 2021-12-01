import {BASIS_URL} from '../assets/base_url'
import { INIT_USERS, INIT_CATS, INIT_BLOGS, SET_CAT, SET_LOGIN, ADD_BLOG, ADD_CAT} from './types'
import axios from 'axios'

const initState = {
    users: [],
    kategorien: [],
    blogs: [],
    selectedCat: -1,
    loggedIn: false, 
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case INIT_USERS: 
            return {
                ...state,
                users: action.payload
            }
       
        case INIT_CATS: 
            return {
                ...state,
                kategorien: action.payload
            }  
        case INIT_BLOGS: 
            return {
                ...state,
                blogs: action.payload
            } 
        case SET_CAT: 
            return {
                ...state,
                selectedCat: action.payload
            } 
        case SET_LOGIN:
            return {
                ...state,
                loggedIn: action.payload
            }
        case ADD_BLOG:
            return {
                ...state,
                blogs: [...state.blogs, action.payload]
            }
        case ADD_CAT:
            return {
                ...state,
                kategorien: [...state.kategorien, action.payload]
            }
        default:
            return state
    }

}

export default reducer
