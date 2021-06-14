import BaseCard from "./BaseCard";

const ResponsiveTable = props => <BaseCard>
    <div className = {`table-responsive  ${props.customClass}`} >
        <table className="table table-bordered text-center" width="100%" cellSpacing="0">
            <thead>
                {props.headers.map((header,idx) => <th key ={idx}> {header} </th> )}
            </thead>
            <tfoot>
                {props.head}
            </tfoot>
            <tbody>
                {props.body}
            </tbody>
        </table>
    </div>
</BaseCard>;

export default ResponsiveTable;