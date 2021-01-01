const EventEmitter = require('events').EventEmitter;
const Gpio = require('onoff').Gpio;

/**
 * Creates a new Nodary Encoder using two GPIO pins
 * Expects the pins to be configured as pull-up
 *
 * @param pinA GPIO # of the first pin
 * @param pinB GPIO # of the second pin
 *
 * @returns EventEmitter
 */ 

function NodaryEncoder(pinA, pinB) {
	this.gpioA = new Gpio(pinA, 'in', 'both');
	this.gpioB = new Gpio(pinB, 'in', 'both');

	this.a = 2;
	this.b = 2;

	this.value = 0;
	this.state = "00";
	this.direction = null;

	this.gpioA.watch((err, value) => {
		if (err) {
			this.emit('error', err);

			return;
		}

		this.a = value;
		this.tick();
	});

	this.gpioB.watch((err, value) => {
		if (err) {
			this.emit('error', err);

			return;
		}

		this.b = value;
		this.tick();
	});
}

NodaryEncoder.prototype = EventEmitter.prototype;

NodaryEncoder.prototype.tick = function tick() {
	const { a, b } = this;

	var newState = `S${a}${b}`;

	if (this.state == "S00"){ // Resting position
		if (newState == "S01") // Turned right 1
			this.direction = "R"
		else if (newState == "S10") // Turned left 1
			this.direction = "L"

	}else if (this.state == "S01"){ // R1 or L3 position
		if (newState == "S11"){ // Turned right 1
			this.direction = "R"
		}else if (newState == "S00"){ // Turned left 1
			if (this.direction == "L"){
				this.value --
			}
		}

	}else if (this.state == "S10"){ // R3 or L1
		if (newState == "S11"){ // Turned left 1
			this.direction = "L"
		}else if (newState == "S00"){ // Turned right 1
			if (this.direction == "R"){
				this.value ++
			}
		}

	}else{ // this.state == "11"
		if (newState == "S01") // Turned left 1
			this.direction = "L"
		else if (newState == "S10") // Turned right 1
			this.direction = "R"
		else if (newState == "S00"){ // Skipped an intermediate 01 or 10 state, but if we know direction then a turn is complete
			if (this.direction == "L")
				this.value --
			else if (this.direction == "R")
				this.value ++
		}
	}

	this.state = newState

	this.emit('rotation', this.direction, this.value)

	return this;
};

module.exports = function nodaryEncoder(pinA, pinB) {
	return new NodaryEncoder(pinA, pinB);
};