import React, {useState} from "react"
import words from "../components/full-words"


export default function Home() {
  const [regex, setRegex] = useState(new RegExp(""))
  const [crypt, setCrypt] = useState(false)
  const [wholeWord, setWholeWord] = useState(false)

  function updateRegex(e) {
    let reg;
    if (crypt === true) {
      reg = generateRegex(e.target.value)
    } else {
      try {
        reg = new RegExp(e.target.value)
      } catch {
        reg = regex
      }
    }
    
    setRegex(reg)
    console.log(regex)
  }

  /**
   * 
   * @param {string} cryptogram 
   * @returns {RegExp}
   */
  function generateRegex(cryptogram) {
    const chars = []
    let output = ""
    for (const char of cryptogram){
      if(/\w/.test(char)) {
        if (chars.includes(char)) {
          output += `\\${chars.indexOf(char) + 1}`
        } else {
          chars.push(char)
          output += "(.)"
        }
      } else {
        output += char
      }
    }
    if (wholeWord === true) output = "^" + output + "$"
    return new RegExp(output);
  }

  function toggleCryptogram(e) {
    setCrypt(e.target.checked)
  }

  function toggleWholeWord(e) {
    setWholeWord(e.target.checked)
  }

  const matches = []
  for (const word of words) {
    if (regex.test(word)) {
      matches.push(<li key={matches.length}>{word}</li>)
    }
    if (matches.length > 499) break
  }

  return (<div>
    <h1>Regex Dictionary</h1>
    <label htmlFor="regex">Enter regex here: </label>
    <input name="regex" type="text" onChange={updateRegex} placeholder="Enter Regex" />
    
    <br />
    <br />

    <input type="checkbox" name="cryptogram" id="cryptogram" onChange={toggleCryptogram} />
    <label htmlFor="cryptogram" >Enable cryptogram mode</label>

    <br />

    <input type="checkbox" name="whole" id="whole" onChange={toggleWholeWord} style={{marginLeft: "1.2em"}} disabled={!crypt}/>
    <label htmlFor="whole" >Toggle whole word match</label>

    <h2>Words</h2>
    <ol>
      {matches}
    </ol>
  </div>)
}





