import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import PropTypes from "prop-types";
import ProductAll from "../Compoents/Product";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../ActionAndStore/Book/actions";
import { Container, Row } from "react-bootstrap";

function Home({ className }) {
  const book = useSelector((state) => state.book);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    function get() {
      axios.get("/admin/getBook").then((res) => {
        dispatch(fetchBooks(res.data));
      });
    }
    get();
  }, [dispatch]);

  function useSearch(event) {
    setQuery(event.target.value);
    axios
      .get(`/admin/search/${query}`)
      .then((res) => {
        dispatch(fetchBooks(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={className}>
      <div class="parent">
        <div class="div2">
          <form className="form-inline">
            <input
              type="text"
              className="search"
              placeholder="Search by book's name"
              onChange={useSearch}
              value={query}
            />
          </form>
          <Container>
            <Row>
           
              {book ? (
                book.map((data) => {
                  return <ProductAll key={data._id} data={data} />;
                })
              ) : (
                <div>พิมพ์ชื่อหนังสือที่ต้องการหา</div>
              )}
         
            </Row>
          </Container>
        
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  className: PropTypes.string,
  books: PropTypes.object,
};

export default styled(Home)`
  overflow: hidden;
  width: 100%;
  .row {
    display: flex;
    padding-top: 1rem;
    justify-content: center;
  }
  .rowtwo {
    margin-left: 15%;
    h1 {
      margin-top: 2rem;
      font-size: 22px;
      font-weight: bold;
    }
    .new,
    .hit {
      display: flex;
      flex-direction: row;
    }
    .hit {
    }
  }
  .col-70 {
    padding-top: 4rem;
    margin: 3rem 8rem 8rem 8rem;

    h1 {
      font-size: 28px;
      font-weight: bold;
    }
    .all {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #d4caca;
      border-radius: 10px;
      padding: 10px;
    }
  }
  .parent {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  .div1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .div2 {
    grid-area: 1 / 1 / 3 / 2;
  }
  margin-bottom: 50px;
  width: 98%;

  form.form-inline {
    padding-top: 30px;
    text-align: center;
    margin-bottom: 2rem;
  }
  input.search {
    font-family: "IBM Plex Sans Thai", sans-serif;
    padding: 20px;
    border-radius: 12px;
    font-size: 16px;
    width: 40%;
    justify-content: center;
    transition: border 0.3s;
  }
  input.search:focus {
    outline: none;
    border-radius: 12px;
    border: 2px solid #ffc531;
    transition: border 0.3s;
    font-family: "IBM Plex Sans Thai", sans-serif;
    padding: 20px;
    font-size: 16px;
    width: 40%;
    justify-content: center;
  }
  @media screen and (max-width: 452px) {
    .col-70 {
      padding-top: 0rem;
      padding-left: 0rem;
      margin: 0rem 0rem 0rem 0rem;
    }
    input.search {
      width: 60%;
    }
    div.box {
      width: 22 rem;
    }
  }
  
`;
