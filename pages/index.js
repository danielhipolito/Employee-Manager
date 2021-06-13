import Layout from "../components/Layout";
import ResponsiveTable from "../components/ResponsiveTable";
import AddEmployeeForm from "../components/AddEmployeeForm";
import BasicModal from "../components/BasicModal";
import {useState, useEffect} from "react";

const Index = () => {
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [employees, setEmployees] = useState([]);

    let headValues = ["Empleado","Nombre","Empresa","Área","Salario Mensual","Imagen","Acciones"];
    let bodyValues = [];
    
    if(employees.length == 0) {
        bodyValues.push(<tr>
            <td colspan="100"> No hay empleados </td>
        </tr>);
    }
    else {
        employees.forEach(employee => {   
            bodyValues.push(<tr key = {"s"}>
                <td></td>    
                <td> {employee.name} </td>
                <td> {employee.company} </td>
                <td> {employee.area} </td>
                <td> {employee.salary} </td>
            </tr>);   
        }); 
    }

    const getEmployees = () => {
        let storedEmployees = JSON.parse(localStorage.getItem("employees"));
        setEmployees(storedEmployees);
        console.error(storedEmployees,"dios");
    };

    useEffect(() => {
        getEmployees();
    } , []);


   

    return <Layout>
        <BasicModal show ={showAddEmployee} onClose ={()=>setShowAddEmployee(false)} 
            title = "Agregar Empleado"  type="form">
            <AddEmployeeForm onSubmit = {getEmployees}/>
            {/* <AddEmployeeForm default={{name:"Daniel",company:"indava",salary:33,area:2}}/> */}
        </BasicModal>  
        <h1 className="h4 font-weight-bold pt-5 mb-4 text-gray-800"> Administrador de empleados </h1>
        <div className ="row d-flex justify-content-center">
            <div className = "col-lg-10">
                <div className = "row">
                    <div className="col-lg-6"/>
                    <div className = "col-lg-6 text-right">
                        <button className ="btn btn-primary mr-3" onClick = {()=>setShowAddEmployee(true)}>
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