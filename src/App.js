import React, { Component } from 'react'
import './App.css'
import butcherPig from './assets/butcherPig.jpeg'
import rules from './assets/rules.png'

class App extends Component{
  constructor(props){
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // "phrase" is the text entered by the user - right now there are test words hard coded to make the process of testing your code faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: "Hello! Charlie 2022 Cohort",
      // "phraseTranslated" is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the "submit" button
      phraseTranslated: "This is where your translated sentence will appear."
    }
  }

  // The "myPigLatinCodeHere" function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {
    // the variable "userInput" will contain the text input from the user modified into an array of words
    // no need to change this variable
    let userInput = this.state.phrase.split(" ")
    console.log("userInput:", userInput)

    // now that we have an array of words, we can map over the array and access each word
    let translatedWordsArray = userInput.map(currentWord => {
      // ACTION ITEM: use "currentWord" as a starting point for your code
      // console.log("currentWord:", currentWord)

      // let vowelsArray = currentWord.split("").filter(vowel => {
      //   return vowel === "a" || vowel === "e" || vowel === "i" || vowel === "o" || vowel === "u"
      // })
      // console.log("vowelsArray:", vowelsArray)

      // your code here!
      
      // Did not need vowel array when using regex
      
      //First find all the special cases
      //Case1: qu - move all consonants + u to the back and add ay
      //Case2: y - if y comes in the middle of the word or end of the word, its a vowel, if it comes first, its a consonant
      //Case3: vowel 0 index
      //Case4: anything else, find index of first vowel, move all prior consonants to back and add ay
      
      // First idea getting the idea for how to manipulate the string. We know that the general algorithm would be:
      // Find location of split
      // Do the actual split
      // Move the pieces around
      // and finally join them back with the necessary suffix
          //  let quSplit = currentWord.split(/(qu)/i)
          //  console.log("quArray:", quSplit)
          //  let quArr = []
          //  quArr.push(quSplit.shift())
          //  quArr.push(quSplit.shift())
          //  console.log("splitArr:", quArr)
          //  console.log("concat:", quSplit.toString() + quArr.join("")+"ay")
        
      //This is to keep track of the index of any "y"s
      let yIndex = currentWord.search(/[y]/i)
      //Track the index of the first instance of any vowel
      let firstVowelIndex = currentWord.search(/[aeiou]/i)
      
      //Track the index of the start of the qu pattern. We needed to add 2 to qu index before using substring, because .search will return the index of the start of the pattern
      let quIndex = currentWord.search(/qu/i)
            
      
       // The regex for this can be explained as follows:
       // Search current string for anything NOT in the range of a - z and NOT in the range of the given punctuations. The flag i is for a case-insensitive search.
       let incorrectIndex = currentWord.search(/[^a-z][^.,:!?"';`]/i)
       
       // We use the Number() on currentWord to force it into a number if possible. If it is a number, it will be converted, if not it will return NaN. Use isNan() to see if the string is a number, if it false, it is a number.
       let numCheck = Number(currentWord)
      console.log(currentWord)
      console.log("y index:", yIndex)
      console.log("first vowel index:", firstVowelIndex)
      console.log("qu index:", quIndex)
      console.log("incorrect:", incorrectIndex)
      
      
      if (isNaN(numCheck) === false){
        currentWord = numCheck.toString()
      } else if (incorrectIndex !== -1) {
        // This step checks for any non punctuation symbols and numbers and returns "NOTVALID"
          currentWord = "NOTVALID"
      } else if (firstVowelIndex === 0) {
        // This conditional checks to see if a vowel appears first and simply concats "way"
        currentWord = currentWord + "way"
      } else if (quIndex !== -1 && quIndex < firstVowelIndex){      
        // Check for special qu case 
          currentWord = currentWord.substring(quIndex+2) + currentWord.substring(0,quIndex+2)+"ay"    
      } else if (yIndex !== 0 && yIndex > 0) {
          if(firstVowelIndex === -1 || yIndex < firstVowelIndex){
          // Keep track of where "y" is. Because if "y" appears first it is treated as a consonant and if it appears later on, it counts as a vowel. Using the index of where the "y" appears, we can use substring to manipulate our string.
          currentWord = currentWord.substring(yIndex) + currentWord.substring(0, yIndex)+"ay"
          }
      } else if (firstVowelIndex !== 0 ){
        // Any other condition would mean that the vowel appears in the middle of the string with no other special conditions and the 
        currentWord = currentWord.substring(firstVowelIndex)+currentWord.substring(0,firstVowelIndex)+"ay"
      }
      // Once we have completed moving the parts around to create the pig latin patter, we check to see if there is punctuation.
      let punctIndex = currentWord.search(/[.,:!?"';`]/)
      // console.log("punctIndex:", punctIndex)
      // If there are punctuations, we need the index and use substring to move the parts around.
      if (punctIndex !== -1){
          currentWord = currentWord.substring(0, punctIndex)+currentWord.substring(punctIndex + 1) + currentWord.substring(punctIndex, punctIndex+1)
      }
 
      // If there are any capital letters we just need to lowercase the substring and capitalize the first character because the currentWord is already translated at this point.
      let capitalCheck = currentWord.search(/[A-Z]/)
      console.log("cap:", capitalCheck)
      if (capitalCheck !== -1){
        currentWord = currentWord[0].toUpperCase() + currentWord.substring(1).toLowerCase()
      }
 
      // Remember: console.log is your friend :)


      // ACTION ITEM: change the value of currentWord to the name of whatever variable you made containing your Pig Latin'd word
      return currentWord
    })


    // joining the array back to a string of translated words
    // no need to change this variable
    let translatedWords = translatedWordsArray.join(" ")
    // console.log("translatedWords:", translatedWords)

    // the setState method will take your information from "translatedWords" and update the state object that is displayed to the user
    // no need to change this method
    this.setState({phraseTranslated: translatedWords})
  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: "alpha through yummy squeal queen fry",
      phraseTranslated: "This is where your translated sentence will appear."
    })
  }

  // no need to modify this method
  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    e.preventDefault()
    this.myPigLatinCodeHere()
  }

  // no need to modify this method
  handleInput = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    this.setState({phrase: e.target.value})
  }

  render() {
    return (
      <>
        <h1>Pig Latin Translator</h1>
        <h3>"Igpay Atinlay Anslatortray"</h3>
        
          <div className = "container">
            <div className = "secret">
              <img 
                src={butcherPig}
                alt="pig with butcher cut names in pig latin"
                className="butcherPig"
              />
                <div className = "hide">
              <img
                src={ rules }
                alt="pig latin rules"
                className="rules"
              />
            </div>
            </div>
          
          </div>
        <div className="inputArea">
          <h4 className="directions">Enter phrase to be translated:</h4>
          {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
          <input 
            type="text"
            className="userInput"
            onChange={this.handleInput}
            value={this.state.phrase}
          />
          <br />
          {/* button that called the setUpPreventDefault method which calls the myPigLatinCodeHere method */}
          <button onClick={this.setUpPreventDefault}>Submit</button>
          <button onClick={this.restartGame}>Clear</button>
        </div>
        
        <p className = "translate">{this.state.phraseTranslated}</p>
        
        <div className = "marquee">
        <footer>Coded by ~Don and Collin~</footer>
        </div>
      </>
    )
  }
}

export default App
