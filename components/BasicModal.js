import Modal from "react-bootstrap/Modal";

const BasicModal = props => {    
    return <Modal show = {props.show} onHide = {props.onClose} size={props.size}>
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    { !props.message ? props.children : props.message}
    </Modal.Body>
    {props.type!="form"?<Modal.Footer>
      <button className="btn btn-secondary" onClick={props.onClose}>
          {props.cancelTxt}
      </button>
      {props.type!="alert"?<button className="btn btn-primary" onClick={props.confirm}>
          {props.confirmTxt}
      </button>:''}
    </Modal.Footer>:''}
  </Modal>
};

BasicModal.defaultProps = {
  cancelTxt: 'Cancelar',
  confirmTxt: 'Si'
};

export default BasicModal;