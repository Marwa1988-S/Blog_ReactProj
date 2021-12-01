import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../redux/mapStateToProps';
import mapDispatchToProps from '../redux/mapDispatchToProps';
import Button from '@material-ui/core/Button';
import { TextareaAutosize } from '@material-ui/core';
function AddBlog(props) {
    
    // Formular Blog Anlegen
    const [newBlogForm, setNewBlogForm] = useState({
        title: "",
        content: "",
        image: "",
        cat: "",
        error: true
    })

    // Formular Kategorie Hinzufügen
    const [catName,setCatName] = useState("")

    useEffect(() => {
       console.log("Test")
       setNewBlogForm((prevState) => {
            return {
                ...prevState,
                // error ist true wenn einer der Formulardaten(title, content, cat) nicht ausgefüllt ist,dann der Button ist disabled
                error: Object.values(prevState).find((value) =>{return value.length === 0 || value=="-1"}) == undefined ? false:true
            }
        })
    }, [newBlogForm.title,newBlogForm.content, newBlogForm.cat])
      
    function enterBlogData(event) {
        setNewBlogForm((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }
    
    function saveBlog(){
        const date = new Date()
        const blogDate= date.getDate()+"-"+ (date.getMonth()+1) +"-"+ date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()
        
        const obj = {
            "title": newBlogForm.title,
            "content":  newBlogForm.content,
            "image": newBlogForm.image,
            "date": blogDate,
            "cat": Number(newBlogForm.cat),
            "user_id": JSON.parse(localStorage.getItem("loggedInUser")).id
        }
        props.addNewBlog(obj)
        //console.log(Object.values(obj))
        setNewBlogForm(() =>{
            return {
                title: "",
                content: "",
                image: "",
                cat: "",
                error: true
            }
        })

    }
    
    function enterCategoryName(event) {
        setCatName( event.target.value)
    }
    function saveCat(){
      if(props.kategorien.find((value) =>{ return value.name==catName})== null) 
      {
          const catObj = {"name":catName}
          props.addNewCat(catObj)
          setCatName("")
      }
      else
        console.log("schon existiert")
    }
    //------------------------------
    // Input-Ref
    const imgPathInput = useRef()
    
    function upload(e){
        const url = 'blog_react/process.php'
        e.preventDefault()

        const files = document.querySelector('[type=file]').files
        const formData = new FormData()
        const randomPrefix = Math.random().toString(36).substr(2, 20);
        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            

            formData.append('files[]', file)
            
            
            console.log(randomPrefix+"_"+files[i].name)
            formData.append('prefix',randomPrefix)
        }
        
        fetch(url, {
            method: 'POST',
            body: formData,
        }).then((response) => {
            console.log(response)
          //  console.log(response.arrayBuffer)
            setNewBlogForm((prevState) => {
                return {
                    ...prevState,
                    image:'uploads/'+randomPrefix+"_"+files[0].name
                }
        })
        })
        
    }
    return (
        <>
           
            {/* <div id="container"> */}
                <div id="newBlog">
                    <h2>Neuen Blog-Eintrag verfassen</h2>
                    <form method="post" enctype="multipart/form-data">
                        <input type="file" name="files[]" multiple />
                        <input onClick={upload} type="submit" value="Upload File" name="submit" />
                     </form>

                    <form>
                       
                        <select  name="cat" value ={newBlogForm.cat} onChange={enterBlogData}>
                                <option value="-1" style={{color: "#87889a"}}>Bitte kategorie wählen</option>
                                {
                                    props.kategorien.map((value, index) => {
                                        return <option value={value.id}>{value.name}</option>
                                    })
                                }
                        </select><br/>
                        
                        <input type="text" name="title" placeholder="Überschrift" value ={newBlogForm.title} onChange={enterBlogData}/><br/>
                        <TextareaAutosize name="content" value ={newBlogForm.content}
                                        rowsMin={15} aria-label="maximum height"
                                        placeholder="Text..."
                                        defaultValue="" onChange={enterBlogData}/><br/>
                        
                        <Button disabled={newBlogForm.error} onClick={saveBlog} variant="contained" color="primary" component="span">
                            Veröffentlichen
                        </Button><br/>
                    
                    </form>
                    

        
                   

                </div>
                <div id="newCat">
                    <form>
                        <h2>Neue Kategorie hinzufügen</h2>
                        <input type="text" name="catName" placeholder="Name der Kategorie" value ={catName} onChange={enterCategoryName}/><br/>
                        <Button disabled={catName===""?true:false} onClick={saveCat} variant="contained" color="primary" component="span">
                                Veröffentlichen
                        </Button><br/>
                    </form><br/>
                    <p>{}</p>             
                </div>
            {/* </div> */}
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (AddBlog);