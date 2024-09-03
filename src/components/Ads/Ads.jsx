import React from 'react';
import ing1 from '../../assets/ads1.png'
import ing2 from '../../assets/ads2.png'
import ing3 from '../../assets/ads3.png'
import ing4 from '../../assets/ads4.png'
const Ads = () => {
    return (
        <div className='max-w-screen-xl mx-auto md:mb-20 p-2'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mx-auto'>
                <div>
                    <img src={ing1} alt="" />
                </div>
                <div>
                    <img src={ing2} alt="" />
                </div>
                <div>
                    <img src={ing3} alt="" />
                </div>
                <div>
                    <img src={ing4} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Ads;