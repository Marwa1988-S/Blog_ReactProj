import './App.css';
import { connect } from 'react-redux';
import mapStateToProps from './redux/mapStateToProps';
import mapDispatchToProps from './redux/mapDispatchToProps';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, NavLink, Link } from 'react-router-dom';
import BlogListe from './components/BlogListe';
import User from './components/User';
import Category from './components/Category';
import AddBlog  from './components/AddBlog';
import Button from '@material-ui/core/Button';
import ShowAllBlog from './components/ShowAllBlog';
function App(props) {

   /*******************
  * Initialisierung
  ********************/
  useEffect(() => {
    props.initUsers(); console.log(props.users)
    props.initCategoies();
    props.initBlogs();
  },[])


  return (
    <BrowserRouter>
      <div id ="container">
        <header>
          <Link to="/" exact><h1 className="fleft">Blog</h1></Link>
          <Route path="/" component={User} /> 
        </header>
       
        {JSON.parse(localStorage.getItem("loggedInUser"))  !== null && <h4> Aktiver Benutzer: {JSON.parse(localStorage.getItem("loggedInUser")).username }</h4> }
        <Route path="/"exact component={ShowAllBlog} />
        
        
        <main>
       
          <Route path="/add_new_blog" exact component={AddBlog} />
          <Route path="/"exact component={BlogListe} />
          <Route path="/"exact component={Category} />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
