import axios from "axios";

export default function Friend({ data, user }) {
  console.log(data);
  console.log(user);
  async function handelclick() {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/addfriends",
        {
          data1: user._id,
          data2: data._id,
        }
      );
      // console.log(response);
      // setFriendsfriend(response.data.data);
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  }
  return (
    <>
      <div className="friend-box">
        <div className="openent-container">
          <img src="../avatar.png" alt="logo" className="openent-logo" />
          <h2 className="">{data.name}</h2>
        </div>
        <button onClick={handelclick}>
          <img src="../add.png" alt="logo" className="add-logo" />
        </button>
      </div>
      <div className="hr"></div>
    </>
  );
}
