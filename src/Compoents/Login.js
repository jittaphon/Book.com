import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory ,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import axios from "axios";
import {useState} from "react";
import Swal from "sweetalert2";
import { setCustomer, getCustomer } from "../ActionAndStore/Customer/action";


function Login({ className }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

  React.useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  const signUserInFacebook = async (response) => {
    const { name, email, accessToken, userID } = response;
    const user = { name, email, accessToken, userId: userID };
    const res = await axios({
      method: "post",
      url: "http://localhost:5000/auth/signin/facebook",
      data: { user },
    });
  
    localStorage.setItem(`token`, JSON.stringify(res.data.token));
    localStorage.setItem(`name`, JSON.stringify(res.data.user.name));
    localStorage.setItem(`id`, JSON.stringify(res.data.user._id));
    dispatch(setCustomer(res.data));
    history.push("/");
  };
  
  const responseGoogle = async (response) => {
     axios({
      method: "post",
      url: "http://localhost:5000/auth/signin/google",
      data: {tokenId:response.tokenId},
    }).then((res) =>{
      localStorage.setItem(`token`, JSON.stringify(res.data.token));
      localStorage.setItem(`name`, JSON.stringify(res.data.user.name));
      localStorage.setItem(`id`, JSON.stringify(res.data.user._id));
      dispatch(setCustomer(res.data));
    
      history.push("/");
    })

  };

  function onSubmit(event) {
		event.preventDefault();
		const data = {
			email: email,
			password: password,
		};
		axios
			.post("http://localhost:5000/auth/login", data)
			.then((res) => {
        localStorage.setItem(`token`, JSON.stringify(res.data.token));
        localStorage.setItem(`name`, JSON.stringify(res.data.user.name));
        localStorage.setItem(`id`, JSON.stringify(res.data.user._id));
        history.push("/");
			})
			.catch((error) => {
				alertError(error);
			});
	}

  function alertError(error) {
		Swal.fire({
			icon: "error",
			text: "อีเมลล์ หรือ รหัสผ่านของท่าน ไม่ถูกต้อง",
			confirmButtonColor: "#005488",
		});
	}

  return (
    <div className={className}>
      <div className="parent">
        <div className="div1">
          <img alt="" src={require("./asset/image1.png").default}></img>
        </div>

        <div className="div2">
          <div className="box">
            <h1>เข้าสู่ระบบ</h1>
            
            <form id="create-form" className="form">
            <div className="input-group">
								<input
									name="email"
									type="text"
									id="email"
									placeholder="email"
									onChange={(event) => setEmail(event.target.value)}
								/>
							</div>
							<div className="input-group">
								<input
									name="name"
									type="password"
									id="name"
									placeholder="password"
                  onChange={(event) => setPassword(event.target.value)}
									
								/>
							</div>
              <button type="submit" className="Login" onClick={onSubmit}>
								เข้าสู่ระบบ
							</button>
              <p>________________________________________</p>
            </form>
            <FacebookLogin
                appId="411525907158319"
                fields="name,email,picture"
                scope="public_profile, email"
                callback={signUserInFacebook}
                cssClass="btnFacebook"
                icon="fa-facebook"
              />
              <GoogleLogin
                clientId="292061599755-9ooqp99oqcankjdso51rqt1253s1fjbr.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                className="btnGoogle"
              />
               <div className="link">
								<Link to="/register">ยังไม่มีบัญชีผู้ใช้ ?</Link>
							</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  className: PropTypes.string,
};

export default styled(Login)`
.Login {
  width: 192px;
  height:47px;  
  border-radius: 4px;
  border:0px transparent;  
  text-align: center;
  margin:5px;
  cursor: pointer;
	color: #ffffff;
	background-color: #5e5e5e;
  display: inline-block;
	font-family: "IBM Plex Sans Thai", sans-serif;
	}
form .link {
		margin-bottom: 1.5rem;
		margin-left: 8rem;
	}
form input {
		padding: 0.3rem 0.7rem;
		font-size: 1rem;
		line-height: 1.5;
		outline: none;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		width: 70%;
		font-family: "IBM Plex Sans Thai", sans-serif;
	}
	form .input-group {
		margin-bottom: 1.5rem;
		justify-content: center;
	}
.btnFacebook { 
  width: 192px;
  height:47px;  
  border-radius: 4px;
  background: #3b5998;
  color:white;
  border:0px transparent;  
  text-align: center;
  margin:5px;
  display: inline-block;
}
.btnGoogle { 
  width: 192px;
  height: 64;  
  border-radius: 4px;
  background: #3b5998;
  color:white;
  border:0px transparent;  
  text-align: center;
  margin:5px;
  display: inline-block;
}
  .parent {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 500px;
    border: 1px solid #005488;
  }

  .div1 {
    display: flex;
    overflow: hidden;
    grid-area: 1 / 2 / 2 / 3;
  }
  .div2 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .box {
    text-align: center;
    margin-top: 150px;
  }
  
  .div1 img {
    width: 120%;
    height: auto;
  }

  @media screen and (max-width:452px) {
    .parent {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 500px;
    border: 0px solid red;
  }
  .div1 {
    display: none;
    overflow: hidden;
    grid-area: 1 / 2 / 2 / 3;
  }
  .box {
    text-align: center;
    margin-top: 100px;
}
  }
`;
