export default function Login() {

    return (
        <div className="card">
            <h1 className="auth-text">Welcome back</h1>
            <div className="subtitle">Log in to your lovely tasks</div>

            <form>
                <input className="form-input" type="email" placeholder="Email" required />
                <input className="form-input" type="password" placeholder="Password" required />
                <button className="form-button" type="submit">Login</button>
            </form>

            <div className="footer">
                Don’t have an account?
                <Link to="register.html">Register</Link>
            </div>
        </div>
    )
}