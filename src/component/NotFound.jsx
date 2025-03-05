import React from "react";
import errorImage from "../assets/images/error.svg";
import Layout from '../component/Layout' 

import errorImg from "../assets/images/error.svg";
import AppFooter from '../common/AppFooter';
import AppHeader from '../common/AppHeader';

const NotFound = () => {

    return (
        <div>
            <AppHeader topNav={false} />
            <div className="adaMainContainer">
                <section className="adminControlContainer errorContainer">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-4 col-12 text-center">
                                <img src={errorImg} alt="" />
                            </div>
                            <div className="col-lg-4 col-12">
                                <div className="errorTextContainer">
                                    <div className="errorCode">ERROR CODE: 404</div>
                                    <div className="errorMessageTitle">OOPS!!</div>
                                    <div className="errorDesc">Sorry, the page you are looking for doesn't exist.</div>
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

export default NotFound;
