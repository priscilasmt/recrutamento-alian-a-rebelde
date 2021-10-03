import { Modal, Button, Form } from "react-bootstrap";
import api from "../../services/api";
import "./styles.css";

function ModalDelete(props) {
  const handleDelete = (e) => {
    e.preventDefault();
    api
      .delete(`/${props.id}`, { params: { token: `PriscilaSant'AnnaMotta` } })
      .then(() => {
        props.onHide();
      });
  };

  return (
    <Modal
      {...props}
      size="sm-down"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Deseja realmente apagar o volutário ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer className="modal_footer">
        <Button onClick={handleDelete}>Deletar</Button>
        <Button onClick={props.onHide} variant="danger">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDelete;
