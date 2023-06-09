import React, { useState, useEffect } from "react";
import DeletByName from "./DeleteByName";
import GetByName from "./GetByName";
import GetByAge from "./GetByAge";
import AddUser from "./AddUser";
import DeletById from "./DeleteById";
import Usericon from "./userIcon";
import Reconnect from "./reconnect";
import '../css/App.css';


function Home() {
    const [data, setData] = useState([]);
    

    useEffect(() => {
    getData()
}, [data.length]);

function handleClick() {
    setData( data=> data + 1);
}
const getData = async () => {
    fetch('http://localhost:3001')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));    

}
    return(
        <>
         <Usericon />
            <div className="all-user"><h1> All Users </h1></div>
        <div className="home_component">
            <table >  
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>NAME</th>
                            <th>AGE</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(item => (
                        <tr  key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                        </tr>
                        ))}
                        </tbody>
                </table>
        </div>
        <Reconnect handleClick={ handleClick } />
                <div className="rest_of_component">
                <GetByName/>
                 <GetByAge/>
                 <AddUser userData={ data } setUserData={ setData }/>   
                <DeletById userData={ data } setUserData={ setData }/>
                <DeletByName userData={ data } setUserData={ setData }/>
                </div>
                </>
    );
}

export default Home;