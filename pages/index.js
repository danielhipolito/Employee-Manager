import Layout from "../components/Layout";
import ResponsiveTable from "../components/ResponsiveTable";
import AddEmployeeForm from "../components/AddEmployeeForm";
import BasicModal from "../components/BasicModal";
import {useState, useEffect} from "react";
import { faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { AddEmployee } from "../stories/AddEmployeeForm.stories";

const Index = () => {
    const [showHandleEmployee, setShowHandleEmployee] = useState(false);
    const [currencyConfig, setCurrencyConfig] = useState({currency:"MXN",languague:"mx-MX"});
    const [employees, setEmployees] = useState([]);
    const [employeeToEdit, setEmployeeToEdit] = useState({});

    let headValues = ["Empleado","Nombre","Empresa","Área","Salario Mensual","Imagen","Acciones"];
    let bodyValues = [];
    let options1 = { style: 'currency', currency: currencyConfig.currency };
    let numberFormat1 = new Intl.NumberFormat(currencyConfig.languague, options1);
    // const options1 = { style: 'currency', currency: 'USD' };
    // const numberFormat1 = new Intl.NumberFormat('us-US', options1);

    if(!employees || employees.length == 0) {
        bodyValues.push(<tr>
            <td colspan="100"> No hay empleados </td>
        </tr>);
    }
    else {
        employees.forEach(employee => {  
            let salary = numberFormat1.format(employee.salary); 
            if(currencyConfig.currency == "USD" ) 
            salary =`${(parseFloat(employee.salary)/21.50).toFixed(2)} USD`;

            bodyValues.push(<tr key = {"s"}>
                <td className = "text-primary"> {employee.id ?
                    employee.id.substring(0,5)
                :'N/A'} </td>    
                <td> {employee.name} </td>
                <td> {employee.company} </td>
                <td> {employee.area} </td>
                <td> {salary}</td>
                <td> </td>
                <td> <a href = "#" onClick = {() => editEmployee(employee)}>
                    <FontAwesomeIcon icon={faEdit} className={"fa-lg text-primary"} /> 
                    </a></td>
            </tr>);   
        }); 
    }

    const getEmployees = () => {
        let storedEmployees = JSON.parse(localStorage.getItem("employees"));
        if(!storedEmployees)
            storedEmployees = [];
        setEmployees(storedEmployees);
    };

    useEffect(() => {
        getEmployees();
    } , []);
    const addEmployee = () => {
        setEmployeeToEdit({});
        setShowHandleEmployee(true);
    };

    const findEmployee = (employees,employeeId) => {
        let foundEmployeeIdx = null;
        for(let i = 0; i < employees.length; i++) 
            if (employeeId == employees[i].id) {
                foundEmployeeIdx = i;
                break;
            }
        return foundEmployeeIdx;
    }; 

    const handleEmployee = employee => {
        let employeeData = employees;
        let foundEmployeeIdx = findEmployee(employees,employee.id);
        if(foundEmployeeIdx) {
            employeeData[foundEmployeeIdx] = employee;
            localStorage.setItem("employees", JSON.stringify(employeeData));
        }
        else {
            localStorage.setItem("employees", JSON.stringify([...employees,employee]));
        }
        getEmployees();
        setShowHandleEmployee(false);
        
    };

    const toUsdCurrency = () => {
        setCurrencyConfig({currency:'USD', languague:'en-US'});
    };
    const toMxnCurrency = () => {
        setCurrencyConfig({currency:'MXN', languague:'mx-MX'});
    };

    const editEmployee = employee => {
        setEmployeeToEdit(employee);
        setShowHandleEmployee(true);
    };
   
    return <Layout>
        <BasicModal show ={showHandleEmployee} onClose ={()=>setShowHandleEmployee(false)} 
            title = "Agregar Empleado"  type="form">
            <AddEmployeeForm onSubmit = {handleEmployee} default = {employeeToEdit}/>
            {/* <AddEmployeeForm default={{name:"Daniel",company:"indava",salary:33,area:2}}/> */}
        </BasicModal>  
        <h1 className="h4 font-weight-bold pt-5 mb-4 text-gray-800"> Administrador de empleados </h1>
        <div className ="row d-flex justify-content-center">
            <div className = "col-lg-10">
                <div className = "row">
                    <div className ="col-lg-12">
                        <div className = "row d-flex align-items-center">
                            <div className ="col-lg-4 text-center">
                                <b className ="text-secondary">Total de empleados</b>
                                <p className="text-danger"> {employees ?employees.length
                                    :''} </p>
                            </div>
                            <div className ="col-lg-4 text-center">
                                <b className ="text-secondary">Divisa de salario</b>
                                <p className="text-danger"> {`${currencyConfig.currency}`} </p>
                            </div>
                            <div className ="col-lg-4 text-right mb-3">
                                <b className ="mr-5 text-secondary">Seleccionar</b>
                                <div className ="mt-1 mr-4">
                                    <button onClick = {toUsdCurrency} 
                                        className ={`mr-2 btn ${currencyConfig.currency == "USD" 
                                        ?'btn-primary':''}`}>
                                        USD
                                    </button>
                                    <button onClick = {toMxnCurrency} 
                                        className ={`mr-2 btn ${currencyConfig.currency == "MXN" 
                                        ?'btn-primary':''}`}>
                                        MXN
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6"/>
                    <div className = "col-lg-6 text-right">
                        <button className ="btn btn-primary mr-3" onClick = {addEmployee}>
                            + Agregar Empleado
                        </button>
                    </div>
                </div>
                <div className = "col-lg-12 mt-2">
                    <ResponsiveTable headers = {headValues} body = {bodyValues} /> 
                </div>
            </div>
           
        </div>
        {/* <ResponsiveTable headers = {headValues} body = {[bodyValues]} />  */}
    </Layout>
};

export default Index;