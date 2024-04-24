import React from 'react';
import HomePage from '../Homepage/HomePage';
import Sidebar from '../Sidebar/Sidebar';
import StudentsForm from '../StudentsForm/StudentsForm';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{display:"flex",flexDirection:"row"}}>
    <div style={{width:'270px'}}>
    <Sidebar></Sidebar>
    </div>
    <div style={{width:'100%'}}>
      <Outlet></Outlet> 
    </div>
   
    </div>
  )
}

export default Dashboard

//  <div style={{width:'100%'}}>
    // <StudentsForm></StudentsForm>
    // </div>