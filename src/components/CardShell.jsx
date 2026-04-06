function CardShell({ title, children }) {
    return (
        <div className="card-shell">
            <div className="card-title">{title}</div>
            <div className="card-placeholder">
                {children ? children : "Placeholder"}
            </div>
        </div>
    );
}

export default CardShell;