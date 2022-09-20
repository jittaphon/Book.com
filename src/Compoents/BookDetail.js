import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { fetchCart } from "../ActionAndStore/Cart/action";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col } from "react-bootstrap";
function BookDetail({ className }) {
  const [user] = React.useState(JSON.parse(localStorage.getItem("id")));
  const [token] = React.useState(JSON.parse(localStorage.getItem("token")));
  const [Book, setBook] = useState();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const getBookDetail = () => {
      axios.get(`/admin/show_detail/${id}`).then((res) => {
        setBook(res.data);
      });
    };
    getBookDetail();
  }, [id]);

  function onSubmit(e, data_detail) {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    e.preventDefault();
    if (user) {
      let data = {
        Customer_id: user,
        Book_id: data_detail,
        quantity: parseInt(quantity),
      };
      axios.post("/user/addToCart", data, config).then((res) => {
        dispatch(fetchCart(res.data));
        history.push("/cart");
      });
    } else {
      history.push("/login");
    }
  }

  return (
    <div className={className}>
      {Book ? (
        <div>
          <div className="row">
            <Col>
              <div className="col-60">
                <img src={Book.imageUrl} alt={Book.name} className="imgBook" />
              </div>
            </Col>
            <Col>
              <div className="col-40">
                <h1>{Book.name}</h1>
                <div className="author">
                  <p>
                    ผู้แต่ง: <span>{Book.author} </span>ประเภท:
                    <span>{Book.type}</span>
                  </p>
                </div>
                <h2>{Book.price} THB </h2>
                <h3>คำอธิบาย:</h3>
                <div className="book-des">
                  <p>{Book.description}</p>
                </div>
                <div className="book-quantity">
                  <input
                    type="number"
                    className="quantity"
                    min="1"
                    max="20"
                    onChange={(event) => setQuantity(event.target.value)}
                    value={quantity}
                  />
                  <Link to="/">
                    <button
                      className="btn"
                      onClick={(e) => onSubmit(e, Book._id)}
                    >
                      เพิ่มสินค้าลงตะกร้า
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
          </div>
        </div>
      ) : (
        <div>Not found !!!</div>
      )}
    </div>
  );
}
BookDetail.propTypes = {
  className: PropTypes.string.isRequired,
  book: PropTypes.object,
  quantity: PropTypes.number,
  user: PropTypes.object,
  id: PropTypes.string,
};

export default styled(BookDetail)`
  font-family: "IBM Plex Sans Thai", sans-serif;
  height: 700;
  margin: 6rem;
  .row {
    background-color: white;
    height: auto;
    width: 90%;
    border: 1px solid #d4caca;
    margin-left: 6rem;
    padding: 3rem;
    border-radius: 10px;
    position: relative;
  }
  .col-60 {
    width: 60%;
    text-align: center;
    .imgBook {
      height: 550px;
    }
  }
  .col-40 {
    width: 88%;
    padding-right: 4rem;
    h1 {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .author {
      p {
        font-size: 16px;
        font-weight: bold;
        span {
          font-weight: normal;
        }
      }
    }
    .star {
      margin-bottom: 2.5rem;
    }
    h2 {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 3rem;
    }
    h3 {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
    .book-des {
      border: 1px solid #d4caca;
      padding: 1rem;
      border-radius: 15px;
      margin-bottom: 1.5rem;
      p {
        font-size: 16px;
        font-weight: normal;
      }
    }
    .book-quantity {
      display: flex;
      input {
        border: 1px solid #d4caca;
        border-radius: 8px;
        text-align: center;
        font-size: 18px;
        padding: 12px;
        margin-right: 1rem;
      }
      .btn {
        border: 1px solid #d4caca;
        border-radius: 8px;
        font-size: 18px;
        font-weight: bold;
        padding: 15px;
      }
      .btn:hover {
        background-color: #3e3838;
        color: white;
      }
    }
  }
  .back {
    bottom: -10%;
    left: -1%;
    position: absolute;
    span {
      display: flex;
      justify-content: space-evenly;
      font-size: 1.1rem;
    }
  }

  @media screen and (max-width: 425px) {
    .row {
      background-color: white;
      height: auto;
      width: 500%;
      position: relative;
    }
  }
`;
