import React from "react";
import { Container } from "react-bootstrap";
import { login } from "../utils/auth";
import Cover from "../components/utils/Cover";
import coverImg from "../assets/img/cover.jpg";
import { Notification } from "../components/utils/Notifications";
import Trucks from "../components/truckManager/Trucks";

const TrucksPage = () => {
  const isAuthenticated = window.auth.isAuthenticated;

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        <Container fluid="md">
          <main>
            <Trucks />
          </main>
        </Container>
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default TrucksPage;
