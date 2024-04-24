import React from 'react';
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import "./Header.css"

const Header = () => {
  return (
    <div className="Form_Header">
          <IoCaretBackCircleOutline className="icon_caret" />
          <label className="search">
            <input className="input_search" placeholder="Search..."></input>
            <IoIosSearch className="icon_search" />
          </label>
          <FaRegBell className="icon_bell" />
    </div>
  )
}

export default Header
