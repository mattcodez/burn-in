"use strict";
let entryEl;
const keystore = [];

function init(){
  entryEl = $('#entry');
  entryEl.on('keypress', userType);
}

function userType(e){
  keystore.push({
    char: String.fromCharCode(e.which),
    time: Date.now()
  });
  render();
  return false; //otherwise space will scroll page
}

function render(){
  entryEl.empty();
  keystore.forEach((key, i) => {
    let timeDelta = key.time - (keystore[i - 1] || {time:0}).time;
    timeDelta -= 50; //Reduce value a bit otherwise we'll never hit 0 for hue
    let hue = timeDelta; //Bring into normal deg values
    //clamp values at 0 to 60
    hue = hue < 0 ? 0 : hue;
    hue = hue > 60 ? 60 : hue;
    console.log(`hue:${hue}, timeDelta:${timeDelta}`)
    const style = `color:hsl(${hue},100%,43%);`;
    entryEl.append(`<span style="${style}">${key.char}</span>`);
  });
}
/*
  - Make array of all letters that represents the state of the app
  - Container is "rendered" from this state array
  - Actually, store an object that contains the unix time that the character
  was hit
*/
