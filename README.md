# Smart-Calculator Web-Application Using Javascript
Voice based calculator

### List of contents

- [Introduction](#introduction)
- [Working](#working)
- [Installation](#installation)
- [Technology Used](#technology-used)

## Introduction
---
[(Back to top)](#list-of-contents)

A calculator with basic operation (+,-,*,/,%,^), with manual as well as voice input option. This applicaion is for lazy person who can't type the full equation, so they can simply get there results by saying the equation.

![image](https://user-images.githubusercontent.com/32899655/87076894-f9ecdf00-c23f-11ea-9015-83b015a243bc.jpg)

![image(1)](https://user-images.githubusercontent.com/32899655/87076940-0a9d5500-c240-11ea-86fd-cc2b989dbfec.jpg)

## Working
---
[(Back to top)](#list-of-contents)

## Steps for speech recognition
 - For recording, we have use the SpeechRecognition interface of the Web Speech API.
 - Create a new SpeechRecognition object instance using the SpeechRecognition() constructor.
 - start() of SpeechRecognition will Start the speech recognition service, listening to incoming audio. 
 - The onresult event handler will be fired when the speech recognition service returns a result, as in it fires when the user stoped speaking. 
 - Finally, get the transcript of the speech recognition. 
 
 ## Steps to manipulate the voice input
 - Set the voice input to the output section of the calcultor & after 2s the output section will be overridden by the result.
 - To evaluate the equation the whitespaces are removed from the string and then passed to function evaluate().
 - Define a function called evaluate() for the above functionality.
 - Call the evaluate() after 2s using setInterval method in Javascript. 
 - Now, put our evaluate1() function under a try catch block. if it works, it will print the result. if it doesn't, it comes to catch block where the output is set to warning to Speak Again & the exception is printed into the console

## Installation
---
[(Back to top)](#list-of-contents)

- Run the index.html file to start using the calculator.
- Note : To use voice input active internet connection is required.
- Note : Web Speech API is not fully supported by all the browser, so tryto us this application in Google Chrome(*Firefox doesnot Support WEb Speech API).

## Technology Used
---
[(Back to top)](#list-of-contents)
 - HTML
 - CSS
 - Javascript
