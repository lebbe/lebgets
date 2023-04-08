import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MultiAutocomplete from './MultiAutocomplete/MultiAutocomplete'

const qualitiesList = [
  'Adaptable',
  'Ambitious',
  'Analytical',
  'Assertive',
  'Collaborative',
  'Committed',
  'Confident',
  'Creative',
  'Dedicated',
  'Dependable',
  'Detail-oriented',
  'Diligent',
  'Energetic',
  'Enthusiastic',
  'Flexible',
  'Goal-oriented',
  'Hardworking',
  'Honest',
  'Innovative',
  'Leadership',
  'Motivated',
  'Organized',
  'Passionate',
  'Positive',
  'Proactive',
  'Professional',
  'Reliable',
  'Resourceful',
  'Self-motivated',
  'Team player',
  'Time management',
]

function App() {
  const [qualities, setQualities] = useState<string[]>([])

  return (
    <div className="App">
      <MultiAutocomplete options={qualitiesList} values={qualities} setValues={setQualities} />
    </div>
  )
}

export default App
