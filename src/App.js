import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react'


function App() {

const [users,setUsers] = useState();
const [searchedUser,setSearchedUser] = useState();
  
  useEffect(() =>{
    const users =   fetch('http://localhost:5000/api/users').then((json)=>{
        return json.json();
      }).then((result)=>{
          // console.log(result);
          setUsers(result)
      })

     // console.log(users);
  },[])

  const getUser = (e) =>{
    let searchItem = e.target.value;
    let filterUser= [];
    if(searchItem != ''){
      filterUser = users.filter((user) =>{
        return user.name.indexOf(searchItem) !=-1 || user.userId.indexOf(searchItem) != -1
      })
    }else{
      filterUser=[];
    }
    
    console.log(filterUser);
    setSearchedUser(filterUser);
  }
  
  return (
    <div className="App">
      
          <input type ="text" placeholder="search" onChange={(e) =>getUser(e)}></input>
          <button>Cancel</button>
      
          {
            searchedUser && searchedUser.map((user)=>{
              return <div><b>{user.name}</b>, 
              <span className="display">{user.userId},</span> 
              <span className="display">{user.desg}</span>
              </div>
            })
          }
    </div>
  );
}

export default App;   
