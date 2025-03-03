import React from 'react';
import AppHeader from '../common/AppHeader';
import errorImg from "../assets/images/error.svg";
import AppFooter from '../common/AppFooter';
import MenuHeader from '../common/MenuHeader';

const ServerError = () => {
    return (

        <div>
            <AppHeader topNav={false} />
            <MenuHeader />
            <div className="adaMainContainer">
                <section className="adminControlContainer errorContainer">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-4 col-12 text-center">
                                <img src={errorImg} alt="" />
                            </div>
                            <div className="col-lg-4 col-12">
                                <div className="errorTextContainer">
                                    <div className="errorCode">ERROR CODE: 500</div>
                                    <div className="errorMessageTitle">OOPS!!</div>
                                    <div className="errorDesc">Sorry, Something went wrong on our end. Please try again later.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
            <AppFooter />
        </div>
    );
};

export default ServerError;
