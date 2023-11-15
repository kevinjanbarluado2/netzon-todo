import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Todo App
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Todo List
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/privacypolicy">
                                Privacy Policy
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tos">
                                Terms of Service
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
