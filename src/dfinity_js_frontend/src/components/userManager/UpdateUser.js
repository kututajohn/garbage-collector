import React, { useState } from "react";
import { Button, Modal, Form, Stack, FloatingLabel } from "react-bootstrap";

const AddUser = ({ user, save }) => {
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [district, setDistrict] = useState(user.district);

  const isFormFilled = () => address && phone && email && district;

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
            <Modal.Title>Update User</Modal.Title>
            <span>you can leave blank for unchanged values</span>
          </Stack>
        </Modal.Header>
        <Form>
          <Modal.Body>
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
                id: user.id,
                phone,
                address,
                district,
                email,
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

export default AddUser;
