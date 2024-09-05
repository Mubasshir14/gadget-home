import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useCart from "../hooks/UseCart";
import img from '../../assets/user.png';

const Profile = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                // Navigate to login or home page if needed
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    // List of special email addresses
    const specialEmails = [
        "mubasshiralkasshaf22@gmail.com",
        "cse12105003brur@gmail.com",
        "mubasshiralkasshaf02@gmail.com"
    ];

    // Check if the user email is in the specialEmails list
    const isSpecialUser = specialEmails.includes(user?.email);

    // Set the background image for the profile header
    const bgStyle = {
        backgroundImage: `url(${user?.photoURL || img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div className={`${isSpecialUser ? "bg-gray-100 dark:bg-gray-900" : "flex items-center justify-center min-h-[calc(100vh-200px)] p-2"}`}>
            {isSpecialUser ? (
                <>
                    <div className="h-32 w-full flex items-center justify-center" style={bgStyle}>
                        <h1 className="text-white text-3xl font-semibold">My Profile</h1>
                    </div>
                    <div className="flex flex-col items-center mt-6">
                        <div className="relative">
                            <img
                                src={user?.photoURL || img}
                                alt="Profile"
                                className="w-32 h-32 mx-auto rounded-full border-4 border-white dark:border-gray-800"
                            />
                            <Link to="/update-profile" className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 4h6M4 4h6M10 14h6M4 14h6M10 6h6M4 6h6M10 18h6M4 18h6" />
                                </svg>
                            </Link>
                        </div>
                        <div className="mt-4 text-center">
                            <h2 className="text-2xl font-semibold text-blue-600">{user?.displayName}</h2>
                            <p className="text-sm text-gray-600">{user?.email}</p>
                            <p className="text-sm text-gray-600">Cart Items: {cart.length}</p>
                        </div>
                        <div className="mt-6 space-x-4 mb-3">
                            <Link to="/manage" className="btn bg-blue-500 text-white px-4 py-2 rounded-md">Manage Product</Link>
                            <Link to="/add" className="btn bg-green-500 text-white px-4 py-2 rounded-md">Add Item</Link>
                            <Link to="/manage-order" className="btn bg-green-500 text-white px-4 py-2 rounded-md">Manage Order</Link>
                            <Link to="/all-users" className="btn bg-green-500 text-white px-4 py-2 rounded-md">Mamane Users</Link>
                            <button onClick={handleLogOut} className="btn bg-red-500 text-white px-4 py-2 rounded-md">Sign Out</button>
                        </div>
                    </div>
                </>
            ) : (

                <div className="flex flex-col">
                    <div className="h-32 w-full flex items-center justify-center border-b-2" style={bgStyle}>
                        <h1 className="text-white text-3xl font-semibold">My Profile</h1>
                    </div>
                    <div className="flex flex-col items-center mt-6">
                        <div className="relative">
                            <img
                                src={user?.photoURL || img}
                                alt="Profile"
                                className="w-32 h-32 mx-auto rounded-full border-4 border-white dark:border-gray-800"
                            />
                            <Link to="/update-profile" className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 4h6M4 4h6M10 14h6M4 14h6M10 6h6M4 6h6M10 18h6M4 18h6" />
                                </svg>
                            </Link>
                        </div>
                       
                        <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                        <div className="my-2 space-y-1">
                            <h2 className="text-xl font-semibold text-[#59C6D2]">{user?.displayName}</h2>
                            <p className="px-5 text-xs text-[#59C6D2]">{user?.email}</p>
                            <Link to='/cart' className="px-5 text-xl text-[#59C6D2]">Cart: {cart.length}</Link>
                        </div>
                        <div className="flex justify-center pt-2 space-x-4 align-center">
                            <button onClick={handleLogOut} className="btn bg-[#59C6D2] text-white">SIGN OUT</button>
                        </div>
                    </div>
                    </div>
                </div>
                // <div className="flex flex-col border-[#59C6D2] border-2  justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">

                    
                //     {/* <img src={user?.photoURL || img} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                //     <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                //         <div className="my-2 space-y-1">
                //             <h2 className="text-xl font-semibold text-[#59C6D2]">{user?.displayName}</h2>
                //             <p className="px-5 text-xs text-[#59C6D2]">{user?.email}</p>
                //             <Link to='/cart' className="px-5 text-xl text-[#59C6D2]">Cart: {cart.length}</Link>
                //         </div>
                //         <div className="flex justify-center pt-2 space-x-4 align-center">
                //             <button onClick={handleLogOut} className="btn bg-[#59C6D2] text-white">SIGN OUT</button>
                //         </div>
                //     </div> */}
                // </div>
            )}
        </div>
    );
};

export default Profile;
