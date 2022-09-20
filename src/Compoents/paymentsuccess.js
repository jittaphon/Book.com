import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import GetCart2 from "./EachIProductInCart2";
function ShowCart({ className }) {
  const [user] = useState(JSON.parse(localStorage.getItem("id")));
  const receipt = useSelector((state) => state.receipt);
  console.log(receipt);
  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={className}>
      <div className="row">
        <div className="col-100">
          <h1> ทำรายการสำเร็จ </h1>
          <img alt="" src={require("./asset/image3.png").default}></img>
          <h2> ขอบคุณสำหรับการซื้อสินค้าจากทางร้านเราค่ะ </h2>
        </div>

        <div className="col-70">
          <h1> สรุปรายการของท่าน </h1>
          <h2> เลขที่คำสั่งซื้อ #{receipt._id} </h2>
          <table className="ShowBook">
            <thead>
              <tr>
                <th>ภาพหนังสือ</th>
                <th>ชื่อหนังสือ</th>
                <th>ราคา</th>
                <th>จำนวน</th>
                <th>รวม</th>
              </tr>
            </thead>
            <tbody>
              {receipt.products ? (
                receipt.products.map((data) => {
                  return <GetCart2 key={data.id} data={data} />;
                })
              ) : (
                <tr>
                  <td>Loading . . .</td>
                </tr>
              )}
            </tbody>
          </table>
          <Link to="/">
            <button>ซื้อสินค้าต่อ</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

ShowCart.propTypes = {
  className: PropTypes.string,
  cart: PropTypes.object,
};

export default styled(ShowCart)`
  overflow: hidden;
  margin-bottom: 50px;
  h1 {
    font-family: "IBM Plex Sans Thai", sans-serif;
    padding-top: 50px;
    font-weight: bold;
    font-size: 28px;
    text-align: left;
    margin-bottom: 2.5rem;
    text-align: center;
  }
  h2 {
    font-family: "IBM Plex Sans Thai", sans-serif;
    padding-top: 50px;
    font-weight: bold;
    font-size: 25px;
    text-align: left;
    margin-bottom: 2.5rem;
    text-align: center;
  }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 10%;
  }
  button {
    border: 1px solid white;
    background-color: #005488;
    color: white;
    transition: 0.5s;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 10%;
  }
  .col-70 {
    width: 100%;
    margin-bottom: 4rem;
    .ShowBook {
      border: 1px solid #cecccc;
      border-collapse: collapse;
      width: 90%;
      margin: 5rem;
      table-layout: fixed;
      thead tr th {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        padding: 20px;
        border-bottom: 1px solid #cecccc;
      }
      td {
        color: black;
        font-size: 18px;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
        padding: 25px 10px 20px 10px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .col-70 .ShowBook {
      border: 1 px solid #cecccc;
      border-collapse: collapse;
      width: 77%;
      margin: 5 rem;
      table-layout: fixed;
    }
  }
  @media screen and (max-width: 452px) {
    .col-70 .ShowBook {
      display: none;
      width: 17%;
    }
     button {
      width: 38%;
    }
  }
`;
