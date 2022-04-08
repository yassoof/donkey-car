import React from "react";
import "../css/form.css";
import { FaEdit } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const TestCaseModal = props => {
  TestCaseModal.propTypes = {
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        description: PropTypes.string,
        preConditions: PropTypes.string,
        postConditions: PropTypes.string,
        index: PropTypes.number.isRequired
      }).isRequired
    ).isRequired,
    isNewCase: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
    edit: PropTypes.bool.isRequired,
    canEdit: PropTypes.func.isRequired,
    canClose: PropTypes.func.isRequired
  };

  const [desc, setDesc] = useState("");
  const [preCond, setPreCond] = useState("");
  const [postCond, setPostCond] = useState("");

  const serverUrl = "https://donkey-car.herokuapp.com/test-cases";

  useEffect(() => {
    if (props.show && !props.isNewCase && props.index != 0) {
      setDesc(props.options[props.index - 1].description);
      setPreCond(props.options[props.index - 1].preConditions);
      setPostCond(props.options[props.index - 1].postConditions);
    }
    return () => clear();
  }, [props.show]);

  const data = {
    description: desc,
    preConditions: preCond,
    postConditions: postCond
  };

  function postData() {
    axios
      .post(serverUrl, data)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function putData() {
    if (props.index === 0) return;
    axios
      .put(`${serverUrl}/${props.options[props.index - 1].id}`, data)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function clear() {
    setDesc("");
    setPreCond("");
    setPostCond("");
  }

  function rebuildToolTip() {
    ReactTooltip.rebuild();
  }

  function formHandler() {
    // e.preventDefault();
    if (props.isNewCase) postData();
    else putData();
    props.canClose();
  }

  if (!props.show) return null;

  return (
    <div className="modalpane">
      <form
        className="modal"
        onLoad={() => {
          rebuildToolTip();
        }}
        onSubmit={e => formHandler(e)}
      >
        <button
          className="not-button closebutton"
          onClick={e => {
            e.preventDefault();
            props.canClose();
          }}
        >
          {" "}
          &times;{" "}
        </button>

        {/* Id */}
        <label className="modal-label">Test Case Id: </label>
        <input
          className="id-field"
          type="text"
          value={
            !props.isNewCase && props.index >= 1
              ? props.options[props.index - 1].id
              : "???"
          }
          disabled
        />

        {/* Description */}
        <label className="modal-label">Enter Test Case Description:</label>
        <textarea
          className="text-field"
          required
          value={desc}
          disabled={!props.edit}
          onChange={e => setDesc(e.target.value)}
        />

        {/* Pre-Conditions */}
        <label className="modal-label">Enter Test Case Pre-Conditions:</label>
        <textarea
          className="text-field"
          required
          value={preCond}
          disabled={!props.edit}
          onChange={e => setPreCond(e.target.value)}
        />

        {/* Post-Conditions */}
        <label className="modal-label">Enter Test Case Post-Conditions:</label>
        <textarea
          className="text-field"
          required
          value={postCond}
          disabled={!props.edit}
          onChange={e => setPostCond(e.target.value)}
        />

        {props.edit ? (
          <span>
            <button
              className="formButton button"
              type="submit"
              data-tip
              data-for="save"
            >
              Save
            </button>
            <ReactTooltip id="save" place="bottom" type="light" effect="solid">
              {" "}
              Save Test Case{" "}
            </ReactTooltip>
          </span>
        ) : (
          <span>
            <button
              className="not-button"
              data-tip
              data-for="edit"
              style={{
                color: "#fad039",
                fontSize: "2em",
                margin: "0.2em auto"
              }}
              onClick={e => {
                e.preventDefault();
                props.canEdit();
              }}
            >
              <FaEdit />
            </button>
            <ReactTooltip id="edit" place="bottom" type="light" effect="solid">
              {" "}
              Edit Selected Test Case{" "}
            </ReactTooltip>
          </span>
        )}
      </form>
    </div>
  );
};

export default TestCaseModal;
