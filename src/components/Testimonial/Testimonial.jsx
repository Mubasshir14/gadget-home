import React from 'react';
import Marquee from 'react-fast-marquee';

const Testimonial = () => {
    return (
        <div className="max-w-screen-xl mx-auto md:mb-20 p-2 my-5">
            <section>
                <div>
                    <div className=" text-[#59C6D2] font-bold text-xl md:text-2xl font-cinzel text-center mb-4">What our clients say</div>

                    <Marquee gradient={false} speed={40} className="">
                        <div className="flex space-x-8">
                            {/* Testimonial Card 1 */}
                            <div className="p-6 bg-[#59C6D2]/10  rounded-lg shadow-md md:w-96 mx-4">
                                <p className="leading-loose text-gray-500 ">
                                    “The team provided excellent service and guided us through every step of our project. Their dedication and expertise were evident throughout the process.”
                                </p>

                                <div className="flex items-center mt-6">
                                    <img
                                        className="object-cover rounded-full w-14 h-14 shadow-lg"
                                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                        alt="Robbert"
                                    />
                                    <div className="ml-4">
                                        <h1 className="font-semibold text-blue-500">Robbert</h1>
                                        
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial Card 2 */}
                            <div className="p-6 bg-[#59C6D2]/10  rounded-lg shadow-md md:w-96 mx-4">
                                <p className="leading-loose text-gray-500 ">
                                    “Working with this team was a pleasure! Their professionalism and attention to detail helped us launch our new campaign seamlessly. Highly recommended!”
                                </p>

                                <div className="flex items-center mt-6">
                                    <img
                                        className="object-cover rounded-full w-14 h-14 shadow-lg"
                                        src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                        alt="Mia Brown"
                                    />
                                    <div className="ml-4">
                                        <h1 className="font-semibold text-blue-500">Mia Brown</h1>
                                        
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial Card 3 */}
                            <div className="p-6 bg-[#59C6D2]/10  rounded-lg shadow-md md:w-96 mx-4">
                                <p className="leading-loose text-gray-500 ">
                                    “Their innovative solutions and prompt support have significantly improved our operational efficiency. We’re looking forward to our continued partnership.”
                                </p>

                                <div className="flex items-center mt-6">
                                    <img
                                        className="object-cover rounded-full w-14 h-14 shadow-lg"
                                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                        alt="Robbert"
                                    />
                                    <div className="ml-4">
                                        <h1 className="font-semibold text-blue-500">Robbert</h1>
                                       
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial Card 4 */}
                            <div className="p-6 bg-[#59C6D2]/10  rounded-lg shadow-md md:w-96 mx-4">
                                <p className="leading-loose text-gray-500 ">
                                    “Exceptional service and delivery! The team went above and beyond to ensure our needs were met, and we are thrilled with the results.”
                                </p>

                                <div className="flex items-center mt-6">
                                    <img
                                        className="object-cover rounded-full w-14 h-14 shadow-lg"
                                        src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                        alt="Mia Brown"
                                    />
                                    <div className="ml-4">
                                        <h1 className="font-semibold text-blue-500">Mia Brown</h1>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Marquee>
                </div>
            </section>
        </div>
    );
};

export default Testimonial;
