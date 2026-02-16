import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="notfound-page">
            <div className="notfound-card">

                <div className="notfound-icon">📋</div>

                <h1 className="notfound-title">404</h1>

                <h2 className="notfound-subtitle">
                    Page Not Found
                </h2>

                <p className="notfound-text">
                    Oops! The page you're looking for doesn't exist or was moved.
                </p>

                <Link to="/" className="notfound-button">
                    Go Home
                </Link>

            </div>
        </div>
    )
}