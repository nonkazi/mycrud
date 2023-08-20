import React, { useState } from "react"; 
import { Link } from "react-router-dom";

const AddEmployee =({onAdd}) => {

    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
  
    
    const onSubmit = (e) => {
        e.preventDefault()
        if(!name){
            alert('Please insert Full Names')
            return
        }

        onAdd({ name, job, profilePicture})
        setName("")
        setJob("")
        setProfilePicture(null)
    }
  
      
    
    return(
    <form className="add-form" onSubmit={onSubmit}>
         <Link to="/" className="back-arrow">← Back</Link>

         
        <div className="avatar-container">
          {profilePicture ? (
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile"
              className="avatar"
            />
          ) : (
            <div className="avatar-placeholder">
              <span>Avatar</span>
            </div>
          )}
          </div>
          <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
      
        <div className="form-control">
       
            <input type="text" placeholder="Full Names"
            value={name}
            onChange={(e) => setName(e.target.value)}/>
            
        </div>
        <div className="form-control">
            
            <input type="text" placeholder="Job Title"
            value={job}
            onChange={(e) => setJob(e.target.value)}/>
        </div>

        <input className="add-Button" type="submit" value="ADD MEMBER"/>
    </form>
    );
};

export default AddEmployee;

