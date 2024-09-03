import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { FiShoppingCart } from "react-icons/fi";
import useCart from "../hooks/UseCart";

const Nav = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                // Handle successful logout
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const linkStyle = {
        color: '#59C6D2',
        backgroundColor: 'transparent',
        border: '2px solid transparent',
        padding: '5px 10px',
        transition: 'border-color 0.3s',
    };

    const activeStyle = {
        borderColor: '#59C6D2',
    };

    const navItem = (
        <>
            <li><NavLink
                to="/"
                style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
            >
                Home
            </NavLink></li>
            <li><NavLink to='/all-product' style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>All Products</NavLink></li>
            {/* <li><NavLink to='/add' style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>Add Craft</NavLink></li>
            <li><NavLink to='/manage' style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>Manage</NavLink></li> */}
            <li><NavLink to='/search' style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
                <FaSearch className=" text-2xl" />
            </NavLink></li>
            <li>
                <Link to='/cart'>
                    <button className="gap-2 flex items-center">
                        <FiShoppingCart className='text-xl' />
                        <div className="badge bg-[#59C6D2] badge-secondary border-0">+{cart.length}</div>
                    </button>
                </Link>
            </li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100 border-b-4 bg-[#59C6D2]/10 border-[#59C6D2]">
                <div className="navbar-start lg:px-4">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-[#59C6D2]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-[#59C6D2]">
                            {navItem}
                        </ul>
                    </div>
                    <p className="font-bold btn-ghost text-2xl">Gadget<span className="text-[#59C6D2]">Home</span></p>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal mr-6 px-1 gap-3 text-[#59C6D2] font-bold items-center justify-center ">
                        {navItem}
                    </ul>
                </div>
                <div className="navbar-end relative">
                    {user ? (
                        <div className='flex items-center gap-3'>
                            <div className="relative">
                                <img
                                    className='w-10 rounded-full cursor-pointer'
                                    src={user?.photoURL}
                                    title={user?.displayName}
                                    alt=""
                                    onClick={toggleDropdown}
                                />
                                {isDropdownOpen && (
                                    <ul className="absolute right-0 mt-2 w-48 bg-[#59C6D2] shadow-lg rounded-lg overflow-hidden z-10 border border-gray-200">
                                    <li>
                                        <Link
                                            to='/profile'
                                            className="block px-4 py-2 text-gray-800 hover:bg-[#59C6D2]/30 hover:border-2 hover:text-white transition-colors duration-200"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/cart'
                                            className="block px-4 py-2 text-gray-800 hover:bg-[#59C6D2] hover:bg-[#59C6D2]/30 hover:border-2  hover:text-white transition-colors duration-200"
                                        >
                                            Cart
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogOut}
                                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#59C6D2] hover:bg-[#59C6D2]/30 hover:border-2  hover:text-white transition-colors duration-200"
                                        >
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                                
                                )}
                            </div>
                        </div>
                    ) : (
                        <Link to='/login' className="btn text-white bg-[#59C6D2]">SIGN IN</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Nav;
