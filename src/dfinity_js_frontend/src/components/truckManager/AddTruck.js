import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddTruck = ({ save }) => {
  const [registration, setRegistration] = useState("");
  const [driverName, setDriverName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [district, setDistrict] = useState("");
  const isFormFilled = () => registration && driverName && capacity && district;

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
          <Modal.Title>New Truck</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputTime"
              label="Driver name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Driver name"
                onChange={(e) => {
                  setDriverName(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputRegistration"
              label="Registration"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="registration"
                onChange={(e) => {
                  setRegistration(e.target.value);
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
                registration,
                district: district.toLowerCase(),
                driverName,
                capacity,
              });
              handleClose();
            }}
          >
            Save truck
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddTruck.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddTruck;
