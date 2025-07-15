import {words} from './Words';

export function getRandomWord(){
    const word = words[Math.floor(Math.random()*500)]; 
    console.log(word)
    return word;
}
export function getFarewellText(language) {
const options = [
    `FareWell ${language}`,
    `Adios ${language}`,
    `Goodbye !! ${language}`,
    `R.I.P  !${language}`,
    `We'll miss you ${language}`,
    `Gone !! but not forgotten ${language}`,
    `${language} its been real !`,
]
const random = Math.floor(Math.random() * options.length);
return options[random];
}