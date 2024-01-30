import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import YummgyApi from "../../apis/YummgyApi";

function VerificationPage(props) {
  const [verificationMessage, setVerificationMessage] = useState("");
  const path = useLocation();

  useEffect(() => {
    if (path.search.includes("token")) {
      const tokenId = path.search.split("=")[1];
      YummgyApi.confirmToken(tokenId, setVerificationMessage);
    } else {
      setVerificationMessage("No Token Provided");
    }
  }, []);
  return (
    <div>
      <h1 className="text-center fw-bold">{verificationMessage}</h1>
    </div>
  );
}

export default VerificationPage;
