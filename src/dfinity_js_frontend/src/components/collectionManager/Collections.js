import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddCollection from "./AddCollection";
import Collection from "./Collection";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getCollections as getCollectionList,
  createCollection,
} from "../../utils/collectionManager";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to get the list of collections
  const getCollections = useCallback(async () => {
    try {
      setLoading(true);
      setCollections(await getCollectionList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addCollection = async (data) => {
    try {
      setLoading(true);
      data.weight = parseInt(data.weight, 10);
      console.log(data);
      createCollection(data).then((resp) => {
        getCollections();
        toast(<NotificationSuccess text="Collection added successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a collection." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  console.log(collections);

  return (
    <>
      {!loading ? (
        <>
          <nav className="navbar mb-5 px-2 d-flex justify-content-between navbar-expand-lg navbar-light bg-light">
            <h1 className="fs-4 fw-bold mb-0">Collections Manager</h1>
            <div>
              <div className="navbar-nav">
                <Link
                  to="/"
                  className="justify-content-start py-2 px-3 mx-4 fs-3 my-2 text-xl-center "
                >
                  Users/
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
              <AddCollection save={addCollection} />
            </div>
          </nav>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {collections.map((_collection, index) => (
              <Collection
                key={index}
                collection={{
                  ..._collection,
                }}
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

export default Collections;
