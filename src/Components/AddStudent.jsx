import React, {useState} from 'react'
import { nanoid } from 'nanoid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import "./AddStudent.css"
function AddStudent(props) {
    // id, firstName, lastName, photo
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[selectedFile, setSelectedFile] = useState();
    const[gradYear, setGradYear] = useState();

    const doWork= () => {
        const newStudent = {'id':nanoid(), 'firstName':firstName, 'lastName':lastName, 'email':email, 'gradYear':parseInt(gradYear), 'images':URL.createObjectURL(selectedFile)}
        props.addStudent(newStudent);
    }

    const imageUpdate = (event) => {
        setSelectedFile(event.target.files[0]);
    }

  return (
    
    <div className='row mt-4' id="addStudent">
<h3>Add Call of Duty Title</h3>
        <div className='col-md-2'>
            <label htmlFor='txtFirstName' className='form-label'>Game Title</label>
            <input type='text' id='txtFirstName' placeholder='Game Title' className='form-control' onChange={(evt) => setFirstName(evt.currentTarget.value)} value={firstName} />
        </div>
        
        <div className='col-md-2'>
            <label htmlFor='txtEmail' className='form-label'>Release Year</label>
            <input type='email' id='txtEmail' placeholder='Release Year' className='form-control' onChange={(evt) => setEmail(evt.currentTarget.value)} value={email} />
        </div>
        <div className='col-md-2'>
            <label htmlFor='txtGradYear' className='form-label'>Retail Price</label>
            <input type='text' id='txtGradYear' placeholder='Retail Price' className='form-control' onChange={(evt) => setGradYear(evt.currentTarget.value)} value={gradYear} />
        </div>
        <div className='col-md-2'>
        <label htmlFor='fileUpload' className='form-label'>Cover Image</label>
            <input type='file' name='file' id='fileUpload' onChange={imageUpdate} />
        </div>
        <div className='col-md-2'>
            <button type='button' id='btnAdd' className='btn btn-success btn-lg' onClick={doWork}>Add Title <FontAwesomeIcon icon={faPlusCircle} /></button>
        </div>
      
    </div>
  );
}

export default AddStudent;
