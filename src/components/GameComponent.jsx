import { useState } from "react";
import pastelButtonStyles from "./pastelButtonStyles";
import clsx from "clsx";

export default function GameComponent(){
 
    const colorChips = pastelButtonStyles;
    const [currentWord, setCurrentWord] = useState("react".split(""));
    const [guestArray, setGuestArray] = useState([]);
  
  
    const alphabet= "abcdefghijklmnopqrstuvwxyz";
    const wrongCount= guestArray.filter((item => !currentWord.includes(item))).length;
   
   // const isGameWon  = guestArray.filter((item)=>currentWord.includes(item)) && guestArray.length >= currentWord.length && wrongCount<8 ;
   const isGameWon = currentWord.every((letter)=>guestArray.includes(letter)) 
   console.log("iS game won", isGameWon);
    const isGameLost = wrongCount >= pastelButtonStyles.length-1;
    const isGameOver = isGameWon || isGameLost ;
    const dsiplayWord = currentWord.map((letter)=>{
        return (
        <span key={letter} className="enteredLetter">
            {guestArray.includes(letter) ? letter.toUpperCase(): ""}
        </span>
        )
    });

    const display = colorChips.map((chip, index)=> {
        let disappear =  wrongCount>index;
      
        var Styles = {
            backgroundColor:chip.backgroundColor, 
            color:chip.textColor
        }
       return <span className={clsx("colorChip",{"lost":disappear})} key={index} id={index} style={Styles}>{chip.language}</span>
       
    });
   
    const keyboard = alphabet.split("").map((key)=>{
       
         const isGuessed =  guestArray.includes(key);
         const isCorrect = isGuessed && currentWord.includes(key) ;
         const isWrong = isGuessed && !currentWord.includes(key);
        return (
            <button 
            key={key} 
            onClick={()=>handlekeyBoard(key)}
            className={clsx("button", {"exist": isCorrect, "nonexist": isWrong})}
            >
            {key.toUpperCase()}            
            </button>
        )
    });
    
    function handlekeyBoard(key){ 
          
        setGuestArray((prev)=>{
         return   prev.includes(key)? prev :[...prev,key];
        //     const letrSet = new Set(prev)
        //     letrSet.add(key)         
        //  return  Array.from(letrSet)
         
        })
      
    }

    return (
        <>
        <div className="gameStatus">
            <h4>You Win!</h4> 
           <span> Well done 🎉</span>
        </div>
        <section className="chips">
            {display}
        </section>
        <section className="word">
        {dsiplayWord}
        </section>
        <section className="keySection">
            {keyboard}
        </section>
        {isGameOver ? <button className="newGame"> New Game</button>: null}
        </>
    )
}