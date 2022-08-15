import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { firebaseInitialize } from "../../firebaseconfig.js";
import { socket } from "../../index.tsx";
import "./LoginPage.scss";
const LoginPage = () => {
  const [fieldValues, setFieldValues] = useState({
    username: "",
    room: "general",
  });
  const navigate = useNavigate();

  firebaseInitialize();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // redux dispatcher
  const dispatch = useDispatch();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch({ type: "USER_LOGIN", payload: user });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle username and roomname submit

  const handleSubmit = () => {
    socket.emit("joinRoom", {
      username: fieldValues.username,
      room: fieldValues.room,
    });

    dispatch({
      type: "USER_LOGIN",
      payload: { displayName: fieldValues.username },
    });
    navigate(`/chat?room=${fieldValues.room || "general"}`);
  };

  const chatRooms = ["Javascript", "Python", "Ruby", "React", "Angular"];
  return (
    <div className="login">
      {/* <div className="buttonWrapper"> */}
      <form action="" className="form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username </label>
        <input
          type="text"
          name="username"
          className="username"
          onChange={(e) =>
            setFieldValues({ ...fieldValues, username: e.target.value })
          }
        />

        <div className="selectWrapper">
          <label htmlFor="chatRooms">Select Chatroom</label>
          <select
            name=""
            id=""
            className="chatRooms"
            onChange={(e) =>
              setFieldValues({ ...fieldValues, room: e.target.value })
            }
          >
            {chatRooms.map((room, index) => (
              <option key={index} value={room}>
                {room}
              </option>
            ))}
          </select>
        </div>
      </form>

      {/* <button onClick={handleLogin}>Hello Login Here</button> */}
      {/* </div> */}
    </div>
  );
};

export default LoginPage;
