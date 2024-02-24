import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddUser = ({ save }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");

  const isFormFilled = () => name && address && phone && email && district;

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
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputName"
              label="User name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter name of user"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputPhone"
              label="Phone"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="Phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="inputAddress"
              label="Address"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
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
              controlId="inputEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
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
                name,
                phone,
                address,
                email,
                district: district.toLowerCase(),
              });
              handleClose();
            }}
          >
            Save user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddUser.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddUser;
