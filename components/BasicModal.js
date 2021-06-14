const BasicModal = props => {  
    return props.show? <div className="modal border border-danger" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{props.title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                        onClick={props.onClose}>
                          <span aria-hidden="true" >
                              &times;
                          </span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>  { !props.message ? props.children : props.message} </p>
                </div>
                {props.type!="form" 
                    ? <div className="modal-footer">
                          {props.type!="alert"
                            ? <button onClick={props.confirm} classNameName="btn btn-primary">
                                  {props.confirmTxt}
                              </button>
                            :''}
                          <button onClick={props.onClose} classNameName="btn btn-secondary" 
                              data-dismiss="modal">
                              {props.cancelTxt}
                          </button>
                      </div>
                    :''}
            </div>
        </div>
    </div>  : ''
};

BasicModal.defaultProps = {
  cancelTxt: 'Cancelar',
  confirmTxt: 'Si'
};

export default BasicModal;