/**
 * Author: Armand Amores
 * Student Id: 000315902
 * Date: 05/03/2023
 * 
 * File is resposible for event listeners and dynamic events
 * Used to change images, update timers and tracks number of 
 * changes
 */


//Themes 
let arrayOfImages = [
    ["images/megatron.jpg", "images/starscream.jpg", "images/tilt.jpg"], //decepticons
    ["images/optimus.jpg", "images/omega.jpg", "images/bumblebee.jpg"], // autobots
    ["images/jet.png", "images/brunt.jpg", "images/truck.jpg"] // vehicles
];


//initialize images 
randomize(); // helper method found below... used to randomzie 3 images 

//This block of code is resposible for the randomization button and contains after effects 
//grab html elements 
let trackerEl = document.querySelector("#tracker span") 
let tracker = parseInt(trackerEl.innerText) // convert the string into an type Int to modify
let myButton = document.querySelector("#random")
myButton.addEventListener("click", function() { // randomize button press
    randomize(); 
    // updates tracker value
    tracker += 3; 
    trackerEl.innerText =  tracker;
    //
    clockValue = initialTime; // resets timer back to original value
    userInput = false; // used for tertiary opertor to decide what the timer value is
})


/**
 * Handles the event of when an image is pressed
 * 
 * @param {} event 
 */
function do_animation( event ) { 
    // console.log(event.target);
    // event.target.style.backgroundColor = "";
    
    //locate target user interacts with (in this case which image)
    target = event.srcElement; 
    target.classList.remove('transformCard'); // removes animation class from target
    
    //randomize a single image
    let randomColumn = Math.floor(Math.random() * 3) //generate random number for column side of index
    // each target has been given a data number in html file and it is used to navigate the index ROW
    target.src = arrayOfImages[target.getAttribute("data-number")][randomColumn]; 
    setTimeout( () => {target.classList.add('transformCard');}, 0 );  // adds animation class after short delay
    console.log(target)
    // update tracker
    tracker += 1; 
    trackerEl.innerText =  tracker ;
    // resets timer back to original value 
    clockValue = initialTime
    userInput = false;
}



//declaring variables and grabbing html elements needed for timer and timeout section
const initialTime = 12.0; //beginning time 
let timeOut = document.querySelector('#timeout');
let timer = document.querySelector("#timer span");
let userInput = false // used to indicate if user has made an input if, if true timeOut value used 

// tertiary operator to decide which timer value is used, the default or user input 
let clockValue = userInput ? timeOut.value : initialTime; 
let error = document.querySelector('#error'); 

/**
 * Used to make timer countdown. Clock value default to inital time if
 * userInput is false and uses timeOut value otherwise. This creates a dynamic
 * way to switch the timer.
 */
function clock() {
     
    clockValue = (clockValue - 0.1).toFixed(1); // decramenting by 0.1 and leaves it to one decimal place
    // Randomizes images at 0 and based on which timer is being used, resets based on that timer
    if (clockValue < 0 && !userInput) { 
        clockValue = initialTime; //back to default
        randomize();
        tracker += 3;
        trackerEl.innerText =  tracker ;
    } else if (clockValue < 0 && userInput) {
        clockValue = timeOut.value / 1000; // back to TimeOut value 
        randomize();
        tracker += 3;
        trackerEl.innerText =  tracker ;
    }

    //update value 
    timer.innerText = Number(clockValue);
    colorSetting(); // used for background color of timer
  
}
//begin countdown
let loadInitialTimer = setInterval(clock, 100);

// used for timeOut inputs
timeOut.addEventListener("input", () => {
    //prevents blank input 
    if (timeOut.value === '') {
        error.innerText = 'Input field cannot be blank.';
        timeOut.value = 2500;
        clockValue = timeOut.value / 1000
    //ensures values comply with range. Clears old timer, and refreshes with timeOut value
    }else if (timeOut.value  >= 499 && timeOut.value <=  10_001 && !isNaN(timeOut.value)){
        clearInterval(loadInitialTimer); //
        userInput = true; // if true, clockValue uses timeOut value 
        clockValue = (timeOut.value / 1000).toFixed(1); 
        loadInitialTimer = setInterval(clock, 100); // set new timer
        error.innerText = "" // erease error if there was one 
    }else { // error check
        error.innerText = "Invalid input. Please stay within integer between 500 - 10,000."
        timeOut.value = 2500;
        clockValue = timeOut.value / 1000
        
    }
    console.log(timeOut.value)
});


/**
 * Responsible for setting background color of timer
 */
function colorSetting(){
    // calculate the current third of the clock
    const totalSeconds = userInput ? timeOut.value / 1000 : initialTime;
    const currentThird = Math.floor((totalSeconds - clockValue) / (totalSeconds / 3));

    // change the background color based on the current third of the clock
    if (currentThird === 0) {
        timer.style.backgroundColor = "green";
        timer.style.color = "white";
    } else if (currentThird === 1) {
        timer.style.backgroundColor = "yellow";
        timer.style.color = "black";
    } else if (currentThird === 2) {
        timer.style.backgroundColor = "red";
        timer.style.color = "white";
    }
}

/**
 * Resposible for randomizing images 
 */
function randomize(){
    
    let counter = 0; //used to help iterate through theme according to index
    for(let i = 1; i <= 3; i++) {
        let sideEl = document.querySelector(`#side${i}`)//enables iteration of each side (image) in html 
       
        let randomColumn = Math.floor(Math.random() * 3);
        console.log("counter: " + counter + " randomColumn: " + randomColumn)
        
        sideEl.src = arrayOfImages[counter][randomColumn]; // counter enables proper selction of theme for each side 
        counter++
    }  
    
}











