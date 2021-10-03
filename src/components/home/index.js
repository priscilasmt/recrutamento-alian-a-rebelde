import { useEffect } from "react";
import "./styles.css";
import { Table, Button } from "react-bootstrap";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import { useState } from "react";
import ModalForm from "../modal";
import api from "../../services/api";
import ModalDelete from "../modalDelete";
import ImgEmpty from "../../assets/noVolutary.svg";

function Home() {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [voluntarys, setVoluntarys] = useState([]);
  const [idVoluntary, setIdVoluntary] = useState();

  const getAllVoluntary = () => {
    api
      .get("/", { params: { token: `PriscilaSant'AnnaMotta` } })
      .then((response) => setVoluntarys(response.data));
  };

  useEffect(() => {
    getAllVoluntary();
  }, []);

  useEffect(() => {
    getAllVoluntary();
  }, [voluntarys]);

  const handleAdd = () => {
    setIdVoluntary("");
    setModalShow(true);
  };

  const handleEdit = (id) => {
    setIdVoluntary(id);
    setModalShow(true);
  };

  const handleDelete = (id) => {
    setIdVoluntary(id);
    setShowModalDelete(true);
  };

  return (
    <div className="home m-3">
      <div className="title__button_home">
        <h3 className="title_home">Lista de voluntários recrutados</h3>
        <Button variant="primary" className="mb-3" onClick={handleAdd}>
          Adicionar novo recruta
        </Button>

        <ModalForm
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={idVoluntary}
        ></ModalForm>

        <ModalDelete
          show={showModalDelete}
          onHide={() => setShowModalDelete(false)}
          backdrop="static"
          keyboard={false}
          id={idVoluntary}
        ></ModalDelete>
      </div>

      {voluntarys.length === 0 ? (
        <div className="img_empty">
          <h4>Nenhum recruta encontrado</h4>
          <img src={ImgEmpty} width="320" height="300"></img>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Planeta</th>
              <th>Data de nascimento</th>
              <th>Descrição</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {voluntarys?.map((voluntary, index) => {
              return (
                <tr key={index}>
                  <td>{voluntary.name}</td>
                  <td>{voluntary.planet}</td>
                  <td>{voluntary.birthDate}</td>
                  <td>{voluntary.description}</td>
                  <td>
                    <a onClick={(e) => handleEdit(voluntary.id)}>
                      <BsPencil size="20" />
                    </a>
                  </td>
                  <td>
                    <a onClick={(e) => handleDelete(voluntary.id)}>
                      <BsFillTrashFill size="20" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Home;
