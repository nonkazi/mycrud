import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EditEmployee = ({ onUpdate }) => {
  const navigate = useNavigate(); // Use useNavigate hook
  const { id } = useParams();

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/employee/${id}`);
        
        const data = await response.json();
      
        setName(data.name);
        setJob(data.job);
        setProfilePicture(data.profilePicture)
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployeeData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEmployee = {
      name: name,
      job: job,
      profilePicture: profilePicture
    };

    
    onUpdate(id, updatedEmployee);

    navigate("/"); 
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <Link to="/" className="back-arrow">← Back</Link>
      <div className="avatar-container">
          {profilePicture ? (
            <img
            src={URL.createObjectURL(new Blob([profilePicture]))}
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
        <input
          type="text"
          placeholder="Full Names"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Job Title"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
      </div>
      <input className="edit-Button" type="submit" value="EDIT MEMBER" />
    </form>
  );
};

export default EditEmployee;
