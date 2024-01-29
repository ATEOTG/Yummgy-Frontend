import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function VerificationPage(props) {
  const [verificationMessage, setVerificationMessage] = useState(
    "Account Verified! Can now login."
  );
  const path = useLocation();

  useEffect(() => {}, []);
  return (
    <div>
      <h1 className="text-center fw-bold">{verificationMessage}</h1>
    </div>
  );
}

export default VerificationPage;
