import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const hangleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const hangleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="netflix-logo" />
      {user && (
        <div className="flex p-2 justify-between ">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={hangleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 hover:bg-purple-950 cursor-pointer hover:scale-[1.02] text-white rounded-lg"
            onClick={hangleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <div className="relative group hidden md:block">
            <img
              className="h-12 w-12 rounded-full border-2 border-gray-600 shadow-md 
               object-cover cursor-pointer hover:scale-110 hover:border-red-500 
               transition-transform duration-300"
              alt="User Icon"
              src={user?.photoURL}
            />

            {/* Tooltip on hover */}
            <span
              className="absolute left-1/2 -translate-x-1/2 -bottom-8 
               text-sm text-white bg-black/80 
               px-2 py-1 rounded-md opacity-0 
               group-hover:opacity-100 group-hover:translate-y-1 
               transition-all duration-300 pointer-events-none whitespace-nowrap"
            >
              User Icon
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="py-2 px-4 mx-4 my-2 bg-red-700 hover:bg-red-900 cursor-pointer hover:scale-[1.02] text-white rounded-lg"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
