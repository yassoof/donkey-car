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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [device, setDevice] = useState('Select...');
  const [showModal, setShowModal] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [newCase, setNewCase] = useState(canEdit);

  const serverUrl = 'https://donkey-car.herokuapp.com/test-cases';
  const controller = new AbortController();

  const [testCaseOptions, setTestCaseOptions] = useState([
    {
      id: 1,
      description: '',
      preConditions: '',
      postConditions: '',
      index: 0,
    },
  ]);

  const deviceOptions = [
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  useEffect(() => {
    if (window.location.hostname === 'localhost')
      window.history.pushState(window.state, window.title, 'http://localhost:3000/#/donkey-car/test-cases');
    else
      window.history.pushState(window.state, window.title, 'https://yassoof.github.io/#/donkey-car/test-cases');
  }, []);

  function getData () {
    axios.get(serverUrl, { signal: controller.signal }).then(res => {
      setTestCaseOptions(res.data.map((item, i) => {
        return {
          id: item.id,
          description: item.description,
          preConditions: item.preConditions,
          postConditions: item.postConditions,
          index: i + 1,
        }
      }, this));
    }).catch(err => {
      if (err.name === 'AbortError')
        console.log('Successfully aborted.');
      else
        console.log(err);
    });
  }

  useEffect(() => {
    getData();
    return () => controller.abort();    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCaseOptions]);

  function runData () {
    if (currentIndex === 0) return;
    axios.post(`${serverUrl}/${testCaseOptions[currentIndex - 1].id}/run`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(err => {
          console.log(err);
      });
  }

  function rebuildToolTip() {
    ReactTooltip.rebuild();
  };

  function runTestCase(e){
    e.preventDefault();
    runData();
  }

  const close = useCallback(() => {
    setShowModal(false);
    setCanEdit(false);
  }, []);

  const edit = useCallback(() => {
    setCanEdit(true);
  }, []);

  const selectIndex = useCallback((selectedIndex) => {
    setCurrentIndex(selectedIndex);
  }, []);

  function deleteTestCase() {
    if (currentIndex === 0) return;
    axios.delete(`${serverUrl}/${testCaseOptions[currentIndex - 1].id}`);
    testCaseOptions.splice(currentIndex - 1, 1);
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
              onClick={(e) => { e.preventDefault(); setShowModal(true); setCanEdit(false); setNewCase(false); }}>
              <FaEye />
            </button>
            <ReactTooltip id='view' place="top" type="light" effect="solid"> View Selected Test Case </ReactTooltip>

            {/* Add */}
            <button data-tip data-for='add' className='not-button' style={{ color: '#4ac746' }}
              onClick={(e) => { e.preventDefault(); setShowModal(true); setCanEdit(true); setNewCase(true); }}>
              <FaPlus />
            </button>
            <ReactTooltip id='add' place="top" type="light" effect="solid"> Add New Test Case </ReactTooltip>

            {/* Delete */}
            <button data-tip data-for='delete' className='not-button' style={{ color: '#8a2516' }}
              onClick={(e) => { e.preventDefault(); deleteTestCase(); }} >
              <FaTrash />
            </button>
            <ReactTooltip id='delete' place="top" type="light" effect="solid"> Delete Selected Test Case </ReactTooltip>

          </label>
          <TestCaseSelect options={testCaseOptions} returnIndex={selectIndex} />
        </span>

        <span className='span' >
          <label style={{ textAlign: 'right' }}>
            <span style={{ margin: 'auto calc((50% - 2em) / 1.4) auto auto' }}>
              Select Device:
            </span>

            {/* Refresh */}
            <button data-tip data-for='refresh' className='not-button' style={{ color: '#3183e0' }}
              onClick={(e) => { e.preventDefault(); getData(); }} >
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

      {testCaseOptions.length === 0 && !canEdit ?
        null
        : < TestCaseModal
          index={currentIndex}
          options={testCaseOptions}
          isNewCase={newCase}
          show={showModal}
          edit={canEdit}
          canEdit={edit}
          onClose={close}
        />
      }
    </div>
  )
}

export default withAuthenticationRequired(TestCases, { onRedirecting: () => <Loading /> });