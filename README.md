# nodary-encoder

Based off https://github.com/nstansby/rpi-rotary-encoder-python & https://github.com/pichfl/onoff-rotary:
event-based *NodeJS* lib that relies on https://github.com/fivdi/onoff to get *rotary encoder* (such as https://thepihut.com/products/rotary-encoder-extras) data from *GPIO* pins on *Raspberry Pi*.

## Installation
```shell
npm i nodary-encoder --save
```

## Usage
```js
const nodaryEncoder = require('nodary-encoder');
const myEncoder = nodaryEncoder(17, 18); // Using GPIO17 & GPIO18

myEncoder.on('rotation', (direction, value) => {
  if (direction == 'R') {
    console.log('Encoder rotated right');
  } else {
    console.log('Encoder rotated left');
  }

  console.log('Value is', value);
});
```
