import React, {useState} from "react"
import words from "../components/words"


export default function Home() {
  const [regex, setRegex] = useState(new RegExp(""))

  function updateRegex(e) {
    let reg;
    try {
      reg = new RegExp(e.target.value)
    } catch {
      reg = regex
    }
    setRegex(reg)
    console.log(regex)
  }
  
  function matchRegex(inp) {
    return regex.test(inp)
  }

  return (<div>
    <h1>Regex Dictionary</h1>
    <label htmlFor="regex">Enter regex here: </label>
    <input name="regex" type="text" onChange={updateRegex} placeholder="Enter Regex" />

    <h2>Words</h2>
    <ol>
      {words.map((value, index) => <li key={index} style={{display: matchRegex(value) || "none"}}>{value}</li>)}
    </ol>
  </div>)
}




