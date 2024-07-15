import { useAuth } from "@/lib/auth";
import defualtUser from "../../../public/user.png";
const Profile = ({ user }) => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout()
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="drawer drawer-end z-50 ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-19 rounded-full text-white border-2 border-green-400 bg-white">
              {user.photoURL ? (
                <img
                  alt="DP"
                  src={user.photoURL}
                  style={{ padding: "5px", borderRadius: "50%" }}
                />
              ) : (
                <img
                  alt="DP"
                  src={defualtUser}
                  style={{ padding: "5px", borderRadius: "50%" }}
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/">Profile</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
