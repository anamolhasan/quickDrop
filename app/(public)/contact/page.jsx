
import React from 'react';
import ContactBanner from './components/ContactBanner';
import ContactUs from './components/ContactUs';

const contactPage = () => {
    return (
        <div className=' w-11/12 mx-auto '>
            {/* <h1 >contact</h1> */}
            <ContactBanner />
            <ContactUs />
        </div>
    );
};

export default contactPage;