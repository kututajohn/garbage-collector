import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Col, Stack } from "react-bootstrap";
import UpdateUser from "./UpdateUser";

const User = ({ user, update, request }) => {
  const { id, name, email, phone, address } = user;

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Body className="d-flex  flex-column text-center">
          <Stack>
            <Card.Title>Name: {name}</Card.Title>
            <UpdateUser user={user} save={update} />
          </Stack>
          <Card.Text>Id: {id}</Card.Text>
          <Card.Text className="flex-grow-1 ">Email: {email}</Card.Text>
          <Card.Text className="flex-grow-1 ">Phone: {phone}</Card.Text>
          <Card.Text className="flex-grow-1 ">Address: {address}</Card.Text>
          <Button
            type="button"
            onClick={() => request(id)}
            className="btn btn-success text-white w-100 py-3 mb-3"
          >
            Request Collection <i className="bi bi-clipboard-check"></i>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

User.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

export default User;
