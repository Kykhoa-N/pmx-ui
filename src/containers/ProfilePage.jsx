import CardShell from "../components/CardShell";
import FloatingAI from "../components/FloatingAI";

function ProfilePage() {
    return (
        <div className="page">
            <div className="card-grid">
                <CardShell title="Clustering" />
                <CardShell title="RFM" />
                <CardShell title="Forcasting" />
            </div>

            <FloatingAI />
        </div>
    );
}

export default ProfilePage;