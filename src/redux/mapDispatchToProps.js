import {BASIS_URL} from '../assets/base_url'
import { INIT_USERS, INIT_CATS, INIT_BLOGS, SET_CAT, SET_LOGIN, ADD_BLOG, ADD_CAT} from './types'
import axios from 'axios'

const mapDispatchToProps = (dispatch) => {
    return {
        //load Users
        initUsers: () => {  dispatch(() => {
            axios.get(`${BASIS_URL}users`)
                .then((response) => {
                    dispatch( {type: INIT_USERS, payload: response.data} )
                })
        })},
        
        //load Categoies
        initCategoies: () => { dispatch(() =>{
            axios.get(`${BASIS_URL}categories`)
                .then((response) => {
                    dispatch( {type: INIT_CATS, payload: response.data} )
                })

        })},

        //load Blogs
        initBlogs: () => { dispatch(() =>{
            axios.get(`${BASIS_URL}blogs`)
                .then((response) => {
                    dispatch( {type: INIT_BLOGS, payload: response.data} )
                })

        })},

        //set selected-Category
        setSelectedCategory: (id) => { dispatch({type:SET_CAT, payload:id})},

        setLogin: (bool) => { dispatch({type:SET_LOGIN, payload:bool})},

        addNewBlog: (blog) =>{ dispatch(() =>{
            axios.post(`${BASIS_URL}blogs`,blog)
                .then((response) => {
                    dispatch( {type: ADD_BLOG, payload: response.data} )
                })

        })},

        addNewCat: (cat) => { dispatch(() =>{
            axios.post(`${BASIS_URL}categories`,cat)
                .then((response) => {
                    dispatch( {type: ADD_CAT, payload: response.data} )
                })

        })}

    }
}

export default mapDispatchToProps