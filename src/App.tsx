import {GiftList} from './components/GiftList'
import {gifts} from './data'
import './App.css'

function App() {
  const {data} = gifts
  return (
    <div className="app">
      <h1>Advency Gifts</h1>
      <GiftList data={data} />
    </div>
  )
}

export default App
