import './App.css';
import { useEffect, useState } from "react";
import Modal from './Modal';

function App() {

  const [patientList, setPatientList] = useState([]);
  const [debit, setDebit] = useState();
  const [volume, setVolume] = useState();
  const [time, setTime] = useState();
  const [selectSorB, setSelectSorB] = useState('Serum'); // selectSorB == select Serum or Blood
  const [selectTorD, setSelectTorD] = useState('Time'); // selectSorB == select Time or Debit
  const [result, setResult] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isNaN(debit) && !isNaN(volume) && selectTorD === 'Debit' && selectSorB === 'Serum') setResult((volume / (4 * debit)).toFixed(2)) // toFixed(2) 
    if (!isNaN(time) && !isNaN(volume) && selectTorD === 'Time' && selectSorB === 'Serum') setResult((volume / (4 * time)).toFixed(2))
    if (!isNaN(debit) && !isNaN(volume) && selectTorD === 'Debit' && selectSorB === 'Blood') setResult((volume / (3 * debit)).toFixed(2))
    if (!isNaN(time) && !isNaN(volume) && selectTorD === 'Time' && selectSorB === 'Blood') setResult((volume / (3 * time)).toFixed(2))
  }, [debit, volume, time, selectTorD, selectSorB]);

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

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return (
    <div className="App">
      <div>
        <div class="fixed bottom-0 right-0 mb-4 mr-4">
          <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
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
          <form>
            <div className='grid grid-cols-2 gap-x-5 gap-y-5 mb-14'>
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
                <label>Result of {selectTorD === 'Debit' ? 'Time' : 'Debit'} : {result}</label>
              </div>
              <button className='w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-3 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm' type={'submit'} onSubmit={addPatient} >Add Patient</button>
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
