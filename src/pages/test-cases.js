import React from 'react'
import { useState, useCallback, useEffect } from 'react';
import '../css/form.css'
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading'
import { FaSyncAlt, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import TestCaseModal from '../components/TestCaseModal';


const TestCases = () => {

  const [testCase, setTestCase] = useState('Select...');
  const [device, setDevice] = useState('Select....');
  const [showModal, setShowModal] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const testCaseOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const deviceOptions = [
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      window.history.pushState(window.state, window.title, 'http://localhost:3000/donkey-car/test-cases');
    } else {
      window.history.pushState(window.state, window.title, 'https://yassoof.github.io/donkey-car/test-cases');
    }
  });

  const rebuildToolTip = () => {
    ReactTooltip.rebuild();
  };

  const runTestCase = (e) => {
    e.preventDefault();
  }

  const close = useCallback((e) => {
    setShowModal(false);
    setCanEdit(false);
    e.preventDefault();
  }, []);

  const edit = useCallback((e) => {
    setCanEdit(true);
    e.preventDefault();
  }, []);


  return (
    <div>
      <form className='form' onLoad={() => { rebuildToolTip() }} onSubmit={(e) => runTestCase(e)}>

        <span className='span' >
          <label style={{ textAlign: 'right' }} >
            <span style={{ margin: 'auto calc((50% - 7em) / 1.4) auto auto' }}>
              Select Test Case:
            </span>

            <button data-tip data-for='view' className='not-button' style={{ color: '#fad039' }}
              onClick={() => { setShowModal(true); setCanEdit(false); }}>
              <FaEye />
            </button>
            <ReactTooltip id='view' place="top" type="light" effect="solid"> View Selected Test Case </ReactTooltip>

            <button data-tip data-for='add' className='not-button' style={{ color: '#4ac746' }}
              onClick={() => { setShowModal(true); setCanEdit(true); }}>
              <FaPlus />
            </button>
            <ReactTooltip id='add' place="top" type="light" effect="solid"> Add New Test Case </ReactTooltip>

            <button data-tip data-for='delete' className='not-button' style={{ color: '#8a2516' }} >
              <FaTrash />
            </button>
            <ReactTooltip id='delete' place="top" type="light" effect="solid"> Delete Selected Test Case </ReactTooltip>

          </label>

          <select required value={testCase} onChange={(e) => setTestCase(e.target.value)}>
            {
              testCaseOptions.map((item, i) => {
                return (<option key={i} value={item.value}> {item.label} </option>)
              }, this)
            }
          </select>
        </span>

        <span className='span' >
          <label style={{ textAlign: 'right' }}>
            <span style={{ margin: 'auto calc((50% - 2em) / 1.4) auto auto' }}>
              Select Device:
            </span>

            <button data-tip data-for='refresh' className='not-button' style={{ color: '#3183e0' }} >
              <FaSyncAlt />
            </button>
            <ReactTooltip id='refresh' place="top" type="light" effect="solid"> Refresh Device List </ReactTooltip>

          </label>
          <select required value={device} onChange={(e) => setDevice(e.target.value)}>
            {
              deviceOptions.map((item, i) => {
                return (<option key={i} value={item.value}> {item.label} </option>)
              }, this)
            }
          </select>
        </span>
        <button className='formButton button' type='submit' data-tip data-for='run'>
          Run
        </button>
        <ReactTooltip id='run' place="bottom" type="light" effect="solid"> Run Test Case on Device </ReactTooltip>
      </form>


      <TestCaseModal show={showModal} edit={canEdit} canEdit={edit} onClose={close} />
    </div>
  )
}

export default withAuthenticationRequired(TestCases, { onRedirecting: () => <Loading /> });