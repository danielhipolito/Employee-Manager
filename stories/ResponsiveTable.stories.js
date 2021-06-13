import ResponsiveTable from '../components/ResponsiveTable';

export default {
  title: 'ResponsiveTable',
  component: ResponsiveTable,
};

export const WithOneHeader = () => <div style={{backgroundColor:'orange'}}>
  <ResponsiveTable headers={["uno"]}/>
</div>;
export const WithTwoHeaders = () => <div style={{backgroundColor:'orange'}}>
  <ResponsiveTable headers={["uno","dos"]}/>
</div>;
export const WithFiveHeaders = () => <div style={{backgroundColor:'orange'}}>
  <ResponsiveTable headers={["uno","dos","tres","cuatro","cinco"]}/>
</div>;

