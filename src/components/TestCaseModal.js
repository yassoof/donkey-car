import React from 'react';
import '../css/form.css';
import { FaEdit } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import { useState, useEffect } from 'react';
import axios from 'axios';


const TestCaseModal = (props) => {

    const [desc, setDesc] = useState('');
    const [preCond, setPreCond] = useState('');
    const [postCond, setPostCond] = useState('');

    const serverUrl = 'http://localhost:8090/test-cases';

    useEffect(() => {
        clear();
        if (!props.isNewCase && props.index !== 0) {
            setDesc(props.options[props.index - 1].description);
            setPreCond(props.options[props.index - 1].preConditions);
            setPostCond(props.options[props.index - 1].postConditions);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.show])


    const data = {
        description: desc,
        preConditions: preCond,
        postConditions: postCond,
    }

    const postData = () => {
        axios.post(serverUrl, data)
            .then(res => {
                console.log(res);
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
    }

    const putData = () => {
        if (props.index !== 0) {
            axios.put(`${serverUrl}/${props.options[props.index - 1].id}`, data)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                });
        }
    }

    function clear() {
        setDesc('');
        setPreCond('');
        setPostCond('');
    }

    const rebuildToolTip = () => {
        ReactTooltip.rebuild();
    };

    const formHandler = (e) => {
        e.preventDefault();
        if (props.isNewCase) {
            postData();
        } else {
            putData();
        }
        props.onClose();
    }

    if (!props.show) {
        return null;
    }

    return (
        <div className='modalpane'>
            <form className='modal' onLoad={() => { rebuildToolTip() }} onSubmit={(e) => formHandler(e)}>
                <button className='not-button closebutton' onClick={(e) => { e.preventDefault(); props.onClose(); }} > &times; </button>

                {/* Id */}
                <label className='modal-label' >Test Case Id: </label>
                <input className='id-field' type='text'
                    value={!props.isNewCase && props.index >= 1 ? props.options[props.index - 1].id : '???'} 
                    disabled 
                />

                {/* Description */}
                <label className='modal-label' >Enter Test Case Description:</label>
                <textarea className='text-field' required value={desc} disabled={!props.edit} onChange={(e) => setDesc(e.target.value)} />

                {/* Pre-Conditions */}
                <label className='modal-label' >Enter Test Case Pre-Conditions:</label>
                <textarea className='text-field' required value={preCond} disabled={!props.edit} onChange={(e) => setPreCond(e.target.value)} />

                {/* Post-Conditions */}
                <label className='modal-label' >Enter Test Case Post-Conditions:</label>
                <textarea className='text-field' required value={postCond} disabled={!props.edit} onChange={(e) => setPostCond(e.target.value)} />

                {props.edit
                    ? <span>
                        <button className='formButton button' type='submit' data-tip data-for='save' >
                            Save
                        </button>
                        <ReactTooltip id='save' place="bottom" type="light" effect="solid"> Save Test Case </ReactTooltip>
                    </span>
                    : <span>
                        <button className='not-button' data-tip data-for='edit'
                            style={{ color: '#fad039', fontSize: '2em', margin: '0.2em auto' }}
                            onClick={(e) => { e.preventDefault(); props.canEdit(); }} >
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