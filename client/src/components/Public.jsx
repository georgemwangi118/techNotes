import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Gee Repairs!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful city of Nairobi, Gee Repairs provides a trained
          staff ready to meet your tech repair needs.
        </p>
        <address className="public__addr">
          Gee Repairs <br />
          880 Moi Avenue <br />
          Nairobi City, Kenya <br />
          <a href="tel:+254741433">(254) 741-433-059</a>
        </address>
        <br />
        <p>Owner: George Mwangi</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
