import "./navbar1.scss";

import { useState, useEffect, useRef } from "react";

const Navbar1 = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const reference = useRef(0);

  useEffect(() => {
    return () => {
      window.addEventListener("scroll", () => {
        const { pageYOffset } = window;
        if (pageYOffset > reference.current) {
          setIsNavbarVisible(false);
        } else if (pageYOffset < reference.current) {
          setIsNavbarVisible(true);
        }
        reference.current = pageYOffset <= 0 ? 0 : pageYOffset;
      });
    };
  }, []);

  return (
    <>
      <nav className={isNavbarVisible ? "visible" : ""}>
        <div>
          <h3>Logo</h3>
        </div>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>

          <li>
            <a href="#contact">Contacts</a>
          </li>
        </ul>
      </nav>
      <section id="home">
        <h1>Home</h1>
        <p>I am home section content</p>
      </section>
      <section id="about">
        <h1>About</h1>
        <p>I am home section content</p>
      </section>
      <section id="contact">
        <h1>Contact</h1>
        <p>I am home section content</p>
      </section>
    </>
  );
};

export default Navbar1;
