//importing the pitches header file to get access to the different notes that the piezo buzzer can play
#include "pitches.h"

//the following buttons (button1-4) refer to the four tiles on the mini piano
int button1 = A0; 
int button2 = A1;
int button3 = A3;
int button4 = A4;

int controlButton = 3; //this is the on/off button.

int buzzerPin = 8; //the pin where the buzzer is connected

// notes in the melodies. We have four different melodies for each tile on the piano.
int melody1[] = {
  NOTE_C4, NOTE_G3, NOTE_G3, NOTE_A3, NOTE_G3, 0, NOTE_B3, NOTE_C4
};

int melody2[] = {NOTE_G3,NOTE_G3,NOTE_A3,NOTE_C4,0,0,NOTE_B3, NOTE_A3};

int melody3[] = {NOTE_A3, NOTE_G3, 0, NOTE_C4, NOTE_G3, NOTE_C4, 0, NOTE_C4};

int melody4[] = {NOTE_F7,NOTE_F2,NOTE_GS2,0,NOTE_GS3,NOTE_AS4,NOTE_G5,NOTE_E6};

// note durations: 4 = quarter note, 8 = eighth note, etc.:
int noteDurations[] = {
  4, 8, 8, 4, 4, 4, 4, 4
};

bool status = false; //is the program running? This is changed by pressing the button on the breadboard.
bool previousStatus = true; //stores the previous state of the program. This is needed to configure the button to work properly.

void setup(void) {
  pinMode(controlButton, INPUT);
  Serial.begin(9600);
}

void loop(void) {
  if(digitalRead(controlButton) == HIGH){
    if(status && !previousStatus || !status && previousStatus){ //has the button been pressed? Do we need to change state of the program from on to off or off to on?
      status = !status;
      previousStatus = status;
    }
  }
  if(status){
    //if the program is running, perform the following conditions
    if (analogRead(button1) > 0) {
      //is the force on the first tile greater than zero? (it's been pressed). Same condition for the remaining 3 buttons.
      playMelody(1); //Calls a function to play the corresponding melody.
    } else if (analogRead(button2) > 0) {
      playMelody(2);
    } else if (analogRead(button3) > 0) {
      playMelody(3);
    } else if (analogRead(button4) > 0) {
      playMelody(4);
    }
  }
  else{
    //the program is not running. Stop the tone.
    noTone(buzzerPin); 
  }

}

void playMelody(int melody){
  //function to play melodies that takes 1 integer argument.
  if(melody == 1){
    for (int thisNote = 0; thisNote < 8; thisNote++) {
      // to calculate the note duration, take one second divided by the note type.
      //e.g. quarter note = 1000 / 4, eighth note = 1000/8, etc.
      int noteDuration = 1000 / noteDurations[thisNote];
      tone(8, melody1[thisNote], noteDuration);

      // to distinguish the notes, set a minimum time between them.
      // the note's duration + 30% seems to work well:
      int pauseBetweenNotes = noteDuration * 1.30;
      delay(pauseBetweenNotes);
    }
  }

  else if(melody == 2){
      for (int thisNote = 0; thisNote < 8; thisNote++) {

    // to calculate the note duration, take one second divided by the note type.
    //e.g. quarter note = 1000 / 4, eighth note = 1000/8, etc.
    int noteDuration = 1000 / noteDurations[thisNote];
    tone(8, melody2[thisNote], noteDuration);

    // to distinguish the notes, set a minimum time between them.
    // the note's duration + 30% seems to work well:
    int pauseBetweenNotes = noteDuration * 1.30;
    delay(pauseBetweenNotes);
    }
  }

  else if(melody == 3){
      for (int thisNote = 0; thisNote < 8; thisNote++) {

    // to calculate the note duration, take one second divided by the note type.
    //e.g. quarter note = 1000 / 4, eighth note = 1000/8, etc.
    int noteDuration = 1000 / noteDurations[thisNote];
    tone(8, melody3[thisNote], noteDuration);

    // to distinguish the notes, set a minimum time between them.
    // the note's duration + 30% seems to work well:
    int pauseBetweenNotes = noteDuration * 1.30;
    delay(pauseBetweenNotes);
    }
  }
  else{
      for (int thisNote = 0; thisNote < 8; thisNote++) {

    // to calculate the note duration, take one second divided by the note type.
    //e.g. quarter note = 1000 / 4, eighth note = 1000/8, etc.
    int noteDuration = 1000 / noteDurations[thisNote];
    tone(8, melody4[thisNote], noteDuration);

    // to distinguish the notes, set a minimum time between them.
    // the note's duration + 30% seems to work well:
    int pauseBetweenNotes = noteDuration * 1.30;
    delay(pauseBetweenNotes);
    }
  }

  //Stop playing the melody once it is done.
  noTone(buzzerPin);
}
