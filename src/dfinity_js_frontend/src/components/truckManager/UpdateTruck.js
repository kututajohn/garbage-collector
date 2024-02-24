import React, { useState } from "react";
import { Button, Modal, Form, FloatingLabel, Stack } from "react-bootstrap";

const Update = ({ truck, save }) => {
  const [driverName, setDriverName] = useState(truck.driverName);
  const [district, setDistrict] = useState(truck.district);
  const [capacity, setCapacity] = useState(Number(truck.capacity));
  const isFormFilled = () => driverName && district && capacity;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        type="button"
        onClick={handleShow}
        className="rounded-pill btn btn-info"
      >
        Update <i className="bi bi-pencil-square"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Stack>
            <Modal.Title>Update Truck</Modal.Title>
          </Stack>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputUrl"
              label="Driver Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Driver Name"
                onChange={(e) => {
                  setDriverName(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDistrict"
              label="District"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="District"
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputCapacity"
              label="capacity"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="capacity"
                onChange={(e) => {
                  setCapacity(e.target.value);
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
                id: truck.id,
                district,
                driverName,
                capacity,
              });
              handleClose();
            }}
          >
            Update truck
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Update;
