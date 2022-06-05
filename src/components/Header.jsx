import userImage from '../photos/userImage.jpg';

const Header = ({setSearchTerm}) => {

  return (
    <div className="header">
      <h2 id="heading">Total Contacts</h2>
      <input
        id="search"
        type="text"
        className="search"
        placeholder="Search by Email Id....."
        onChange={(e) => {setSearchTerm(e.target.value);}}
      />
      <img id="image" src={userImage} alt="img" />
      <div className="admin">
        <p id="admin">Admin</p>
     
        <p id="user">Normal User</p>
      </div>
    </div>
  );
}

export default Header;