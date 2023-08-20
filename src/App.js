import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Employees from './components/Employees';
import AddEmployee from './components/AddEmployees';
import EditEmployee from './components/EditEmployee';

const App = () => {

  const [employee, setEmployee] = useState([]);
  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:5000/employee');
      const data = await res.json();
      setEmployee(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    

    fetchEmployees();
  }, []);





  const deleteEmployee = async (id) =>{
    await fetch(`http://localhost:5000/employee/${id}`,{
      method: 'DELETE',
    })
    setEmployee(employee.filter((emp) => emp.id !== id))
    
  }
 
  
  
  

  const addEmployee = async (emp) => {

    const res = await fetch('http://localhost:5000/employee', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify(emp)
    })
    
    const data  =await res.json()

    setEmployee([...employee, data])
    
  

  }
  

  const updateEmployee = async (id, updatedEmployee) => {
    try {
      const response = await fetch(`http://localhost:5000/employee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEmployee)
      });
  
      if (response.ok) {
        console.log('Employee updated successfully');
        const updatedEmployeeList = employee.map(emp => {
          if (emp.id === id) {
            return { ...emp, ...updatedEmployee };
          }
          return emp;
        });
        
        setEmployee(updatedEmployeeList);

        fetchEmployees();
        console.error('Failed to update employee');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  


return(
  <Router>
  <div className="container">
    <Routes>
    <Route path="/" element={<Employees employee={employee} 
    onDeleteEmployee={deleteEmployee}
    />} />
    <Route path="/add" element={<AddEmployee onAdd={addEmployee} />} />
    <Route path="/edit/:id" element={<EditEmployee onUpdate={updateEmployee} />} />
    </Routes>
  </div>
</Router>
);
};


export default App;
