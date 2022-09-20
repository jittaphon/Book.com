import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
function Cart({ className, data }) {
  return (
    <tr className={className}>
      <td>
        <img src={data.imageUrl} alt={data.name} className="imgBook" />
      </td>
      <td>{data.name}</td>
      <td>{data.price}</td>
      <td>{data.quantity}</td>
      <td>{data.subtotal}</td>
    </tr>
  );
}
Cart.propTypes = {
	className: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default styled(Cart)`
  img {
    width: 80px;
    box-shadow: 0px 0px 6px black;
  }
  input {
    text-align: center;
  }
`;
