import './App.scss';
import React, { useState, useEffect } from 'react';


const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];




function App() {
  const [bank, setBank] = useState(bankOne);

  const [id, setID] = useState('');

  var keyArray = []; // list of all keyTriggers in UPPER case
  bankOne.forEach((pad) => { keyArray.push(pad.keyTrigger) });


  function DrumPadMaker(pad) { //pad is an Obj

    return (
      <div id={pad.id} className="drum-pad" onClick={handleClick}>
        {pad.keyTrigger}
        <audio src={pad.url} className="clip" id={pad.keyTrigger} preload="auto"></audio>
      </div>
    )
  }

  function handleClick(e) {
    let currentID = e.target.id;
    setID(currentID);
    let audioID = bank.find((pad) => { return pad['id'] === currentID ? pad : undefined }).keyTrigger;
    let audio = document.getElementById(audioID);
    audio.play();
  }

  function toggleBank() {
    let checkbox = document.querySelector('input');
    if (checkbox.checked) {
      setBank(bankTwo);
    } else {
      setBank(bankOne);
    }
  }

  useEffect(() => {
    window.addEventListener("keypress", onKeyPress)
  })

  function onKeyPress(e) {
    let pressedKey = e.key.toUpperCase();

    if (keyArray.includes(pressedKey)) {
      let currentID = bank.find((pad) => { return pad['keyTrigger'] === pressedKey ? pad : undefined }).id;
      setID(currentID);
      let audio = document.getElementById(pressedKey);
      audio.play();
    } else {
      setID('');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div id="drum-machine">

          <div className="flex-container">
            {bank.map(pad => DrumPadMaker(pad))}
          </div>
          <div className="controllers">
            <div className="toggle">
              {bank[0]['id'] === 'Heater-1' ? 'Bank 1' : 'Bank 2'}<br />
              <label className="switch" >
                <input type="checkbox" onClick={toggleBank}/>
                <span className="slider round"></span>
              </label>
            </div>
            <div id="display">{id}</div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;  