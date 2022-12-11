import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import celebrities from "../../data/celebrities.json";
import "./style.css";
import Confirmation from "../Confirmation";



const CelebretiesData = () => {


  const [celebritiesList, setCelebritiesList] = useState([]);
  const [isShow, setIsShow] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [newdata, setNewdata] = useState(celebritiesList[editIndex])

  useEffect(() => {
    celebrities && setCelebritiesList(celebrities);
  }, []);

  const openAccordian = (i) => {
    setIsShow((prev) => (prev === i ? null : i));
  };

  const deleteCelebrity = () => {
    setConfirm(true);
  };

  const ageCoverter = (date) => {
    let dob = new Date(date);
    let monthDeff = Date.now() - dob.getTime();
    let ageDate = new Date(monthDeff);
    let year = ageDate.getUTCFullYear();
    var age = Math.abs(year - 1970);
    return age;
  };

  const handlchange = (e) => {
    setNewdata({ ...newdata, [e.target.name]: e.target.value })
    console.log(e.target.name)

  }

  const handleEdit = (index) => {
    setNewdata(celebritiesList[index])
    setEditIndex(index)
    setIsEdit(false)
  }

  const handleSave = () => {
    celebritiesList.splice(editIndex, 1, newdata)
    setIsEdit(true)

  }

  return (
    <div className="container">
      {confirm && <Confirmation />}

      {celebritiesList.map((data, i) => (
        <div className="accordian" key={data.id}>

          <div className="celebrity-detail">

            <div className="celebrity">

              <img
                src={data.picture}
                alt={data.picture}
                className="celebrity-picture"
              />
              {
                isEdit ? <p>{data.first + ' ' + data.last}</p> :
                  <div className="InputNameFiled">
                    <input
                      name="first"
                      type="text"
                      value={newdata.first}
                      onChange={handlchange}
                    />
                    <input
                      name="last"
                      type="text"
                      value={newdata.last}
                      onChange={handlchange}
                    />
                  </div>
              }


            </div>
            <span className="plus-minus" onClick={() => openAccordian(i)}>
              +
            </span>
          </div>
          {i === isShow && (
            <div>
              <div className="celebrities-dob-gen-country">
                <div>
                  <p>Age</p>
                  {
                    isEdit ? <p>{ageCoverter(data.dob)}</p> :
                      <input
                        name="dob"
                        type="text"
                        value={newdata.dob || ageCoverter(data.dob)}
                        onChange={handlchange}
                      />
                  }
                </div>
                <div>
                  <p> Gender</p>
                  {
                    isEdit ? <p className="gendar">{data.gender}</p> : <select name='Gender' onChange={handlchange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                      <option value="Rather Not Say">Rather Not Say</option>
                    </select>
                  }
                </div>


                <div>
                  <p>Counter</p>

                  {
                    isEdit ? <p>{data.country}</p> : <input
                      type="text"
                      name="country"
                      value={newdata.country}
                      onChange={handlchange}
                    />
                  }

                </div>
              </div>

              <div className="description">
                <p>Description</p>
                {
                  isEdit ? <p>{data.description}</p> :
                    <textarea rows="9" cols="70" name="description" value={newdata.description}
                      onChange={handlchange}
                    ></textarea>
                }

              </div>

              {
                isEdit ? <div className="icons">
                  <RiDeleteBin6Line
                    className="delete"
                    onClick={() => deleteCelebrity(data.id)}
                  />
                  <MdOutlineEdit className="edit" onClick={() => handleEdit(i)} />
                </div> : <div>
                  <button onClick={() => setIsEdit(true)}>cancel</button>
                  <button onClick={handleSave}>save</button>
                </div>
              }




            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CelebretiesData;
