export default function Register() {

    return (
        <div className="card">
            <h1 className="auth-text">Create account</h1>
            <div className="subtitle">Start organizing with love</div>

            <form>
                <input className="form-input" type="text" placeholder="Name" required />
                <input className="form-input" type="email" placeholder="Email" required />
                <input className="form-input" type="password" placeholder="Password" required />
                <input className="form-input" type="password" placeholder="Confirm Password" required />
                <button className="form-button" type="submit">Register</button>
            </form>

            <div className="footer">
                Already have an account?
                <Link to="login.html">Login</Link>
            </div>
        </div>
    )
}