import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddUser from "./AddUser";
import User from "./User";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getUsers as getUserList,
  createUser,
  updateUser,
} from "../../utils/userManager";
import { Link } from "react-router-dom";
import { requestCollection } from "../../utils/collectionManager";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const addUser = async (data) => {
    try {
      setLoading(true);
      createUser(data).then((resp) => {
        getUsers();
      });
      toast(<NotificationSuccess text="User added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a user." />);
    } finally {
      setLoading(false);
    }
  };

  const update = async (data) => {
    try {
      setLoading(true);
      updateUser(data).then((resp) => {
        getUsers();
      });
      toast(<NotificationSuccess text="User updated successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to update a user." />);
    } finally {
      setLoading(false);
    }
  };

  const request = async (data) => {
    try {
      setLoading(true);
      requestCollection(data).then((resp) => {
        getUsers();
      });
      toast(
        <NotificationSuccess text="User garbage Collection requested successfully." />
      );
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a request." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <nav className="navbar mb-5 px-2 d-flex justify-content-between navbar-expand-lg navbar-light bg-light">
            <h1 className="fs-4 fw-bold mb-0">Users Manager</h1>
            <div>
              <div className="navbar-nav">
                <Link
                  to="/collections"
                  className="justify-content-start py-2 px-3 mx-4 fs-3 my-2 text-xl-center "
                >
                  Collections/
                </Link>
                <Link
                  to="/trucks"
                  className="justify-content-start mr-4 py-2 px-3 fs-3  mx-4 my-2 text-xl-center "
                >
                  Trucks/
                </Link>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <AddUser save={addUser} />
            </div>
          </nav>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {users.map((_user, index) => (
              <User
                key={index}
                user={{
                  ..._user,
                }}
                update={update}
                request={request}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Users;
