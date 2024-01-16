import React, { Fragment, useEffect, useState } from "react";
import "./AccountCard.css";
import { Link, Route, Routes } from "react-router-dom";
import YummgyApi from "../apis/YummgyApi";
import UserAccountPage from "./pages/UserAccountPage";

function AccountCard(props) {
  const accountUsername = props.username
    .toLocaleLowerCase()
    .split(" ")
    .join("_");

  useEffect(() => {
    if (props.isUserLogged) {
    }
  }, []);

  const linkClickHandler = () => {
    props.setInAccountPage(false);
  };

  return (
    <Fragment>
      {props.inAccountPage && (
        <li className="list-unstyled p-3 d-flex gap-4 border border-2 border-black rounded account-card ">
          <div>
            <h5>Id: {props.id}</h5>
            <Link
              className="text-decoration-none fs-4 text-black username-link"
              to={
                props.currUserInfo.userId !== props.id
                  ? `${accountUsername}`
                  : `/user`
              }
              onClick={() => linkClickHandler}
            >
              <h3>Username: {props.username}</h3>
            </Link>
          </div>
        </li>
      )}

      <Routes>
        <Route
          path={`${accountUsername}`}
          element={
            <UserAccountPage
              isAdmin={
                props.isUserLogged && props.currUserInfo.role === "ROLE_ADMIN"
              }
              id={props.id}
              username={props.username}
            />
          }
        />
      </Routes>
    </Fragment>
  );
}

export default AccountCard;
