import React, { Fragment, useEffect, useState } from "react";
import SearchIcon from "../../svg/SearchIcon";
import AccountCard from "../AccountCard";
import YummgyApi from "../../apis/YummgyApi";
import { useLocation } from "react-router-dom";

function AccountsPage(props) {
  const [searchValue, setSearchValue] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [inAccountPage, setInAccountPage] = useState(true);

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path.includes("/accounts/")) {
      setInAccountPage(false);
    } else {
      setInAccountPage(true);
      YummgyApi.getAllAccounts(setAccountList);
      setSearchValue("");
    }
  }, [path]);

  useEffect(() => {
    YummgyApi.getAllAccounts(setAccountList);
  }, []);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    YummgyApi.searchAccount(searchValue, setAccountList);
  };

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Fragment>
      <div>
        {inAccountPage && (
          <form className="input-group search-form" onSubmit={onSubmitHandler}>
            <SearchIcon />
            <input
              className="form-control border border-2 border-black rounded-pill text-input"
              type="text"
              value={searchValue}
              name="search"
              placeholder="Search for User..."
              onChange={onChangeHandler}
            />
          </form>
        )}

        <div>
          <ul className="mt-5 d-flex  p-0 flex-wrap gap-4">
            {accountList.length !== 0 ? (
              accountList.map((account) => {
                return (
                  <AccountCard
                    key={account.userId}
                    username={account.yumUsername}
                    id={account.userId}
                    setInAccountPage={setInAccountPage}
                    inAccountPage={inAccountPage}
                    isUserLogged={props.isUserLogged}
                    currUserInfo={props.currUserInfo}
                  />
                );
              })
            ) : (
              <h2 className="fw-bold text-center">No Users Found! 😅</h2>
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default AccountsPage;
