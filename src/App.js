import './App.css';
import {useEffect, useState} from "react";
import Recipe from './components/Recipe';
import { v4 as uuidv4 } from "uuid";

const APP_ID =  process.env.REACT_APP_ID;
const APP_KEY = process.env.REACT_APP_KEY;

function App() {
  
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState(""); //the final full input

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  useEffect(() => {
    getRecipes();
  }, [query]);
  
  const getRecipes = async () => {
    try {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      if(response.ok) {
        const data = await response.json();
        setRecipes(data.hits);
      } else {throw new Error("Request failed");}
      
    } catch (error) {
      console.log(error);
    }
    
  };
  
  return (
    <div className="App">
      <h1 className="app-title">Find a recipe to your favourite meal.</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search recipe..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        <input type="submit" value="Search" />
      </form>

      <div className="recipe-wrapper">
        {recipes.map(recipe => (
          <Recipe 
            key={uuidv4()}
            title={recipe.recipe.label} 
            image={recipe.recipe.image}
            calories={recipe.recipe.calories}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      
    </div>
  );
}

export default App;
