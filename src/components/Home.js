import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div>
      <div className="home-cont rounded">
        <h2 className="fs-1 text-white fw-bold text-center">Yummgy</h2>
        <p className="fs-4 text-white fw-bold text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <div className="mt-5 d-flex justify-content-between gap-10">
        <p className="w-50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          minus labore ullam autem vitae voluptatibus assumenda, cupiditate non,
          ducimus repudiandae totam eaque laboriosam, consequuntur animi
          architecto? Veritatis voluptas soluta ducimus.
        </p>
        <Link className="btn btn-primary btn-lg w-50 fs-3 pt-3 fw-bold" to="#">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
