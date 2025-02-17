import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  const handleClick = () => {
    window.open("https://www.example.com", "_blank");
  };

  return (
    <footer
      className="footer"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <p>
        Coded by:{" "}
        <span className="footer-tag" data-text="Bubbo">
          Bubbo
        </span>
      </p>
    </footer>
  );
}
