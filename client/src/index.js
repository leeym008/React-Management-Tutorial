import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import DashBoard from './NoticeBoard';
//import NoticeBoard from './NoticeBoard';
import reportWebVitals from './reportWebVitals';

//import Navigation from './Navigation';
//import Routing from './Routing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 개발보드에서 React.StrictMode 로 App이 감싸져 있으면 2번 렌더링 됨
  // <React.StrictMode>
  <div>
    <App />
{/* 
    <DashBoard />
    <NoticeBoard />
 */}
  </div>



  // </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
