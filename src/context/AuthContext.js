// import { createContext, useContext, useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import ToastContext from "./ToastContext";

// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   // const { toast } = useContext(ToastContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     checkUserLoggedIn();
//   }, []);

//   // check if the user is logged in.
//   const checkUserLoggedIn = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/me`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const result = await res.json();
//       if (!result.error) {
//         if (
//           location.pathname === "/login" ||
//           location.pathname === "/login"
//         ) {
//           setTimeout(() => {
//             navigate("/", { replace: true });
//           }, 500);
//         } else {
//           navigate(location.pathname ? location.pathname : "/");
//         }
//         setUser(result);
//       } else {
//         navigate("/login", { replace: true });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // login request.
//   const loginUser = async (userData) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...userData }),
//       });
//       const result = await res.json();
//       if (!result.error) {
//         localStorage.setItem("token", result.token);
//         setUser(result.user);
//         alert((`Logged in ${result.user.email}`));

//         navigate("/", { replace: true });
//       } else {
//         alert((result.error));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // signup request.
//   const signupUser = async (userData) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/signup`, {
//         method: "POST",
        
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...userData }),
//       });
     
//       const result = await res.json();

//       if (!result.error) {
//         alert(("user registered successfully!"));
//         navigate("/login", { replace: true });
//       } else {
//         alert((result.error));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ loginUser, signupUser, user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;






import  React, { useRef, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  //login req
  const loginUser = async (userData) => {
    try {
      const res = await fetch(
        `https://contacts-manager-backend.herokuapp.com/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userData }),
        }
      );

      const result = await res.json();
      if (!result.error) {
        console.log(result);
        localStorage.setItem("token", result.token);
        setUser(result.userData);
        navigate("/contacts");
      } else {
        setError(result.message);
        setTimeout(()=> {
          setError(null);
        }, 3000);

      }
    } catch (err) {
      console.log(err);
      
    }
  };

  //signup req
  const signupUser = async (userData) => {
    try {
      const res = await fetch(
        `https://contacts-manager-backend.herokuapp.com/api/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userData }),
        }
      );

      const result = await res.json();
      if (!result.error) {
        console.log(result);
        navigate("/", { replace: true });
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <AuthContext.Provider value={{ loginUser, signupUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;