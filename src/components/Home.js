
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  

  return (
    <header>
    <h1>Rhythm@Deakin</h1>
    <div className="search-bar-container">
      <input type="text" placeholder="Search" className="search-bar" />
      <button className="post-button" onClick={() => navigate('/post')}>
        Post
      </button>
    </div>
  
    <div className="button-container">
      <div className="row-buttons">
        <button className="find-questions" onClick={() => navigate('/find-questions')}>
          Find Questions
        </button>
      </div>
      <button className="signout-button" onClick={() => navigate('/signout')}>
        Sign Out
      </button>
      <button className="plans-button" onClick={() => navigate('/pricing-plans')}>
        Plans
      </button>
    </div>
  </header>
  
  );
};

export default Home;
