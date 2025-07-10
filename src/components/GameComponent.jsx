import { useState } from "react";
import pastelButtonStyles from "./pastelButtonStyles";
import clsx from "clsx";

export default function GameComponent(){

    const colorChips = pastelButtonStyles;
    const [currentWord, setCurrentWord] = useState("React".toUpperCase().split(""));
    const alphabet= "abcdefghijklmnopqrstuvwxyz";
    const [guestArray, setGuestArray] = useState([]);
    console.log(guestArray);

    const dsiplayWord = currentWord.map((letter)=>
        (<span key={letter} className="enteredLetter">{letter}</span>))

    const display = colorChips.map((chip, index)=> {
        var Styles = {
            backgroundColor:chip.backgroundColor, 
            color:chip.textColor
        }
       return <span className="colorChip"key={index} style={Styles}>{chip.language}</span>

    });
   
    const keyboard = alphabet.split("").map((key)=>{
       
         const isGuessed =  guestArray.includes(key);
         const isCorrect = isGuessed && currentWord.includes(key.toUpperCase()) ;
         const isWrong = isGuessed && !currentWord.includes(key.toUpperCase());
         debugger;
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
        <span className="gameStatus">
            You Win! <br/>
            Well done 🎉
        </span>
        <section className="chips">
            {display}
        </section>
        <section className="word">
        {dsiplayWord}
        </section>
        <section className="keySection">
            {keyboard}
        </section>
        <button className="newGame"> New Game</button>
        </>
    )
}