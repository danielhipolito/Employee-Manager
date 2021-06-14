import Layout from "../components/Layout";
import ResponsiveTable from "../components/ResponsiveTable";
import AddEmployeeForm from "../components/AddEmployeeForm";
import VideoCamera from "../components/VideoCamera";
import BasicModal from "../components/BasicModal";
import {useState, useEffect} from "react";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Head from 'next/head';
import {ReactSearchAutocomplete}  from 'react-search-autocomplete';

const Index = () => {
    const [showHandleEmployee, setShowHandleEmployee] = useState(false);
    const [currencyConfig, setCurrencyConfig] = useState({currency:"MXN",languague:"mx-MX"});
    const [employees, setEmployees] = useState([]);
    const [searchedEmployees, setSearchedEmployees] = useState([]);
    const [employeeToEdit, setEmployeeToEdit] = useState({});
    const [showCaptureEmployee, setShowCaptureEmployee] = useState(false);
    // const [showCaptureEmployee, setShowCaptureEmployee] = useState(false);

    let headValues = ["Empleado","Nombre","Empresa","Área","Salario Mensual","Foto","Acciones"];
    let bodyValues = [];
    let options1 = { style: 'currency', currency: currencyConfig.currency };
    let numberFormat1 = new Intl.NumberFormat(currencyConfig.languague, options1);

    const setUpVideoCamera = employee => {
        setEmployeeToEdit(employee);
        setShowCaptureEmployee(true);
    };

    if(!employees || employees.length == 0) {
        bodyValues.push(<tr key ="dios">
            <td colspan="100"> No hay empleados </td>
        </tr>);
    }
    else {
        employees.forEach((employee,idx) => {  
            let salary = numberFormat1.format(employee.salary); 
            let salaryColor = "text-success";
            if (employee.salary > 10000)
                salaryColor ="text-danger";
            if(currencyConfig.currency == "USD" ) {
                salary =`${(parseFloat(employee.salary)/21.50).toFixed(2)} USD`;
            }
                
            bodyValues.push(<tr key = {idx} >
                <td className = "text-primary"> {employee.id ?
                    employee.id.substring(0,5)
                :'N/A'} </td>    
                <td> {employee.name} </td>
                <td> {employee.company} </td>
                <td> {employee.area} </td>
                <td className = {`${salaryColor} text-right salary`}> 
                    {salary}
                </td>
                <td> 
                    { !employee.photo 
                        ?   <a href = "#" onClick = {() => setUpVideoCamera(employee)} >
                                <FontAwesomeIcon icon={faPlus} className={"fa-lg text-info"} /> 
                            </a>
                        :   <img id = {employee.id} src = {`data:image/png;base64${employee.photo}`}
                                width = {30} height = {30}/>}
                </td>
                <td> <a href = "#" onClick = {() => editEmployee(employee)}>
                        <FontAwesomeIcon icon={faEdit} className={"fa-lg text-info"} /> 
                    </a>
                </td>
            </tr>);   
        }); 
    }

    const getEmployees = () => {
        let storedEmployees = JSON.parse(localStorage.getItem("employees"));
        let employeesAndCompanies = [];
        if(!storedEmployees)
            storedEmployees = [];
        storedEmployees.forEach(employee => {
            employeesAndCompanies.push({id:employee.id, name:`${employee.name} - ${employee.company}`});
        });
        setEmployees(storedEmployees);
        setSearchedEmployees(employeesAndCompanies)
    };

    useEffect(() => {
        getEmployees();
    } , []);

    const addEmployee = () => {
        setEmployeeToEdit({});
        setShowHandleEmployee(true);
    };

    const findEmployee = async employeeId => {
        let foundEmployeeData = null;
        for(let i = 0; i < employees.length; i++) {
            if (employeeId == employees[i].id) {
                foundEmployeeData = [await i, await employees[i]];
                break;
            }
        }
        return foundEmployeeData;
    }; 

    const handleEmployee = async employee => {
        let employeeData = employees;
        let foundEmployeeIdx = await findEmployee(employee.id);
        if(foundEmployeeIdx) {
            employeeData[foundEmployeeIdx[0]] = employee;
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
   
    const handleOnSearch =  async (searched, results) => {
        let searchedEmployeesList = results;
        if(searched.length == 1)
            searchedEmployeesList = searchedEmployees;
        let employeesInfo = [];
        for(let i = 0; i < searchedEmployeesList.length; i++) {
            let employeeSelected = await findEmployee(searchedEmployeesList[i].id);
            if(employeeSelected) { 
                employeesInfo.push(employeeSelected[1]);
            }  
        } 
        setEmployees(employeesInfo);
    };
    const addEmployeePhoto = async (photo,employee) => {
        let employeeData = employees;
        let foundEmployeeIdx = await findEmployee(employee.id);
        employeeData[foundEmployeeIdx[0]] = {...employee,["photo"]:photo};
        localStorage.setItem("employees", JSON.stringify(employeeData));
        getEmployees();
    };
   

    return <> <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" 
                rel="stylesheet"/>
        </Head>
        <Layout>
            <BasicModal show ={showHandleEmployee} onClose ={()=>setShowHandleEmployee(false)} 
                title = "Agregar Empleado"  type="form">
                <AddEmployeeForm onSubmit = {handleEmployee} default = {employeeToEdit}/>
            </BasicModal>  
            <BasicModal show ={showCaptureEmployee} onClose ={()=>setShowCaptureEmployee(false)} 
                title = "Registrar foto"  type="form" size ="md">
                <VideoCamera onPhotoCapture = {addEmployeePhoto} employee = {employeeToEdit}/>
            </BasicModal>  
            <h1 className="h4 font-weight-bold pt-5 mb-4 text-gray-800"> Administrador de empleados </h1>
            <div className ="row d-flex justify-content-center">
                <div className = "col-lg-10">
                    <div className = "row">
                        <div className ="col-lg-12">
                            <div className = "row d-flex align-items-center">
                                <div className ="col-md-4 text-center">
                                    <b className ="text-secondary">Total de empleados</b>
                                    <p className="text-danger"> {employees ?employees.length
                                        :''} </p>
                                </div>
                                <div className ="col-md-4 text-center">
                                    <b className ="text-secondary">Divisa de salario</b>
                                    <p className="text-danger"> {`${currencyConfig.currency}`} </p>
                                </div>
                                <div className ="col-md-4 text-md-right text-center mb-3">
                                    <b className ="mr-md-5 text-secondary">Seleccionar</b>
                                    <div className ="mt-1 mr-4">
                                        <button onClick = {toUsdCurrency} 
                                            className ={`mr-2 btn ${currencyConfig.currency == "USD" 
                                            ?'btn-employees-manager-app':''}`}>
                                            USD
                                        </button>
                                        <button onClick = {toMxnCurrency} 
                                            className ={`mr-2 btn ${currencyConfig.currency == "MXN" 
                                            ?'btn-employees-manager-app':''}`}>
                                            MXN
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 ml-5 mr-md-0 mr-5">
                            <ReactSearchAutocomplete
                                required
                                items={searchedEmployees}
                                onSearch={handleOnSearch}
                            />
                        </div>
                        <div className = "col-md-6 text-md-right text-center ml-2 mb-1 mt-md-0 mt-2">
                            <button className ="btn btn-employees-manager-app mr-3 " 
                                onClick = {addEmployee}>
                                + Agregar Empleado
                            </button>
                        </div>
                    </div>
                    <div className = "col-lg-12 mt-2">
                        <ResponsiveTable headers = {headValues} body = {bodyValues} 
                            customClass = "employees__table"/> 
                    </div>
                </div>
            
            </div>
        </Layout>
        <style jsx global>{`
            .employees__table tr:nth-child(odd) {
                background-color: #DDD;
                color:#777
              }
              
              .employees__table:nth-child(even) {
                background-color: #666;
                color:#FFF;
              }
              .employees__table tr:hover{
                background-color: rgba(255, 255, 0, 0.438);
                color: black !important;
              }
              .salary {
                font-family: inconsolata !important;
              }  
              .sc-bwzfXH {
                display: none !important;
              }            
        `} </style>
    </>
};

export default Index;