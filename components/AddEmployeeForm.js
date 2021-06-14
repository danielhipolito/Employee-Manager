import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';

const AddEmployeeForm = props => {
    const [employee, setEmployee] = useState(props.default?props.default:{});
    let employeeDefaultName = props.default.name;
    const handleEmployee = e => {
        setEmployee({...employee,[e.target.name]:e.target.value});
    };

    const sendEmployee = e => {
        let employeeData = employee;
        if(!employeeData.area) {
            employeeData.area = "Finanzas";
        }
        if(!employeeDefaultName)
            employee.id = uuidv4();
        e.preventDefault();
        props.onSubmit(employeeData);
        setEmployee({});
    };

    return  <form onSubmit={sendEmployee}>
        <div className="row">
            <div className ="col-lg-12">
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input className="form-control"type="text" onChange={handleEmployee} 
                        required name="name"  id="name" value={employee.name} maxlength="40"
                        minLength="10"/>
                </div>   
            </div>
            <div className ="col-lg-12">
                <div className="form-group">
                    <label htmlFor="company">Empresa:</label>
                    <input className="form-control"type="text" onChange={handleEmployee} 
                        required name="company"  id="company" value={employee.company} maxlength="40"
                        minLength="2" disabled = {employeeDefaultName?true:false}/>
                </div>   
            </div>
            <div className ="col-lg-6">
                <label htmlFor="area">Area:</label>
                <select name="area" id="area" onChange={handleEmployee}
                    className="form-control" 
                    defaultValue = {employee.area} >
                    <option value={"Finanzas"} key={"0"}>
                        Finanzas
                    </option>
                    <option value={"Desarrollo"} key={"1"}>
                        Desarrollo
                    </option>
                    <option value={"Capital Humano"} key={"2"}>
                        Capital Humano
                    </option>  
                </select>
            </div>
            <div className ="col-lg-6">
                <div className="form-group">
                    <label htmlFor="salary">Salario:</label>
                    <input name ="salary" type="number" min="100" max="100000" className = "form-control"
                        id ="salary" value = {employee.salary} onChange = {handleEmployee} step={"any"}
                        required/>
                </div>
            </div>
        </div>
        <button className="btn btn-primary btn-block" type="submit">
            {employeeDefaultName?'Actualizar':'Agregar'}
        </button>
    </form>
};

export default AddEmployeeForm;