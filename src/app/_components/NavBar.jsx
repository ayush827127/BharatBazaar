"use client"
import { useAuth } from "@/lib/auth";
import { useState, useRef, useEffect } from "react";
import {
  FaShoppingCart,
  FaAngleDown,
  FaTimes,
  FaMapMarkerAlt,
} from "react-icons/fa";
import LoginModal from "./LoginModal";
import Profile from "./Profile";

const Navbar = () => {
  const [selectedAddress, setSelectedAddress] = useState("Loading...");
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const popupRef = useRef(null); // Ref for the popup box
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State for login popup
  const { currentUser } = useAuth();

  async function getCityAndState(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.address) {
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.hamlet ||
          "";
        const state = data.address.state || data.address.county || "";
        return { city, state };
      } else {
        throw new Error("Unable to fetch city and state information");
      }
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  }

  async function fetchAddressSuggestions(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        return data.map((result) => ({
          display_name: result.display_name,
          lat: result.lat,
          lon: result.lon,
        }));
      } else {
        throw new Error("Failed to fetch address suggestions");
      }
    } catch (error) {
      console.error("Error:", error.message);
      return [];
    }
  }

  const handleLocationPopupToggle = (event) => {
    setShowLocationPopup(!showLocationPopup);
  };

  const handleClosePopup = () => {
    setShowLocationPopup(false);
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityAndState(latitude, longitude)
            .then((result) => {
              if (result) {
                setSelectedAddress(result.city + " , " + result.state);
                setShowLocationPopup(false);
              }
            })
            .catch((error) => {
              console.error("Error:", error.message);
            });
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  };

  const handleLocationChange = async (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    if (inputValue.trim() !== "") {
      const suggestions = await fetchAddressSuggestions(inputValue);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
    setShowLocationPopup(false);
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const handleCartClick = () => {
    console.log("My Cart clicked");
  };

  const handleLoginClick = () => {
    if (currentUser) {
      setShowLoginPopup(false); // Close the login popup
      console.log("User Details:", currentUser); // Log user details
    } else {
      setShowLoginPopup(true); // Open the login popup
    }
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  useEffect(() => {
    handleDetectLocation();
  }, []);

  return (
    <nav className="bg-white p-4 flex flex-col md:flex-row items-center shadow-md justify-between relative md:px-20 text-black">
      <div className="flex items-center space-x-4 self-start ">
        <img
          src="Logo.png"
          alt="Logo"
          className="w-20 h-10 md:w-40 md:h-14 lg:mr-8 cursor-pointer md:mr-8 bg-green-400"
        />
        <div className="relative">
          <div
            className="cursor-pointer flex items-center"
            onClick={handleLocationPopupToggle}
          >
            <FaMapMarkerAlt className="text-black" />
            <div className="text-black px-2 py-1 pr-9 md:text-xl sm:max-w-[250px] max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
              {selectedAddress}
            </div>
            <FaAngleDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
          </div>

          {/* Location Popup */}
          {showLocationPopup && (
            <div
              ref={popupRef}
              className="absolute bg-white p-4 shadow-md rounded w-60 sm:w-80 z-50"
              style={{
                top: "calc(100% + 10px)",
                left: 0,
              }}
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
              <h2 className="text-lg font-semibold mb-2">Change Location</h2>
              <button
                onClick={handleDetectLocation}
                className="bg-gray-800 text-white px-4 py-2 rounded mb-2 w-full"
              >
                Detect Current Location
              </button>
              <div className="text-center py-1">or</div>
              <input
                type="text"
                placeholder="Enter desired location"
                value={query}
                onChange={handleLocationChange}
                className="bg-gray-200 border border-gray-300 px-2 py-1 rounded w-full"
              />
              <ul className="max-h-40 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div key={index}>
                    <li
                      className="cursor-pointer"
                      onClick={() =>
                        handleAddressClick(suggestion.display_name)
                      }
                    >
                      {suggestion.display_name}
                    </li>
                    {index !== suggestions.length - 1 && (
                      <hr className="my-2" />
                    )}
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 justify-center w-full md:w-auto mt-4 lg:mr-[99px] md:mr-[99px] md:mt-0">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-200 text-black border border-gray-600 px-2 py-2 rounded w-full md:w-auto md:flex-1"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="absolute top-4 right-7 flex items-center self-start md:self-auto">
        <button onClick={handleCartClick} className="mr-4  ml-2">
          <FaShoppingCart className="text-green-400" size={24} />
        </button>

        {currentUser ? (
          <Profile user={currentUser} />
        ) : (
          <button
            onClick={handleLoginClick}
            className="text-white font-semibold bg-green-400 py-2 rounded px-7  ml-2"
          >
            Login
          </button>
        )}
      </div>

      {/* Login Popup */}
      <LoginModal show={showLoginPopup} onClose={handleCloseLoginPopup} />
    </nav>
  );
};

export default Navbar;
