import logo from './logo.svg'
import Forum from './component/forum'
import RecordDetail from './component/RecordDetail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Forum />} />
        <Route path="/record/:id" element={<RecordDetail />} />
      </Routes>
    </Router>
  )
}

export default App
