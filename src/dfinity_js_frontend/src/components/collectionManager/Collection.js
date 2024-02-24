import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

const Collection = ({ collection }) => {
  const {
    id,
    userId,
    address,
    truckId,
    date,
    time,
    weight,
    userName,
    district,
  } = collection;

  const intWeight = Number(weight);

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Card.Text className="flex-grow-1 ">id: {id}</Card.Text>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <Card.Title>UserId: {userId}</Card.Title>
          <Card.Text className="flex-grow-1 ">userName: {userName}</Card.Text>
          <Card.Text className="flex-grow-1 ">truckId: {truckId}</Card.Text>
          <Card.Text className="flex-grow-1 ">address: {address}</Card.Text>
          <Card.Text className="flex-grow-1 ">district: {district}</Card.Text>
          <Card.Text className="flex-grow-1 ">date: {date}</Card.Text>
          <Card.Text className="flex-grow-1 ">time: {time}</Card.Text>
          <Card.Text className="flex-grow-1 ">Weight: {intWeight}</Card.Text>
          {/* Router Link to send user to trucks page passing the collectionid as search param */}
        </Card.Body>
      </Card>
    </Col>
  );
};

Collection.propTypes = {
  collection: PropTypes.instanceOf(Object).isRequired,
};

export default Collection;
