const nodaryEncoder = require('nodary-encoder');
const myEncoder = nodaryEncoder(17, 18); // Using GPIO17 & GPIO18

const Gpio = require('onoff').Gpio; // Gpio class
const led = new Gpio(24, 'out'); // Export GPIO24 as an output

myEncoder.on('rotation', (direction, value) => {
  if (direction == 'R') {
    console.log('Encoder rotated right');
  } else {
    console.log('Encoder rotated left');
  }

  console.log('Value is', value);

  if (value > 0){
    led.writeSync(1)
  }else{
    led.writeSync(0)
  }
});