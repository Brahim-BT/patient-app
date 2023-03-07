import './App.css';
import { useEffect, useState } from "react";

function App() {

  const [patientList, setPatientList] = useState([]);
  const [debit, setDebit] = useState();
  const [volume, setVolume] = useState();
  const [time, setTime] = useState();
  const [selectSorB, setSelectSorB] = useState('Serum'); // selectSorB == select Serum or Blood
  const [selectTorD, setSelectTorD] = useState('Time'); // selectSorB == select Time or Debit
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (!isNaN(debit) && !isNaN(volume) && selectTorD === 'Debit' && selectSorB === 'Serum') setResult((volume / (4 * debit)).toFixed(2)) // toFixed(2) 
    if (!isNaN(time) && !isNaN(volume) && selectTorD === 'Time' && selectSorB === 'Serum') setResult((volume / (4 * time)).toFixed(2))
    if (!isNaN(debit) && !isNaN(volume) && selectTorD === 'Debit' && selectSorB === 'Blood') setResult((volume / (3 * debit)).toFixed(2))
    if (!isNaN(time) && !isNaN(volume) && selectTorD === 'Time' && selectSorB === 'Blood') setResult((volume / (3 * time)).toFixed(2))
  }, [debit, volume, time, selectTorD,selectSorB]);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  }

  const handleDebitChange = (e) => {
    setDebit(e.target.value);
  }

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  }

  const handleSelectTorD = (e) => {
    setSelectTorD(e.target.value)
  }

  const handleSelectSorB = (e) => {
    setSelectSorB(e.target.value)
  }

  const addPatient = () => { }

  return (
    <div className="App">
      <form>
        {
          selectTorD === 'Time' ?
            <div>
              <label>Time : </label>
              <input type={'number'} name={'time'} onChange={handleTimeChange} />
              <p>You typed: {time}</p>
            </div>
            :
            <div>
              <label>Debit : </label>
              <input type={'number'} name={'debit'} onChange={handleDebitChange} />
              <p>You typed: {debit}</p>
            </div>
        }
        <div>
          <label>Volume : </label>
          <input type={'number'} name={'volume'} onChange={handleVolumeChange} />
          <p>You typed: {volume}</p>
        </div>
        <div>
          <select value={selectTorD} onChange={handleSelectTorD}>
            <option value="Time">Time</option>
            <option value="Debit">Debit</option>
          </select>
          <p>Selected value: {selectTorD}</p>

          <select value={selectSorB} onChange={handleSelectSorB}>
            <option value="Serum">Serum</option>
            <option value="Blood">Blood</option>
          </select>
          <p>Selected value: {selectSorB}</p>

          <h4><label>Result of {selectTorD === 'Debit' ? 'Time' : 'Debit'} : {result}</label></h4>

        </div>
        <button type={'submit'} onSubmit={addPatient} >Add Patient</button>
      </form>
    </div>
  );
}

export default App;
