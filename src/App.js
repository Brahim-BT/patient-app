import './App.css';
import { useEffect, useState } from "react";
import Modal from './Modal';
import { nanoid } from 'nanoid';

function App() {

  const getPatientList = () => {
    const patientList = localStorage.getItem("patientList")
    return patientList ? JSON.parse(patientList) : [];
  }

  const [patientList, setPatientList] = useState(getPatientList());
  const [roomNum, setRoomNum] = useState();
  const [entreeNum, setEntreeNum] = useState();
  const [fullName, setFullName] = useState();
  const [debit, setDebit] = useState();
  const [volume, setVolume] = useState();
  const [hourVal, setHourVal] = useState();
  const [selectSorB, setSelectSorB] = useState('Serum'); // selectSorB == select Serum or Blood
  const [selectTorD, setSelectTorD] = useState('Time'); // selectSorB == select Time or Debit
  const [result, setResult] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isNaN(debit) && !isNaN(volume) && selectTorD === 'Debit' && selectSorB === 'Serum') setResult((volume / (3 * debit)).toFixed(2))
    if (!isNaN(hourVal) && !isNaN(volume) && selectTorD === 'Time' && selectSorB === 'Serum') setResult((volume / (3 * hourVal)).toFixed(2))
    if (!isNaN(debit) && !isNaN(volume) && selectTorD === 'Debit' && selectSorB === 'Blood') setResult((volume / (4 * debit)).toFixed(2))
    if (!isNaN(hourVal) && !isNaN(volume) && selectTorD === 'Time' && selectSorB === 'Blood') setResult((volume / (4 * hourVal)).toFixed(2))
    localStorage.setItem("patientList", JSON.stringify(patientList));
  }, [debit, volume, hourVal, selectTorD, selectSorB, patientList, result, setResult]);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  }

  const handleDebitChange = (e) => {
    setDebit(e.target.value);
  }

  const handleTimeChange = (e) => {
    setHourVal(e.target.value);
  }

  const handleSelectTorD = (e) => {
    setSelectTorD(e.target.value)
  }

  const handleSelectSorB = (e) => {
    setSelectSorB(e.target.value)
  }

  const handleRoomNumberChange = (e) => {
    setRoomNum(e.target.value)
  }
  const handleEntryNumberChange = (e) => {
    setEntreeNum(e.target.value)
  }
  const handleFullNameChange = (e) => {
    setFullName(e.target.value)
  }

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setDebit(0)
    setVolume(0)
    setHourVal(0)
    setSelectSorB('Serum')
    setSelectTorD('Time')
    setResult(0)
    setIsOpen(false)
  };

  const addPatient = (e) => {
    e.preventDefault();
    const newPatient = {
      id: nanoid(),
      fullname: fullName,
      roomnumber: roomNum,
      entreenumber: entreeNum,
      type: selectSorB,
      hour: getHours(result),
      time: getTimeFromHours(result)
    };
    setResult(0)
    setHourVal(0)
    setPatientList([...patientList, newPatient])
    setIsOpen(false)
  }

  function getHours(h) {
    const ms = h * 60 * 60 * 1000;
    const date = new Date();
    date.setTime(ms);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  function getTimeFromHours(h) {
    // convert hours to milliseconds
    const ms = h * 60 * 60 * 1000;

    // create a new date object and add the milliseconds
    const date = new Date();
    date.setTime(date.getTime() + ms);

    // extract hours, minutes, and seconds from the date object
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // return the time in the format "hh:mm:ss"
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className="App">
      <table className='shadow-2xl border-2 border-collapse border-green-200 w-full table-auto'>
        <thead className=' text-white'>
          <tr>
            <th className='bg-green-800 py-3'>full Name</th>
            <th className='bg-green-800 py-3'>Room Number</th>
            <th className='bg-green-800 py-3'>Entry Number</th>
            <th className='bg-green-800 py-3'>Type</th>
            <th className='bg-green-800 py-3'>Hours Amount</th>
            <th className='bg-green-800 py-3'>Will end in</th>
          </tr>
        </thead>
        <tbody className='text-green-900 text-center'>
          {
            patientList.map(patient => {
              return (
                <tr className='hover:bg-green-100 bg-green-200 cursor-pointer duration-300' key={patient.id}>
                    <td className=' py-3 px-3'>{patient.fullname}</td>
                    <td className=' py-3 px-3'>{patient.roomnumber}</td>
                    <td className=' py-3 px-3'>{patient.entreenumber}</td>
                    <td className=' py-3 px-3'>{patient.type}</td>
                    <td className=' py-3 px-3'>{patient.hour}</td>
                    <td className=' py-3 px-3'>{patient.time}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div>
        <div className="fixed bottom-0 right-0 mb-4 mr-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={openModal}>
            +
          </button>
        </div>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className='flex justify-between w-full items-center'>
            <p className='text-4xl mb-5'>Add new Patient</p>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-3 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={closeModal}>
              X
            </button>
          </div>
          <form onSubmit={addPatient}>
            <div className='grid grid-cols-2 gap-x-5 gap-y-5 mb-14'>
              <div className='col-span-2'>
                <label>Full Name : </label>
                <input className='form-input rounded-lg w-full' type={'text'} name={'full-name'} onChange={handleFullNameChange} />
              </div>
              <div>
                <label>Room Number : </label>
                <input className='form-input rounded-lg w-auto' type={'number'} name={'room-number'} onChange={handleRoomNumberChange} />
              </div>
              <div>
                <label>Entry Number : </label>
                <input className='form-input rounded-lg w-auto' type={'number'} name={'entry-number'} onChange={handleEntryNumberChange} />
              </div>
              {
                selectTorD === 'Time' ?
                  <div>
                    <label>Time : </label>
                    <input className='form-input rounded-lg w-auto' type={'number'} name={'time'} onChange={handleTimeChange} />
                  </div>
                  :
                  <div>
                    <label>Debit : </label>
                    <input className='form-input rounded-lg' type={'number'} name={'debit'} onChange={handleDebitChange} />
                  </div>
              }
              <div>
                <label>Volume : </label>
                <input className='form-input rounded-lg' type={'number'} name={'volume'} onChange={handleVolumeChange} />
              </div>
              <select className='form-select rounded-lg' value={selectTorD} onChange={handleSelectTorD}>
                <option value="Time">Time</option>
                <option value="Debit">Debit</option>
              </select>
              <select className='form-select rounded-lg' value={selectSorB} onChange={handleSelectSorB}>
                <option value="Serum">Serum</option>
                <option value="Blood">Blood</option>
              </select>
            </div>
            <div className='text-center'>
              <div className=' text-xl mb-4 font-semibold'>
                {
                  selectTorD === "Debit" ?
                    <label>The serum will end in {result} {Math.floor(result) > 1 ? 'hours' : 'hour'} or in {getTimeFromHours(result)}</label>
                    :
                    <label>The debit is {result} drop/min</label>

                }
              </div>
              <button className='w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-3 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm' type={'submit'}>Add Patient</button>
            </div>
          </form>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
