const nodaryEncoder = require('nodary-encoder');
const myEncoder = nodaryEncoder(17, 18); // Using GPIO17 & GPIO18

const Gpio = require('onoff').Gpio; // Gpio class
const led = new Gpio(24, 'out'); // Export GPIO24 as an output

let iv // = setInterval(_ => led.writeSync(led.readSync() ^ 1), 200) // Toggle the state of the LED connected to GPIO24 every 200ms


myEncoder.on('rotation', (direction, value) => {
  if (direction == 'R') {
    console.log('Encoder rotated right');
  } else {
    console.log('Encoder rotated left');
  }

  console.log('Value is', value);

  if (iv) clearInterval(iv); // reset blinking timer


  if (value > 0){
    // start blinking with timer value set by rotary encoder 
    iv = setInterval(_ => led.writeSync(led.readSync() ^ 1), 2000/value);
  }else{
    led.writeSync(0)
  }
});


 
