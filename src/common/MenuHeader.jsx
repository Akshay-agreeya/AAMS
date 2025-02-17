import React from 'react'
import Navbar from './Navbar';

const MenuHeader = () => {
    return (
        <div className="siteNavigationContainer">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="navigation">
                            <nav className="navbar navbar-expand-lg">


                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <Navbar/>

                                </div>

                            </nav>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuHeader;