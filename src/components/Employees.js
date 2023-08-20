import React from 'react';
import { Link } from 'react-router-dom';
import './Employees.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Employees = ({ employee, onDeleteEmployee }) => {
  return (
    <>
       <Link to="/add" className="addButton">
        ADD Member
      </Link>
      {employee.length === 0 ? (
        <h3 className="noData-paragraph">No data available</h3>
      ) : (
        employee.map((emp, index) => (
          
          <div className="employee-container" key={index}>
           <div className="profile-picture">
              <img src={emp.profilePicture} alt={`${emp.name} Profile`} />
            </div>
            <div className="employee-content">
              <h3>{emp.name}</h3>
              <p>{emp.job}</p>
            </div>
            <div className="employee-icons">
            <Link to={`/edit/${emp.id}`} className="edit-icon">
                <FontAwesomeIcon icon={faEdit} />
           </Link>
              <FontAwesomeIcon
                icon={faTrash}
                className="delete-icon"
                onClick={() => onDeleteEmployee(emp.id)} // Call the delete function
              />
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Employees;
