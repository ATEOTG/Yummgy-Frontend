import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useLocation } from "react-router-dom";
function UsersListModal(props) {
  const path = useLocation();
  console.log(path);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
          Users who favorited {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <br />
        <ul className="d-flex flex-column gap-3">
          {props.userlist.length !== 0 ? (
            props.userlist.map((user) => {
              return (
                <li key={user.userId} className="list">
                  <Link
                    className="text-decoration-none fs-4 text-black username-link fw-bold"
                    to={
                      props.userId === user.userId
                        ? `/user`
                        : `/accounts/${user.yumUsername
                            .toLocaleLowerCase()
                            .split(" ")
                            .join("_")}`
                    }
                  >
                    {user.yumUsername}
                  </Link>{" "}
                </li>
              );
            })
          ) : (
            <h4 className="fw-bold">
              No Users Have Favorited This Recipe Yet...{" "}
            </h4>
          )}
        </ul>

        <Modal.Footer>
          <Button
            className="border border-2 border-black modal-btn-cls fw-bold"
            onClick={() => {
              props.onHide();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}

export default UsersListModal;
