import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeletById({ userData, setUserData}) {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState({_id:''})

    function showNotification(message, status = 'success') {
        const toastFunc = status === 'error' ? toast.error : toast.success;
      
        toastFunc(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }

    const getData = async (e) => {
        e.preventDefault()

        try {
           const response = await fetch('http://localhost:3001/deleteuserbyid', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(userId)
            });
            setUserId({_id: ''})
            
            if (!response.ok) {
                showNotification(`User Id { ${userId._id} } not found `,'error');
            }   
            const deletedUser = await response.json();
            setUserId(...userData, deletedUser)
            setData(deletedUser);
                    showNotification("user has been Deleted!","sucess");

                const remainingUsers = userData.filter(u => u._id !== userId._id)
                setUserData(remainingUsers)
                setData(data)
               
            }catch (err) {
                console.log(err.message)
                showNotification(err.message,'error');
            }
    }
        function handleChange(e) {
            setUserId({...userId, _id: e.target.value})
        }


    return(
        <>
            <h3>Delete by Id</h3><br/>
            <form onSubmit={getData}>
                <label>Id:</label>

                <input type="text" placeholder="Id" value={userId._id}
                  onChange={handleChange} name="id" required></input>

                 <button type="submit">Delete</button>
           
            </form>
        </>
    );
}
export default DeletById
