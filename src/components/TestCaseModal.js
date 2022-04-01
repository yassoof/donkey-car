import React from 'react';
import '../css/form.css';
import { FaEdit } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import { useState } from 'react';


const TestCaseModal = (props) => {

    const [id, setId] = useState(0);
    const [description, setDescription] = useState('');
    const [preConditions, setPreConditions] = useState('');
    const [postConditions, setPostConditions] = useState('');

    function clear() {
        setDescription('');
        setPreConditions('');
        setPostConditions('');
    }

    function formatResult() {
        return description + ";" + preConditions + ";" + postConditions;
    }

    const rebuildToolTip = () => {
        ReactTooltip.rebuild();
    };

    const formHandler = (e) => {
        let result = formatResult();
        console.log(result);
        clear();
        e.preventDefault();
        props.onClose();
    }

    if (!props.show) {
        return null;
    }

    return (
        <div className='modalpane'>
            <form className='modal' onLoad={() => { rebuildToolTip() }} onSubmit={(e) => formHandler(e)}>
                <button className='not-button closebutton' onClick={(e) => { props.onClose(e); }} > &times; </button>
                <label >Enter Test Case Id: </label>
                <input type='number' value={id} disabled />
                <label>Enter Test Case Description:</label>
                <textarea value={description} disabled={!props.edit} onChange={(e) => setDescription(e.target.value)} />
                <label>Enter Test Case Pre-Condition:</label>
                <textarea value={preConditions} disabled={!props.edit} onChange={(e) => setPreConditions(e.target.value)} />
                <label>Enter Test Case Post-Condition:</label>
                <textarea value={postConditions} disabled={!props.edit} onChange={(e) => setPostConditions(e.target.value)} />
                {props.edit
                    ? <span>
                        <button className='formButton button' type='submit' data-tip data-for='save' >
                            Save
                        </button>
                        <ReactTooltip id='save' place="bottom" type="light" effect="solid"> Save Test Case </ReactTooltip>
                    </span>
                    : <span>
                        <button className='not-button' data-tip data-for='edit' 
                        style={{ color: '#fad039', fontSize:'2em', margin:'1em auto 0 auto' }}
                            onClick={(e) => { props.canEdit(e); }} >
                            <FaEdit />
                        </button>
                        <ReactTooltip id='edit' place="bottom" type="light" effect="solid"> Edit Selected Test Case </ReactTooltip>
                    </span>
                }
            </form>
        </div>
    )
}

export default TestCaseModal