import React, { useState, useEffect } from 'react';
import './style.css';
import { axios } from '../../utils/axios';
import { useSectionsContext } from '../SectionProvider';

const UserListModal = ({ setOpenAdmin, updateUserStatus, logOut }) => {
  const [users, setUsers] = useState([]);
  const { user } = useSectionsContext();
  const toggleStatus = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, status: user.status === 'Admin' ? 'User' : 'Admin' }
        : user
    );
    updateUserStatus(updatedUsers);
  };

  useEffect(() => {
     const fetchUsers = async () => {
        try {
          const res = await axios.get('/auth/')
        
          setUsers(res.data.users)
        } catch (error) {
          console.log(error);
        }
     }

     fetchUsers()
  }, [])

  const handlePromote = async (userId) => {
    try {
      const res = await axios.post(`/auth/promote/${userId}`)
      
      const userRes = await axios.get('/auth/')
      setUsers(userRes.data.users)

    } catch (error) {
      console.log(error);
    }
  }

  const handleDemote = async (userId) => {
    try {
      const res = await axios.post(`/auth/low/${userId}`)

      const userRes = await axios.get('/auth/')
      setUsers(userRes.data.users)
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="modal-container" onClick={() => setOpenAdmin(false)}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="usermodal-header">
          <span className='usermodal-h1'>Список користувачів</span>
          <button className="log_buton" onClick={() => logOut()}>
            Вийти
          </button>
        </div>
        <ul className="user-list">
          {users.length > 0 && users.map((item, index) => {
            return user._id != item._id && <UserItem key={index} userData={item} handlePromote={handlePromote} handleDemote={handleDemote}/> 
          })}
        </ul>
      </div>
    </div>
  );
};

const UserItem = ({ userData, handlePromote, handleDemote }) => {
  return (
    <li className="user-item">
      <span className="user-name">{userData.name}</span>
      <span className="user-status">{userData.status}</span>
      <button onClick={() => handleDemote(userData._id)} className="status-toggle-button">
        Понизити
      </button>
      <button onClick={() => handlePromote(userData._id)} className="status-toggle-button">
        Підвищити
      </button>
    </li>
  )
}

export default UserListModal;