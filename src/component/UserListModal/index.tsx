import React, { useState } from 'react';
import './style.css';

const UserListModal = ({ open, closeModal, users, updateUserStatus }) => {
  if (!open) return null;

  const toggleStatus = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, status: user.status === 'Admin' ? 'User' : 'Admin' }
        : user
    );
    updateUserStatus(updatedUsers);
  };

  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>Список користувачів</h1>
        <ul className="user-list">
          <li className="user-item">
            <span className="user-name">{users[0].name}</span>
            <span className="user-status">{users[0].status}</span>
            <button onClick={() => toggleStatus(users[0].id)} className="status-toggle-button">
              Змінити статус
            </button>
          </li>
          <li className="user-item">
            <span className="user-name">{users[1].name}</span>
            <span className="user-status">{users[1].status}</span>
            <button onClick={() => toggleStatus(users[1].id)} className="status-toggle-button">
              Змінити статус
            </button>
          </li>
          <li className="user-item">
            <span className="user-name">{users[2].name}</span>
            <span className="user-status">{users[2].status}</span>
            <button onClick={() => toggleStatus(users[2].id)} className="status-toggle-button">
              Змінити статус
            </button>
          </li>
        </ul>
        
      </div>
    </div>
  );
};

export default UserListModal;