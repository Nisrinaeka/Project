import React, { useEffect, useState } from "react";
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Update() {
    const navigate = useNavigate();

    const [icd_tens_id, setTensId] = useState('');
    const [icd_tens_name_english, setTensNameEnglish] = useState('');
    const [icd_tens_name_bahasa, setTensNameBahasa] = useState('');
    const [icd_tens_code, setTensCode] = useState('');
    const [icd_tens_type, setTensType] = useState('');

    useEffect(() => {
            setTensId(localStorage.getItem('icd_tens_id'))
            setTensNameEnglish(localStorage.getItem('icd_tens_name_english'));
            setTensNameBahasa(localStorage.getItem('icd_tens_name_bahasa'));
            setTensCode(localStorage.getItem('icd_tens_code'))
            setTensType(localStorage.getItem('icd_tens_type'))
    }, []);

    const updateAPIData = async () => {
        await axios.put(`https://643663bc8205915d34f23bf5.mockapi.io/api/v1/icd_ten/${icd_tens_id}`, {
            icd_tens_name_english, 
            icd_tens_name_bahasa, icd_tens_code,
            icd_tens_type
        })
        navigate('/read');
        window.location.reload();
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Tens Name English</label>
                    <input placeholder='First Name' value={icd_tens_name_english} onChange={(e) => setTensNameEnglish(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Tens Name Bahasa</label>
                    <input placeholder='Last Name' value={icd_tens_name_bahasa} onChange={(e) => setTensNameBahasa(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Tens Code</label>
                    <input placeholder='Last Name' value={icd_tens_code} onChange={(e) => setTensCode(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Tens Type</label>
                    <input placeholder='Last Name' value={icd_tens_type} onChange={(e) => setTensType(e.target.value)}/>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}