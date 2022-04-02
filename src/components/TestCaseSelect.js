import React from 'react';
import { useState } from 'react';

const TestCaseSelect = (props) => {
    const [testCase, setTestCase] = useState('Select...');
    function capitalize(string) {
        if (string)
            return string.charAt(0).toUpperCase() + string.slice(1);
        else return 'Default';
    }
    function handleChange(e) {
        setTestCase(e.currentTarget.value);
        props.returnId(e.currentTarget.value);
    }
    return (
        <select required value={testCase} onChange={(e) => handleChange(e)}>
            <option key={0} value='' hidden > {props.options.length > 0 ? 'Select...' : 'No Test Cases Found.'} </option>
            {
                props.options.map((item, _) => {
                    return (<option key={item.id} value={item.id}> {`${item.id}: ${capitalize(item.description)}`} </option>)
                }, this)
            }
        </select>
    )
}

export default TestCaseSelect