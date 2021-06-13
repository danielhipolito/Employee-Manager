import AddEmployeeForm from '../components/AddEmployeeForm';

export default {
  title: 'AddEmployeeForm',
  component: AddEmployeeForm,
};

export const AddEmployee = () => <AddEmployeeForm />
export const EditEmployee = () => <AddEmployeeForm default={{name:"Daniel",company:"MediQó",salary:33,
  area:2}}/>
