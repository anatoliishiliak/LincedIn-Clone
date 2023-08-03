import React, { useEffect, useState } from 'react';
import './index.scss';
import LinkedinLogo from '../../../assets/linkedinLogo.png';
import SearchUsers from '../SearchUsers';
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from 'react-icons/ai';
import { BsBriefcase } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../../api/FirestoreAPI';
import ProfilePopup from '../ProfilePopup';

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  let navigate = useNavigate();
  const goToRout = (route) => {
    navigate(route);
  };
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };
  const openUserProfile = (user) => {
    navigate('/profile', {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  const handleSearch = () => {
    if (searchInput !== '') {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };
  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
      <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
      {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="react-icons">
          <AiOutlineSearch
            size={25}
            className="react-icon"
            onClick={() => setIsSearch(true)}
          />
          <AiOutlineHome
            size={30}
            className="react-icon"
            onClick={() => {
              goToRout('/home');
            }}
          />
          <AiOutlineUserSwitch
            size={30}
            className="react-icon"
            onClick={() => {
              goToRout('/connections');
            }}
          />
          <BsBriefcase size={30} className="react-icon" />
          <AiOutlineMessage size={30} className="react-icon" />
          <AiOutlineBell size={30} className="react-icon" />
        </div>
      )}

      <img
        className="user-logo"
        src={currentUser.imageLink}
        alt="user"
        onClick={displayPopup}
      />

      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">
              <p>No results found...</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                className="search-inner"
                onClick={() => openUserProfile(user)}
              >
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
