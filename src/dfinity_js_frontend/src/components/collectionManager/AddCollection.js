import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddCollection = ({ save }) => {
  const [userId, setUserId] = useState("");
  const [truckId, setTruckId] = useState("");
  const [weight, setWeight] = useState(0);
  const isFormFilled = () => userId && truckId && weight;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} variant="dark" className="rounded-pill">
        Add <i className="bi bi-plus px-2"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mark Collection</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputName"
              label="Collection userId"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                placeholder="Enter userId"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputTruckId"
              label="TruckId"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="truckId"
                onChange={(e) => {
                  setTruckId(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputWeight"
              label="weight"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="weight"
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
            </FloatingLabel>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              save({
                userId: userId.trim(),
                truckId: truckId.trim(),
                weight,
              });
              handleClose();
            }}
          >
            request collection
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddCollection.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddCollection;
