import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../redux/mapStateToProps';
import mapDispatchToProps from '../redux/mapDispatchToProps';
import Button from '@material-ui/core/Button';
function BlogListe(props) {
    return (
       
        <div  id="allBlogs">
            
            {
               props.blogs.map((ele,index) =>{
                   let article = <article key={ele.id}>
                                    {/* <Button onClick={() => {props.setSelectedCategory(ele.id)}}  color="primary" size="small">{ele.name}</Button>  */}
                                    <p className="author">{props.users.find((value) =>{return value.id == ele.user_id}).username} schrieb am {ele.date}</p>
                                    <h3>{ele.title}</h3><h5>Kategorie: { props.kategorien.find((cat) => {return cat.id ==  ele.cat}).name}</h5>
                                    <p>
                                        {
                                        ele.image &&<img rel="apple-touch-icon" src={"/blog_react/"+ele.image} className="fright"/>
                                        } 
                                        {
                                            ele.content.replace(/\\n|\\r\\n|\\n\\r|\\r/g, '<br>')
                                         
                                        } 
                                    </p>
                                    <div class='clearer'></div>
                                </article>
                    
                    return (  
                        // Alle Blogs zeigen
                        props.selectedCat== -1 ?
                        article :
                        //Nur Blogs mit der gleiche Kategorie-id
                        props.selectedCat == ele.cat &&
                        article 
                        
                    );
               })
            } 
           
            {   props.blogs.find((ele) =>{return ele.cat == props.selectedCat}) == null  && props.selectedCat!= -1 && 
                <p>Keine Eintäge</p>
            }
        </div>
        
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (BlogListe);