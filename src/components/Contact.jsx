import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Tooltip from '@mui/material/Tooltip';
// import ReactTooltip from './react-tooltip';
// import styled from './styled-components';
import "./contacts.css";



const Contact = ({
  _id,
  name,
  designation,
  company,
  industry,
  email,
  phoneNumber,
  country,
  uploadData,
  setIsDelete,
  checked,
  onCheckboxChanged
}) => {

  const handleClick = async (_id) => {
    console.log(_id);
    const getRes = await fetch(
      "https://contacts-manager-backend.herokuapp.com/api/contact",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify({ _id }),
      }
    );

    const response = await getRes.json();
    uploadData();
    if (response.status === "sucess") {
      setIsDelete(true);
      setTimeout(() => {
        setIsDelete(false);
      }, 2000);
    }
    console.log(response);
  };
  return (
    <tr>
      <td className="chekboxes">
        <input
          className="checkbox"
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckboxChanged(e.target.checked)}
        />
      </td>
      <td className="name">{name}</td>
      <td className="designation">{designation}</td>
      <td className="company">{company}</td>
      <td className="industry">{industry}</td>
      <Tooltip title={email} placement="bottom" arrow>
        <td className="email">{email}</td>
      </Tooltip>
      <td className="phoneNumber">{phoneNumber}</td>
      <td className="country">{country}</td>
      <td className="action">
        <RiDeleteBinLine
          className="dustbin"
          onClick={() => {
            handleClick(_id);
          }}
        />
      </td>
    </tr>
  );
};

export default Contact;
