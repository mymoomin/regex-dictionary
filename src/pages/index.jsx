import React, {useState} from "react"
import words from "../components/full-words"


export default function Home() {
  const [regex, setRegex] = useState(new RegExp(""))

  function updateRegex(e) {
    let reg;
    try {
      reg = new RegExp(e.target.value.toLowerCase())
    } catch {
      reg = regex
    }
    setRegex(reg)
    console.log(regex)
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

    <h2>Words</h2>
    <ol>
      {matches}
    </ol>
  </div>)
}




