/*
 Name:		arduino.ino
 Created:	20.05.2018 21:15:23
 Author:	Felix Lemke
* CE   - 7
* CSN  - 8
* MOSI - 11
* MISO - 12
* SCK  - 13
* GND  - GND
* VCC  - 3.3V
* Servo Wiring:
* VCC  - 5V
* GND  - GND
* CTRL - 2
*/

#include <SPI.h>
#include <RF24.h>
#include "printf.h"
#include <Servo.h>
#include <stdlib.h>
#include <stdio.h>

// Define Pins for NRF24
#define CE_PIN 7
#define CSN_PIN 8

// Define Pins for Servos
#define MOTOR 2
#define CHANNEL_1 3
#define CHANNEL_2 4
#define CHANNEL_3 5
#define CHANNEL_4 6

Servo servo[5]; // 4=motor, 0=left, 1=right=-left, 2=height-ctr, 3=side-ctr

uint64_t rxPipe = 0xF0F0F0F0D2;
uint64_t txPipe = 0xF0F0F0F0E1;
RF24 radio(CE_PIN, CSN_PIN);
unsigned long servoWrite = 0, readBattery = 0, lastSignal = 0;

uint8_t i = 0;
uint8_t data[5] = {0,90,90,90,90};
uint8_t motorWithoutSignal = 0;

unsigned long durationWithoutSignal = 1000; // [ms]

// Function that printf and related will use to print
/* int serial_putchar(char c, FILE* f) {
   return Serial.write(c) == 1? 0 : 1;
}
FILE serial_stdout; */

void setup() {
	// Serial.begin(115200);
  // fdev_setup_stream(&serial_stdout, serial_putchar, NULL, _FDEV_SETUP_WRITE);
  // stdout = &serial_stdout;
	
  radio.begin();
	delay(100);

	radio.setPALevel(RF24_PA_HIGH);
	radio.setDataRate(RF24_1MBPS);
	radio.setPayloadSize(5);
	radio.setChannel(90);

	radio.openReadingPipe(1, rxPipe);
	radio.openWritingPipe(txPipe);
	radio.startListening();
	delay(100);
  // radio.printDetails();
 
	servo[0].attach(MOTOR);
	servo[1].attach(CHANNEL_1);
	servo[2].attach(CHANNEL_2);
	servo[3].attach(CHANNEL_3);
	servo[4].attach(CHANNEL_4);
	delay(100);
}

void loop() {
	byte pipeNo;
	while(radio.available(&pipeNo)) {
		radio.read(&data, 5);
		lastSignal = millis();
	}

	/* if (millis() - readBattery > 500) {
		voltage = analogRead(0) / 1024.0 * 5 * 2.5 / 1.1 * 10;
		// Serial.println(voltage);
		readBattery = millis();
	} */

	if (millis() - servoWrite > 5) {
		if (millis() - lastSignal > durationWithoutSignal) {
			data[0] = motorWithoutSignal;
		}

		for (uint8_t i = 0; i < 5; i++) {
			setServo(i, data[i]);
		}
		servoWrite = millis();
	}
}

void setServo(uint8_t id, uint8_t value) {
	if (value != NULL && value >= 0 && value <= 180) {
		servo[id].write(value);
	}
}