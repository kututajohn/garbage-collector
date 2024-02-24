import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Card, Col, Stack } from "react-bootstrap";
import UpdateTruck from "./UpdateTruck";
import { getUsers as getUserList } from "../../utils/userManager";
import Loader from "../utils/Loader";

const Truck = ({ truck, update }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id, registration, driverName, capacity, district, assignedUsersIds } =
    truck;

  console.log(truck);

  // function to get the list of users
  const getUsers = useCallback(async () => {
    try {
      setLoading(true);

      setUsers(await getUserList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });
  useEffect(() => {
    getUsers();
  }, []);

  const assignedUsers = users.filter((user) => {
    return assignedUsersIds.includes(user.id);
  });

  console.log(assignedUsers);

  return (
    <>
      {!loading ? (
        <Col key={id}>
          <Card className=" h-100">
            <Card.Header>
              <Stack direction="horizontal" gap={2}>
                registration: {registration}
              </Stack>
              <UpdateTruck truck={truck} save={update} />
            </Card.Header>
            <Card.Body className="d-flex flex-column ">
              <Card.Text className="flex-grow-1 ">TruckId: {id}</Card.Text>
              <Card.Text className="flex-grow-1 ">
                Driver: {driverName}
              </Card.Text>
              <Card.Text className="flex-grow-1 ">
                capacity: {Number(capacity)}
              </Card.Text>
              <Card.Text className="flex-grow-1 ">
                district: {district}
              </Card.Text>
              <hr />
              <h3>Assigned Users</h3>
              {assignedUsers.map((user, index) => (
                <Card key={index} className="p-2">
                  <Card.Text className="flex-grow-1 ">
                    Name: {user.name}
                  </Card.Text>
                  <Card.Text className="flex-grow-1 ">
                    Address: {user.address}
                  </Card.Text>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
      ) : (
        <Loader />
      )}
    </>
  );
};

Truck.propTypes = {
  truck: PropTypes.instanceOf(Object).isRequired,
};

export default Truck;
