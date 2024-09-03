import login from '../../assets/ads4.png'
import bg from '../../assets/others/authentication.png'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../Providers/AuthProvider';
import SocialLogin from '../SocialLogin/SocialLogin';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {
    // const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();



    const onSubmit = async data => {
        try {
            // Handle image upload
            const formData = new FormData();
            formData.append('image', data.image[0]);
    
            const response = await axios.post(image_hosting_api, formData);
            const photoURL = response.data.data.url;
    
            // Create user
            const userRes = await createUser(data.email, data.password);
            const loggedUser = userRes.user;
    
            await updateUserProfile(data.name, photoURL);
    
            // Create user entry in database
            const userInfo = {
                name: data.name,
                email: data.email,
                photoURL: photoURL
            };
            const dbRes = await axios.post('http://localhost:5000/users', userInfo);
    
            if (dbRes.data.insertedId) {
                reset();
                Swal.fire({
                    title: 'Success!',
                    text: 'Your account has been created successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate('/');
            }
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    };
    



    return (
        <div>
            <Helmet>
                <title>BISTRO BOSS || SIGN UP</title>
            </Helmet>
            <div>
                <div className='p-6 md:p-20 rounded-xl' style={{ backgroundImage: `url(${bg})` }}>
                    <div className='p-6 md:p-20 rounded-xl shadow-xl shadow-black' style={{ backgroundImage: `url(${bg})` }}>
                        <div className="flex flex-col lg:flex-row-reverse w-full mx-auto overflow-hidden bg-white rounded-lg dark:bg-gray-800 lg:max-w-4xl">
                            <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: `url(${login})` }}></div>


                            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                                <div className="flex justify-center mx-auto">
                                    <img className="w-auto h-7 sm:h-8" src={login} alt="" />
                                </div>

                                <p className="mt-3 text-xl font-bold text-center text-gray-800 dark:text-gray-200">
                                    Login
                                </p>

                                {/* google login */}
                                {/* <a
                                    href="#" className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <div className="px-4 py-2">
                                        <svg className="w-6 h-6" viewBox="0 0 40 40">
                                            <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                            <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                            <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                            <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                        </svg>
                                    </div>

                                    <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
                                </a> */}

                                {/* <div className='flex items-center justify-center w-full'>
                                    <SocialLogin />
                                </div> */}
                                <SocialLogin />


                                <div className="flex items-center justify-between mt-4">
                                    <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                                    <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login
                                        with email</a>

                                    <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                                </div>

                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                // onSubmit={handleSignUp}
                                >
                                    <div className="mt-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Name</label>
                                        <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" {...register("name", { required: true })} name='name' placeholder='Name' type="text" />
                                        {errors.name && <span className='text-red-600'>Name is required</span>}
                                    </div>

                                    {/* image */}
                                    <div className="mt-4">
                                        {/* File Input for Images */}
                                        <div className="form-control w-full my-6">
                                            <input {...register("image", { required: "Image is required" })} type="file" accept="image/*" className="file-input w-full" />
                                            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Email Address</label>
                                        <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" {...register("email", { required: true })} name='email' placeholder='Email' type="email" />
                                        {errors.email && <span className='text-red-600'>Email is required</span>}
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex justify-between">
                                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Password</label>
                                        </div>

                                        <input className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d)(?=.*[a-z])/,
                                        })} name='password' placeholder='Password' type="password" />
                                        {errors.password?.type === "required" && (
                                            <p className='text-red-600'>Password is required</p>
                                        )}
                                        {errors.password?.type === "minLength" && (
                                            <p className='text-red-600'>Password must be 6 characters or more</p>
                                        )}
                                        {errors.password?.type === "maxLength" && (
                                            <p className='text-red-600'>Password can not be more than 20 characters </p>
                                        )}
                                        {errors.password?.type === "pattern" && (
                                            <p className='text-red-600'>Password must have one uppercase, one lowercase, one number and one special character </p>
                                        )}
                                        {/* {errors.password && <span className='text-red-600'>Password is required</span>} */}
                                    </div>


                                    <div className="mt-6">
                                        <input className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#59C6D2] rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" type="submit" value="SIgn Up" />
                                    </div>
                                </form>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                                    <Link to='/login' className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign in</Link>

                                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;