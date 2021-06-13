import BaseCard from "./BaseCard";

const ResponsiveTable = props => <BaseCard>
    <div className="table-responsive">
        <table className="table text-center" width="100%" cellSpacing="0">
            <thead>
                {props.headers.map(header => <th> {header} </th> )}
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