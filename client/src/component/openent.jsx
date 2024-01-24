export default function Openent({ user }) {
  console.log(user);
  return (
    <div className="openent-container">
      <img src="../avatar.png" alt="logo" className="openent-logo" />
      <h2 className="">{user.name}</h2>
    </div>
  );
}
