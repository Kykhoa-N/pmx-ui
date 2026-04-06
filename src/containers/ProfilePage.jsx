import CardShell from "../components/CardShell";
import FloatingAI from "../components/FloatingAI";
import PricingAgentButton from "../components/PricingAgentButton";


function ProfilePage() {
    return (
        <div className="page">
            <div className="card-grid">
                <CardShell title="Clustering" />
                <CardShell title="RFM" />
                <CardShell title="Forcasting" />
            </div>
            <PricingAgentButton /> 
        </div>
    );
}

export default ProfilePage;