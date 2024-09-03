import { useContext } from "react";
import { GrGoogle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";


const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handlegoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email
                }
                axios.post('http://localhost:5000/users', userInfo)
                .then( res => {
                    console.log(res.data);
                    navigate('/');
                })
            })
    }
    
    return (
        <div>
            <div>
                <p
                    onClick={handlegoogleSignIn}
                    className="flex flex-col items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <div className="px-4 py-2">
                        <GrGoogle />
                    </div>

                    <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
                </p>
            </div>
        </div>
    );
};

export default SocialLogin;