import Layout from "../components/Layout";
import ResponsiveTable from "../components/ResponsiveTable";

const Index = () => {
    let headValues = ["Empleado","Nombre","Empresa","Area","Salario Mensual","Imagen","Acciones"];
    let bodyValues = [[ <tr style={{backgroundColor:'orange'}}>    
    <td> Runo </td>
    <td> Rdos </td>
    <td> Rtres </td>
    </tr>]];

    return <Layout>
        <h1 className="h4 font-weight-bold pt-5 mb-4 text-gray-800"> Administrador de empleados </h1>
        <ResponsiveTable headers = {headValues} body = {[bodyValues]} /> 
    </Layout>
};

export default Index;