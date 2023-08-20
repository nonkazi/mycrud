import React from "react";


const EmpList = ({ employee }) => {
    return(
        <>
            {employee.map((emp, index) => {
                <div key={index}>
                <h3>{emp.name}</h3>
                <p>{emp.job}</p>
                </div>
               
            })}

        </>
    )

}

export default EmpList;