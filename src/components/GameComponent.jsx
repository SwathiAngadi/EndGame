import pastelButtonStyles from "./pastelButtonStyles";
export default function GameComponent(){
    const colorChips = pastelButtonStyles;
   
    const display = colorChips.map((chip)=> 
    <span className="colorChip" style={{backgroundColor:chip.backgroundColor, color:chip.textColor}}>{chip.language}</span>)
    return (
        <>
        <span className="gameStatus">
            You Win! <br/>
            Well done !!!
        </span>
        <section className="chips">
            {display}
        </section>
        </>
    )
}