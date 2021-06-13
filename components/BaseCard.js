const BaseCard = props => <div className={`card shadow mb-4 ${props.customClass} w-100  rounded`} >
    { props.title 
        ? <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
                {props.title}
            </h6>
        </div> 
        : ''
    }
    <div className="card-body">
        {props.children}
    </div>
</div>;

export default BaseCard;