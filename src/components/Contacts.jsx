import React, { useEffect } from "react";
import Contact from "./Contact";
import { motion } from "framer-motion";
import selectDate from "../photos/selectDate.svg";
import deleteButton from "../photos/deleteButton.svg";
import importButton from "../photos/importButton.svg";
import exportButton from "../photos/exportButton.svg";
import { useState, useRef } from "react";
import Delete from "./Delete";
import Confirm from "./Confirm";
import ImportContact from "./ImportContact";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom";
import './contacts.css';




const Contacts = ({searchTerm}) => {
  const [isUpload, setIsUpload] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [confirm, setIsConfirm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [ contacts, setContacts] = useState([]);
  const ref = useRef();

  const [selectAllCheckboxChecked, setSelectAllCheckboxChecked] = useState(false);

  const selectAllCheckboxChanged = (e) => {
    setSelectAllCheckboxChecked(e.target.checked);
  };

  const uploadData = async () => {
    const dataFile = await fetch(
      "https://contacts-manager-backend.herokuapp.com/api/mycontacts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await dataFile.json();
    if (!data.error) {
   
      for(let contact of data.contacts)
        contact.checked = false;
      setContacts(data.contacts);
    }
  };
  useEffect(() => {
    uploadData();  
  }, []);

const bulkDeleteContacts = async() => {
  let contactsToDelete = [];
  for(let contact of contacts)
    if(contact.checked)
      contactsToDelete.push(contact);

  const data = await fetch(
    "https://contacts-manager-backend.herokuapp.com/api/bulkDeleteContacts",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ contactsToDelete }),
    }
  );
  const response = await data.json();
  
  uploadData();
  setIsConfirm(false);
  setSelectAllCheckboxChecked(false);
}


  return (
    <div className="table-conatainer">
      <div className="button-container">
        <div className="left">
          <motion.img
            src={selectDate}
            alt="selectdate and filter"
            className="left-button"
          />
        </div>
        <span className="right">
          <motion.img
            whileTap={{ scale: 0.85 }}
            src={deleteButton}
            alt="deleteButton"
            className="right-button"
            onClick={() => {
              setIsConfirm(!confirm);
              setIsAlert(false);
            }}
          />
          <motion.img
            whileTap={{ scale: 0.85 }}
            src={importButton}
            alt="importButton"
            className="right-button"
            onClick={() => {
              setIsAlert(!isAlert);
              setIsConfirm(false);
            }}
          />
          <motion.img
            whileTap={{ scale: 0.85 }}
            src={exportButton}
            alt="exportButton"
            className="right-button"
          />
        </span>
      </div>

      {isUpload ? <Upload /> : null}
      {isDelete ? <Delete /> : null}
      {confirm ? (
        <Confirm
          setIsConfirm={setIsConfirm}
          handleClick={() => bulkDeleteContacts()}
        />
      ) : null}
      {isAlert ? (
        <ImportContact
          uploadData={uploadData}
          setIsAlert={setIsAlert}
          setIsUpload={setIsUpload}
        />
      ) : null}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="checkboxes">
                <input
                  className="checkbox"
                  type="checkbox"
                  ref={ref}
                  checked={selectAllCheckboxChecked}
                  onChange={(e) => {
                    selectAllCheckboxChanged(e);

                    if (e.target.checked == true) {
                      for (let contact of contacts) contact.checked = true;
                    } else {
                      for (let contact of contacts) contact.checked = false;
                    }
                    console.log(contacts);
                  }}
                />
              </th>
              <th className="name">Name</th>
              <th className="designation">Designation</th>
              <th className="company">Company</th>
              <th className="industry">Industry</th>
              <th className="email">Email</th>
              <th className="phoneNumber">Phone Number</th>
              <th className="country">Country</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts
              .filter((contact) => {
                if (searchTerm === "") {
                  return contact;
                } else if (
                  contact.email.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return contact;
                }
              })
              .map((contact) => {
                return (
                  <Contact
                    key={contact._id}
                    {...contact}
                    uploadData={uploadData}
                    setIsDelete={setIsDelete}
                    onCheckboxChanged={(checked) => {
                      contact.checked = checked;
                      setContacts([...contacts]);
                      if (!checked) setSelectAllCheckboxChecked(false);
                    }}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
