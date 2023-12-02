import React, { Component, useState } from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직을 처리하는 함수를 호출하거나 API를 호출합니다.
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
          <div className="card-header">페이지 이동</div>
          {/* 
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  로그인
                </button>
                <Link to="/DashBoard">
                  <button type="click" className="btn btn-primary m-1">메인</button>
                </Link>
                <Link to="/NoticeBoard">
                  <button type="click" className="btn btn-primary m-1">게시판</button>
                </Link>
              </form>
              </div> */}
              <div className="card-body">
                <Link to="/DashBoard">
                  <button type="click" className="btn btn-primary m-1" >차트</button>
                </Link>
                <Link to="/NoticeBoard">
                  <button type="click" className="btn btn-primary m-1">사용자 정보</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
}

      export default LoginForm;