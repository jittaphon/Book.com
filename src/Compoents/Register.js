import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Register({ className }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  function onSubmit(event) {
    event.preventDefault();
    const data = {
      email: email,
      name: username,
      password: password,
    };

    axios
      .post("http://localhost:5000/auth/register", data)
      .then(() => {
        alertSubmit();
        history.push("/login");
      })
      .catch((error) => {
        alertError();
      });
  }
  function alertSubmit() {
    Swal.fire({
      title: "ลงทะเบียนสำเร็จ",
      text: "ท่านได้สมัครเป็นสมาชิกเรียบร้อย",
      confirmButtonColor: "#005488",
    });
  }
  function alertError() {
    Swal.fire({
      icon: "error",
      text: "กรุณากรอกข้อมูลให้ถูกต้อง",
      confirmButtonColor: "#005488",
    });
  }

  return (
    <div className={className}>
      <div className="parent">
        <div className="div1">
          <div className="box">
            <h1>สมัครสมาชิก</h1>
            <form id="create-form" className="form">
              <div className="input-group">
                <label htmlFor="username">ชื่อ:</label>
                <input
                  name="username"
                  type="text"
                  id="username"
                  placeholder="ชื่อ"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">อีเมลล์:</label>
                <input
                  name="email"
                  type="text"
                  id="email"
                  placeholder="อีเมลล์"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">รหัสผ่าน:</label>
                <input
                  name="password"
                  type="text"
                  id="password"
                  placeholder="รหัสผ่าน 8 ตัวขึ้นไป"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div>
                <Link to="/login">
                  <button type="submit" className="Back">
                    ย้อนกลับ
                  </button>
                </Link>
                <button type="submit" className="Login" onClick={onSubmit}>
                  ลงทะเบียน
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="div2">
          <img alt="" src={require("./asset/image2.png").default}></img>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  className: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default styled(Register)`
  .parent {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 500px;
    border: 1px solid #005488;
  }

  .div1 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .div2 {
    display: flex;
    overflow: hidden;
    grid-area: 1 / 1 / 2 / 2;
  }
  .box {
    text-align: center;
    margin-bottom: 85px;
    margin-top: 55px;
  }
  form input {
    padding: 0.3rem 0.7rem;
    font-size: 1rem;
    line-height: 1.5;
    outline: none;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    width: 60%;
    font-family: "IBM Plex Sans Thai", sans-serif;
  }
  form .input-group {
    margin-bottom: 1.5rem;
    justify-content: center;
  }

  form {
    margin-right: 132px;
  }

  a {
    color: orange;
  }
  .Back {
    font-size: 1rem;
    line-height: 1.5;
    margin-right: 1.5rem;
    padding: 0.5rem 1.7rem;
    cursor: pointer;
    color: #ffffff;
    background-color: #f8414c;
    border-radius: 0.25rem;
    border: none;
    font-family: "IBM Plex Sans Thai", sans-serif;
    margin-left: 151px;
  }
  .Login {
    font-size: 1rem;
    line-height: 1.5;
    margin-right: 1.5rem;
    padding: 0.5rem 1.7rem;
    cursor: pointer;
    color: #ffffff;
    background-color: #5e5e5e;
    border-radius: 0.25rem;
    border: none;
    font-family: "IBM Plex Sans Thai", sans-serif;
  }
  .div2 img {
    width: 120%;
    height: auto;
  }

  label {
    display: inline-block;
    width: 140px;
    padding-right: 20px;
    text-align: right;
  }

  @media screen and (max-width: 452px) {
    .parent {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-template-rows: 1fr;
      grid-column-gap: 0px;
      grid-row-gap: 500px;
      border: 0px solid red;
    }
    @media screen and (max-width: 452px) {
      .parent {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 500px;
        border: 0px solid red;
      }
      .div2 {
        display: none;
        overflow: hidden;
        grid-area: 1 / 2 / 2 / 3;
      }
      .input-group {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        width: 124%;
      }
      label {
        display: none;
      }
      h1 {
        padding-right: 50px;
      }
      .Back {
        display: none;
      }
      .Login {
        margin-left: 110px;
      }
      .cUkaUb .div1 {
        grid-area: 1 / 0 / 2 / 3;
      }
    }
  }
`;
