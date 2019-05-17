import React, { useState, useEffect } from "react";
import './App.css';
export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); /*tarnale esksav */

  useEffect(() => {
    const fetchUsers = async () => {
      try{
      const response = await fetch("http://localhost:8000/api/products");
      const users = await response.json();
      setData(users);
      setIsLoading(false); /* tarnale verchantsav  */
    }catch(error){
      console.log(error);
      
    }
    };
    fetchUsers();

    
  }, []);

  const renderUser = () => {
    if (isLoading) return <div><img src='https://cdn.dribbble.com/users/80078/screenshots/995621/loading.gif'></img></div>

    
    
    ;

    return (
      <div>
        <div>
          {data.map(user => (
            <div key={user._id}> 
            <img src={user.img}/>
              <h2> {user.title}</h2>
              <h2> {user.price}</h2>
              <br/>
           <hr/>
           
           <br/>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return <div>{renderUser()}</div>;
}

