import './App.css'
import { useState, useEffect } from 'react'

const urls = ["ditto", "charmander", "pikachu", "mewtwo", "oshawott", "squirtle"]

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function App() {

  const [imgArray, setImgArray] = useState([])
  const [failed, setFailed] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)


function resetArray() {

  const tempArray = [...imgArray]

  for (let i = 0; i < imgArray.length; i++) {
    tempArray[i].selected = false;
  }

  setImgArray(tempArray)
}

function handleRestart() {
  resetArray()
  setScore(0)
  setFailed(false)
}

  // fetches the url for pokemon sprites and then pushes to an array. 
  const test = async (terms) => {
    const urls = await Promise.all(
      terms.map(async (term, index) => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + term)
        const data = await response.json()
        return { url: data.sprites.front_default, id: index, selected: false }
      })
    )
    setImgArray(urls)
  }

  useEffect(() => {
    test(urls)
  }, [])

  function handleClick(index) {
    // check if the current pokemon id has been selected
    if (imgArray[index].selected) {
      setFailed(true)
      // show restart button
      //  setFailed(true)

    } else {
      setScore(score + 1)
      const tempArray = [...imgArray]
      tempArray[index].selected = true
      shuffleArray(tempArray)
      setImgArray(tempArray)
      console.log(imgArray)
    }
  }

  return (
    <>
            <h1>Score: {score}</h1>
      <div className="easy-grid">
        {
          imgArray.map((item, index) => {

            return <div className='card'  key={item.id} onClick={() => handleClick(index)} >
            <img src={item.url} />
            </div>

          })
        }
      </div>
      {failed && <button onClick={()=>handleRestart()}>Restart?</button>}
    </>
  )
}

export default App
