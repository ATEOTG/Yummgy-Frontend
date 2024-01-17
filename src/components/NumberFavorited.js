import React, { Fragment, useState } from "react";
import FavIcon from "../svg/FavIcon";
import "./NumberFavorited.css";
import UsersListModal from "./modals/UsersListModal";

function NumberFavorited(props) {
  const [userListModal, setUserListModal] = useState(false);

  return (
    <Fragment>
      <UsersListModal
        show={userListModal}
        onHide={() => setUserListModal(false)}
        title={props.title}
        userlist={props.userlist}
        userId={props.userId}
      />
      <div className="position-absolute d-flex number-display-cont gap-1">
        <FavIcon
          favorite={true}
          setUserListModal={setUserListModal}
          numberDisplay={true}
        />
        <p className="fw-bold number-display-text">
          {props.numberOfUsersWhoFavorited}
        </p>
      </div>
    </Fragment>
  );
}

export default NumberFavorited;
