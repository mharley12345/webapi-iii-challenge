import React,{useState,useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const[users,setUsers] =useState([])
  const[id, setId] =useState([])
  useEffect(()=> {
 axios.get("http://localhost:5000/api/users")

 .then((res) =>{
   setUsers(res.data.users)
   const id = users.map((name, i ) =>
   {
    return setId.push(name.id)
   })
  

 })
 console.log(id)
},[])
const handleSubmit = ()=>{

 axios.put(`http://localhost:5000/api/users/19`)
} 
const handleChange = (e)=> {
  
}

  return (
    <div className="App">
    {users.map((name, i)=> <h3 key={i}>
    <form>
      <label>
        Name
    <h4>{name.name}</h4>
</label>
   <span> <input type='text' name="name" placeholder="Name"></input></span><br/>
    <input type='id' name="id" placeholder="ID"></input><br/>
    <button type="submit" value="submit" onClick={()=>handleSubmit()}>Edit</button>

    <p>ID<br/>
    {name.id}</p>
    </form>
    </h3>)}
   </div>
  )
}

export default App;
