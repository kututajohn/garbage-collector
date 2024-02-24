import React from "react";
import { Container } from "react-bootstrap";
import { login } from "../utils/auth";
import Collections from "../components/collectionManager/Collections";
import Cover from "../components/utils/Cover";
import coverImg from "../assets/img/cover.jpg";
import { Notification } from "../components/utils/Notifications";

const CollectionsPage = () => {
  const isAuthenticated = window.auth.isAuthenticated;

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        <Container fluid="md">
          <main>
            <Collections />
          </main>
        </Container>
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default CollectionsPage;
