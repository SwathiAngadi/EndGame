import { useEffect, useState } from "react";
import pastelButtonStyles from "./pastelButtonStyles";
import clsx from "clsx";
import { getFarewellText, getRandomWord } from "./Farewell";
import Confetti from 'react-confetti';

export default function GameComponent(){
 
    const colorChips = pastelButtonStyles;
    const [currentWord, setCurrentWord] = useState(()=>getRandomWord());
    const [guestArray, setGuestArray] = useState([]);
  
    const wrongGuessCount = pastelButtonStyles.length-1;
    const alphabet= "abcdefghijklmnopqrstuvwxyz";
    const wrongCount= guestArray.filter((item => !currentWord.includes(item))).length;
    const lastguessedLetter = guestArray[guestArray.length-1];
    const lastguessIncorrect =  lastguessedLetter && !currentWord.includes(lastguessedLetter);
    // const isGameWon  = guestArray.filter((item)=>currentWord.includes(item)) && guestArray.length >= currentWord.length && wrongCount<8 ;
    const isGameWon = currentWord.split("").every((letter)=>guestArray.includes(letter)) 
    const isGameLost = wrongCount >= wrongGuessCount;
    const isGameOver = isGameWon || isGameLost ;

  

    const dsiplayWord = currentWord.split("").map((letter,index)=>{
        const shouldReveal = guestArray.includes(letter) || isGameOver;
        return (
        <span key={index} 
        className={clsx("enteredLetter",isGameLost && !guestArray.includes(letter)&& "missedLetter")}>
            { shouldReveal ? letter.toUpperCase(): ""}
        </span>
        )
    });

    const display = colorChips.map((chip, index)=> {
        let disappear =  wrongCount>index;
      
        var Styles = {
            backgroundColor:chip.backgroundColor, 
            color:chip.textColor
        }
       return <span className={clsx("colorChip",{"lost":disappear})} 
       key={index} id={index} style={Styles}>{chip.language}</span>
       
    });
   
    const keyboard = alphabet.split("").map((key)=>{
       
         const isGuessed =  guestArray.includes(key);
         const isCorrect = isGuessed && currentWord.includes(key) ;
         const isWrong = isGuessed && !currentWord.includes(key);
        return (
            <button 
            key={key}
            disabled={isGameOver} 
            aria-disabled ={guestArray.includes(key)}
            aria-label={`Letter ${key}`}
            onClick={()=>handlekeyBoard(key)}
            className={clsx("button", {"exist": isCorrect, "nonexist": isWrong})}
            >
            {key.toUpperCase()}            
            </button>
        )
    });
    
    function handlekeyBoard(key){ 
        // if(isGameLost || isGameWon){
        //     event.stopPropogation();
        // }
        setGuestArray((prev)=>{
         return   prev.includes(key)? prev :[...prev,key];
        //     const letrSet = new Set(prev)
        //     letrSet.add(key)         
        //  return  Array.from(letrSet)
         
        })     
    }
    function renderStatusMessage(){
          if(!isGameOver && lastguessIncorrect)
          { 
            return <p>{getFarewellText(colorChips[wrongCount-1].language)}</p>
          }
          if(isGameWon)
            {
                return (
                    <>
                    <h4>You Win!</h4>
                    <span> Well done 🎉</span>
                    </>
                 )
           }else if(isGameLost){
                return ( 
                    <>
                    <h4>Game Over!</h4>
                    <span> You lose! Better start learning Assembly</span>
                    </>
                )
            }else return null;
     }
        
        function newGame(){
            console.log("New game")
            setCurrentWord(getRandomWord);
            setGuestArray([]);
        }

    return (
        <>
        {isGameWon && <Confetti recyle ={false} numberOfPieces={1000}/>}
        <div 
        className={
            clsx("gameStatus",
            {"gameWon":isGameWon, 
             "farewell": lastguessIncorrect && !isGameLost && !isGameWon,             
             "gameLost": isGameLost,
            })
        }
        aria-live="polite"
        role="status"
        >
          {renderStatusMessage()} 
        </div>
        <section className="chips">
            {display}
        </section>
        <section className="word" >
        {dsiplayWord}
        </section>
        <section className="sr-only" aria-live="polite" role="status">
            <p>{currentWord.includes(lastguessedLetter)?
            `Correct! The letter ${lastguessedLetter} is in the current word`:
            `Sorry! The letter ${lastguessedLetter} is not in the current word`}
            You have {wrongGuessCount}  attempts left
            </p>
            <p>Curent word {currentWord.split("").map((letter)=>
            guestArray.includes(letter)?letter+"." : "blank.").join("")}</p>
        </section>
        <section className="keySection">
            {keyboard}
        </section>
        {isGameOver ? <button className="newGame" onClick={newGame}> New Game</button>: null}
        </>
    )
}