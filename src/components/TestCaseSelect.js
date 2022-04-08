import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const TestCaseSelect = props => {
  TestCaseSelect.propTypes = {
    reference: PropTypes.any,
    returnIndex: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        description: PropTypes.string,
        preConditions: PropTypes.string,
        postConditions: PropTypes.string,
        index: PropTypes.number.isRequired
      }).isRequired
    ).isRequired
  };

  const [testCase, setTestCase] = useState("Select...");

  function handleChange(e) {
    setTestCase(e.target.value);
    props.returnIndex(e.target.value);
  }

  return (
    <select required value={testCase} onChange={e => handleChange(e)}>
      <option key={0} value="" hidden>
        {" "}
        {props.options.length > 0 ? "Select..." : "No Test Cases Found."}{" "}
      </option>
      {props.options.map(item => {
        return (
          <option key={item.index} value={item.index}>
            {" "}
            {`${item.index}: ${item.description}`}
          </option>
        );
      }, this)}
    </select>
  );
};

export default TestCaseSelect;
