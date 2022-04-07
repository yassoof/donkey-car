import React from "react";
import "../css/lost-page.css";

const LostPage = () => {
  return (
    <div className="lost_pane">
      <div className="text_pane">
        <h1 className="main_text">
          <span className="error_code"> 404. </span>
          <span className="error_description"> Page not found. </span>
        </h1>
        <h2 className="sub_text_pane sub_text">
          <p> This isn&apos;t the page you&apos;re looking for... </p>
          <p> You can go about your business. </p>
          <p> Move along. </p>
        </h2>
      </div>
    </div>
  );
};

export default LostPage;
