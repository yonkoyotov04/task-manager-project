export default function ErrorContainer({error, errorSetter}) {
    return (
        <div className="error-container">
            <div className="error-text">
                <p>{error}</p>
            </div>
            <button className="error-close" onClick={() => {
                errorSetter(null)
                }}>×</button>
        </div>
    )
}