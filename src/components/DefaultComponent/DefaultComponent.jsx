import React from 'react';
import Header from '../Header/Header';
import HomeFooter from '../HomeFooter/HomeFooter';

const DefaultComponent = ({ children }) => {
    return (
        <div>
            <Header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 5,
                    backgroundColor: "white",
                }}
            />
            {children}
            <HomeFooter />
        </div>
    );
};

export default DefaultComponent;
