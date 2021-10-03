import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../services/api";
import { formataStringData } from "../../util";

function ModalForm(props) {
  const [nameVoluntary, setNameVoluntary] = useState();
  const [planetVoluntary, setPlanetVoluntary] = useState();
  const [birthDateVoluntary, setBirthDateVoluntary] = useState();
  const [descriptionVoluntary, setDescriptionVoluntary] = useState();

  async function getVoluntaryById() {
    let voluntaryReturn = await api.get(`/${props.id}`, {
      params: { token: `PriscilaSant'AnnaMotta` },
    });

    if (voluntaryReturn.data) {
      const { name, planet, birthDate, description } = voluntaryReturn.data;
      setNameVoluntary(name);
      setPlanetVoluntary(planet);
      setBirthDateVoluntary(formataStringData(birthDate));
      setDescriptionVoluntary(description);
    }
    return voluntaryReturn.data;
  }

  useEffect(async () => {
    if (props.id) {
      await getVoluntaryById();
    } else {
      setNameVoluntary("");
      setPlanetVoluntary("");
      setBirthDateVoluntary("");
      setDescriptionVoluntary("");
    }
  }, [props.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (birthDateVoluntary.length !== 10) {
      setBirthDateVoluntary("");
      console.log(birthDateVoluntary);
    } else {
      const data = {
        name: nameVoluntary,
        planet: planetVoluntary,
        birthDate: birthDateVoluntary.split("-").reverse().join("/"),
        description: descriptionVoluntary,
      };
      if (props.id) {
        api
          .put(`/${props.id}`, data, {
            params: { token: `PriscilaSant'AnnaMotta` },
          })
          .then(() => {
            props.onHide();
          });
      } else {
        api
          .post("", data, { params: { token: `PriscilaSant'AnnaMotta` } })
          .then(() => {
            props.onHide();
          });
      }
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.id ? "Editar volutário" : "Adicionar novo volutário"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome"
              required
              value={nameVoluntary}
              onChange={(e) => setNameVoluntary(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPlanet">
            <Form.Label>Planeta</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o planeta"
              required
              value={planetVoluntary}
              onChange={(e) => setPlanetVoluntary(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupDate">
            <Form.Label>Data de nascimento</Form.Label>
            <Form.Control
              type="date"
              placeholder="Digite a data de nascimento"
              maxLength={10}
              minLength={10}
              value={birthDateVoluntary}
              required
              onChange={(e) => setBirthDateVoluntary(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupDescription">
            <Form.Label>Motivação para entra na aliança </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              value={descriptionVoluntary}
              onChange={(e) => setDescriptionVoluntary(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">{props.id ? "Editar" : "Adicionar"}</Button>
          <Button onClick={props.onHide} variant="danger">
            Fechar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalForm;
