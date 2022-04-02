import React from 'react'
import { useState, useCallback, useEffect } from 'react';
import '../css/form.css'
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading'
import { FaSyncAlt, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import TestCaseModal from '../components/TestCaseModal';
import axios from 'axios';
import TestCaseSelect from '../components/TestCaseSelect';


const TestCases = () => {

  const [currentId, setCurrentId] = useState(0);
  const [device, setDevice] = useState('Select....');
  const [showModal, setShowModal] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [newCase, setNewCase] = useState(canEdit);

  const serverUrl = 'http://localhost:8090/test-cases';

  const [testCaseOptions, setTestCaseOptions] = useState([
    {
      id: 1,
      description: '',
      preConditions: '',
      postConditions: '',
    },
  ]);

  const deviceOptions = [
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      window.history.pushState(window.state, window.title, 'http://localhost:3000/#/donkey-car/test-cases');
    } else {
      window.history.pushState(window.state, window.title, 'https://yassoof.github.io/#/donkey-car/test-cases');
    }
  }, []);

  const getData = () => {
    axios.get(serverUrl).then(res => {
      setTestCaseOptions(res.data);
    })
  }

  useEffect(() => {
    getData();
  }, [testCaseOptions]);


  const rebuildToolTip = () => {
    ReactTooltip.rebuild();
  };

  const runTestCase = (e) => {
    e.preventDefault();
  }

  const close = useCallback(() => {
    setShowModal(false);
    setCanEdit(false);
  }, []);

  const edit = useCallback(() => {
    setCanEdit(true);
  }, []);

  const selectId = useCallback((selectedId) => {
    setCurrentId(selectedId);
  }, []);

  const deleteTestCase = () => {
    if (currentId !== 0) {
      axios.delete(`${serverUrl}/${currentId}`);
      testCaseOptions.splice(currentId - 1, 1);
    }
  }


  return (
    <div>
      <form className='form' onLoad={() => { rebuildToolTip() }} onSubmit={(e) => runTestCase(e)}>

        <span className='span' >
          <label style={{ textAlign: 'right' }} >
            <span style={{ margin: 'auto calc((50% - 7em) / 1.4) auto auto' }}>
              Select Test Case:
            </span>

            {/* View */}
            <button data-tip data-for='view' className='not-button' style={{ color: '#fad039' }}
              onClick={() => { setShowModal(true); setCanEdit(false); setNewCase(false); }}>
              <FaEye />
            </button>
            <ReactTooltip id='view' place="top" type="light" effect="solid"> View Selected Test Case </ReactTooltip>

            {/* Add */}
            <button data-tip data-for='add' className='not-button' style={{ color: '#4ac746' }}
              onClick={() => { setShowModal(true); setCanEdit(true); setNewCase(true); }}>
              <FaPlus />
            </button>
            <ReactTooltip id='add' place="top" type="light" effect="solid"> Add New Test Case </ReactTooltip>

            {/* Delete */}
            <button data-tip data-for='delete' className='not-button' style={{ color: '#8a2516' }}
              onClick={() => { deleteTestCase(); }} >
              <FaTrash />
            </button>
            <ReactTooltip id='delete' place="top" type="light" effect="solid"> Delete Selected Test Case </ReactTooltip>

          </label>
          <TestCaseSelect options={testCaseOptions} returnId={selectId} />
        </span>

        <span className='span' >
          <label style={{ textAlign: 'right' }}>
            <span style={{ margin: 'auto calc((50% - 2em) / 1.4) auto auto' }}>
              Select Device:
            </span>

            {/* Refresh */}
            <button data-tip data-for='refresh' className='not-button' style={{ color: '#3183e0' }} >
              <FaSyncAlt />
            </button>
            <ReactTooltip id='refresh' place="top" type="light" effect="solid"> Refresh Device List </ReactTooltip>

          </label>
          <select required value={device} onChange={(e) => setDevice(e.target.value)}>
            {
              deviceOptions.map((item, i) => {
                return (<option key={i} value={item.value}> {(item.label)} </option>)
              }, this)
            }
          </select>
        </span>
        <button className='formButton button' type='submit' data-tip data-for='run'>
          Run
        </button>
        <ReactTooltip id='run' place="bottom" type="light" effect="solid"> Run Test Case on Device </ReactTooltip>
      </form>


      <TestCaseModal
        id={currentId}
        options={testCaseOptions}
        isNewCase={newCase}
        show={showModal}
        edit={canEdit}
        canEdit={edit}
        onClose={close}
      />
    </div>
  )
}

export default withAuthenticationRequired(TestCases, { onRedirecting: () => <Loading /> });