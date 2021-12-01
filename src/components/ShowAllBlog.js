import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../redux/mapStateToProps';
import mapDispatchToProps from '../redux/mapDispatchToProps';
import Button from '@material-ui/core/Button';
import { BrowserRouter, Route, NavLink, Link } from 'react-router-dom';
function ShowAllBlog(props) {
    return (
        <div id="blog_buttons">
         <Button onClick={() => {props.setSelectedCategory(-1)}} variant="outlined" color="primary" size="small">Alle Blogs anzeigen</Button>   
         {
          JSON.parse(localStorage.getItem("loggedInUser"))  !== null &&
          <Link to="/add_new_blog" exact className="fright">Schreib dein Blog</Link>
         } 
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (ShowAllBlog);