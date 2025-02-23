// import React from 'react';
// import { Link } from 'react-router-dom';


// const Navbar = () => {
//   return (
//     <div>
//       <h1>Navbar</h1>
//       <ul>
//         <li><Link to="/">Login</Link></li>
//         <li><Link to="/dashboard">Dashboard</Link></li>
//         <li><Link to="/users">Users</Link></li>
//         <li><Link to="/videos">ideos</Link></li>
//         <li><Link to="/categories">Categories</Link></li>
//         {/* Add other navigation links as needed */}
//       </ul>
//     </div>
//   );
// };

// export default Navbar;
// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <h1>Navbar</h1>
      <ul>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/videos">Videos</Link></li>
        <li><Link to="/categories">Categories</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
