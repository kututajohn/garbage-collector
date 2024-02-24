import React, { useEffect, useState, useCallback } from "react";
import Truck from "./Truck";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  createTruck,
  updateTruck,
  getTrucks as getTruckList,
} from "../../utils/truckManager";
import AddTruck from "./AddTruck";

const Trucks = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to get the list of trucks
  const getTrucks = useCallback(async () => {
    try {
      setLoading(true);
      setTrucks(await getTruckList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addTruck = async (data) => {
    try {
      setLoading(true);
      data.capacity = parseInt(data.capacity, 10);
      createTruck(data).then((resp) => {
        getTrucks();
        toast(<NotificationSuccess text="Truck added successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a truck." />);
    } finally {
      setLoading(false);
    }
  };

  const update = async (data) => {
    try {
      setLoading(true);
      data.capacity = parseInt(data.capacity, 10);
      updateTruck(data).then((resp) => {
        getTrucks();
        toast(<NotificationSuccess text="Truck updated successfully." />);
      });
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to update truck." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrucks();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <nav className="navbar mb-5 px-2 d-flex justify-content-between navbar-expand-lg navbar-light bg-light">
            <h1 className="fs-4 fw-bold mb-0">Trucks Manager</h1>
            <div>
              <div className="navbar-nav">
                <Link
                  to="/"
                  className="justify-content-start mr-4 py-2 px-3 fs-3  mx-4 my-2 text-xl-center "
                >
                  Users/
                </Link>
                <Link
                  to="/collections"
                  className="justify-content-start py-2 px-3 mx-4 fs-3 my-2 text-xl-center "
                >
                  Collections/
                </Link>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <AddTruck save={addTruck} />
            </div>
          </nav>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {trucks.map((_truck, index) => (
              <Truck
                key={index}
                truck={{
                  ..._truck,
                }}
                update={update}
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

export default Trucks;
