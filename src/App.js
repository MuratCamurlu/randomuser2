import React, { useState, useEffect } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [person, setPerson] = useState([]);
  const [userTitle, setUserTitle] = useState("");
  const [value, setValue] = useState("");
  const [flag, setFlag] = useState(false);
  const [table, setTable] = useState([]);

  const getUser = async () => {
    try {
      const { data } = await axios(url);
      setPerson(data.results[0]);
      // console.log(person)
      setUserTitle("name");
      setValue(`${data.results[0].name.first} ${data.results[0].name.last}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const { name, email, dob, location, phone, login } = person;

  const handleInfo = (e) => {
    if (e.target.alt === "user") {
      setValue(`${name.first} ${name.last}`);
      setUserTitle("name");
    }
    if (e.target.alt === "mail") {
      setValue(email);
      setUserTitle("email");
    }
    if (e.target.alt === "age") {
      setValue(dob.age);
      setUserTitle("age");
    }
    if (e.target.alt === "map") {
      setValue(location.street.name);
      setUserTitle("location");
    }
    if (e.target.alt === "phone") {
      setValue(phone);
      setUserTitle("phone");
    }
    if (e.target.alt === "lock") {
      setValue(login.password);
      setUserTitle("password");
    }
  };

  const listUser = () => {
    setFlag(true);
    const similar = table.some((item) => item.Phone === phone);

    const addUser = {
      Firstname: person.name.first,
      Email: person.email,
      Phone: person.phone,
      Age: person.dob.age,
    };

    !similar && setTable([addUser, ...table]);
  };
  console.log(table);

  return (
    <main>
      <div className="block bcg-orange"></div>
      <div className="block">
        <div className="container">
          <img
            src={person?.picture?.large}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {userTitle || `name`} is</p>
          <p className="user-value">
            {" "}
            {value || person?.name?.first + "" + person?.name?.first}{" "}
          </p>
          <div className="values-list">
            <button onMouseOver={handleInfo} className="icon" data-label="name">
              <img
                src={person.gender === "female" ? womanSvg : manSvg}
                alt="user"
                id="iconImg"
              />
            </button>
            <button
              onMouseOver={handleInfo}
              className="icon"
              data-label="email"
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button onMouseOver={handleInfo} className="icon" data-label="age">
              <img
                src={person.gender === "female" ? womanAgeSvg : manAgeSvg}
                alt="age"
                id="iconImg"
              />
            </button>
            <button
              onMouseOver={handleInfo}
              className="icon"
              data-label="street"
            >
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone">
              <img
                onMouseOver={handleInfo}
                src={phoneSvg}
                alt="phone"
                id="iconImg"
              />
            </button>
            <button
              onMouseOver={handleInfo}
              className="icon"
              data-label="password"
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button onClick={getUser} className="btn" type="button">
              new user
            </button>
            <button onClick={listUser} className="btn" type="button">
              add user
            </button>
          </div>

          {flag ? (
            <table className="table">
              <thead>
                <tr className="head-tr">
                  <th className="th">Firstname</th>
                  <th className="th">Email</th>
                  <th className="th">Phone</th>
                  <th className="th">Age</th>
                </tr>
              </thead>
              <tbody>
                {table?.map((item, i) => {
                  return (
                    <tr className="body-tr" key={i}>
                      <td> {item?.Firstname} </td>
                      <td> {item?.Email} </td>
                      <td> {item?.Phone} </td>
                      <td> {item?.Age} </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
