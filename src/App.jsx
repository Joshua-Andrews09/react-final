import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from 'nanoid';
import AddStudent from './Components/AddStudent';
import _ from 'lodash';
import Student from './Components/Student';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';


function App() {

  const [allStudents, setAllStudents] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [gradYear, setGradYear] = useState('');

  useEffect(() => {

if(localStorage){
  const studentsLocalStorage = JSON.parse(localStorage.getItem('students'));

if(studentsLocalStorage){
  saveStudents(studentsLocalStorage);
}

else{
  saveStudents(student)

}

   
   
 } }, []);

  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);
    if(localStorage){
      localStorage.setItem('students', JSON.stringify(students));
      console.log("saved to local storage");
    }
   
  };

  const addStudent = (newStudent) => {
    const updatedStudents = [...allStudents, newStudent];
    saveStudents(updatedStudents)
};

  const searchStudents = () => {
    let keywordsArray = [];

    if(keywords){
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if(gradYear){
      keywordsArray.push(gradYear.toString());
    }

    if(keywordsArray.length > 0){
      const searchResults = allStudents.filter(student => {
        for(const word of keywordsArray){
          if(student.firstName.toLowerCase().includes(word) || 
          student.lastName.toLowerCase().includes(word) || 
          student.gradYear === parseInt(word)){
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    }else{
      setSearchResults(allStudents);
    }
  }

  const removeStudent = (studentToDelete) => {
    // console.table(studentToDelete)
     const updatedStudentsArray = allStudents.filter(student => student.id !== studentToDelete.id);
     saveStudents(updatedStudentsArray);
   }

  const updateStudent = (updatedStudent) => {
//console.table(updatedStudent);
const updatedStudentsArray = allStudents.map(student => student.id === updatedStudent.id ? {...student,...updatedStudent } : student)
saveStudents(updatedStudentsArray);
  }

  const student = [{
    id: nanoid(),
    firstName: "Call of Duty",
    lastName: "Release Year 2003",
    email: "Retail Price $60",
    images:'images/cod1.jpg',
    gradYear: 2003

  }, {
    id: nanoid(),
    firstName: "Call of Duty: 2",
    lastName: "Release Year: 2005",
    email: "Retail Price $60",
    images:'images/cod2.jpg',
    gradYear: 2005
    
  }, {
    id: nanoid(),
    firstName: "Call of Duty: 3",
    lastName: "Release Year: 2005",
    email: "Retail Price $60",
    images:'images/cod3.jpg',
    gradYear: 2006
  }, {
    id: nanoid(),
    firstName: "Call of duty: 4",
    lastName: "Release Year: 2005",
    email: "Retail Price $60",
    images:'images/cod4.jpg',
    gradYear: 2007
  }, {
    id: nanoid(),
    firstName: "Call of Duty: WaW",
    lastName: "Release Year: 2005",
    email: "Retail Price $60",
    images:'images/codwaw.jpg',
    gradYear: 2008
  }, {
    id: nanoid(),
    firstName: "Call of Duty: MW2",
    lastName: "Release Year: 2005",
    email: "Retail Price $60",
    images:'images/codmw2.jpg',
    gradYear: 2009
  }, {
    id: nanoid(),
    firstName: "Call of Duty: BO1",
    lastName: "Release Year: 2005",
    email: "Retail Price $60",
    images:'images/blops1.png',
    gradYear: 2010
  }, {
    id: nanoid(),
    firstName: "Call of Duty: MW3",
    lastName: "Release Year: 2005",
    email: "Retail Price $60",
    images:'./images/mw3_cover.jpg',
   gradYear: 2011
  }, {
    id: nanoid(),
    firstName: "Call of Duty: BO2",
    lastName: "Release Year: 2005",
    email: "Retail Price $60",
    images:'images/blops2.jpg',
    gradYear: 2012
  }, {
    id: nanoid(),
    firstName: "Call of Duty: Ghosts",
    lastName: "Release Year: 2005",
    email: "Retail Price $70",
    images:'images/cod-ghosts.jpg',
    gradYear: 2013
  }];
  

  return (

    <div className='container'>
      <div className='row' id="allStudents">
        {searchResults && searchResults.map((student) =>
        (      <div className='col-lg-2'key={student.id}>
               <Student student={student} removeStudent={removeStudent} updateStudent={updateStudent} />
        
      </div>)
        )}

      </div>
      {/*!allStudents && <button type="button" className='btn btn-lg btn-success' onClick={() => saveStudents(students)}>Save Students</button>*/}
      <AddStudent addStudent={addStudent}/>
      <div className='row mt-4' id="searchStudent">
        <h3>Search Call of Duty Title</h3>
        <div className='col-md-4'>
          <label htmlFor='txtKeyworkds'>Search by Game Title</label>
          <input type='text' className='form-control' placeholder='Game Title' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords}/>
        </div>
        <div className='col-md-4'>
          <select value={gradYear} onChange={evt => setGradYear(evt.currentTarget.value)} className='form-select'>
            <option value=''>Select Year</option>
            {_(allStudents).map(student => student.gradYear).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}          </select>
        </div>
        <div className='col-md-4'>
          <button type='button' className='btn btn-primary' onClick={searchStudents}>Search Title <FontAwesomeIcon icon={faSearch} /></button>
        </div>
      </div> 
    </div>
  )
}

export default App
