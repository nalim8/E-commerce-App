import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to our bike store!</h1>
      <p className="home-description">Explore our bike sortiment</p>
      <Link to='/products'>
        <button className="home-button">Go to products</button>
      </Link>
    </div>
  )  
}