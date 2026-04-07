import CardShell from "../components/CardShell";
import FloatingAI from "../components/FloatingAI";
import PricingAgentButton from "../components/PricingAgentButton";
import SegmentPanel from "../components/SegmentPanel";


function ProfilePage() {
    return (
        <div className="page">
            <div className="card-grid">
                <CardShell title="Clustering">
                    <SegmentPanel />
                </CardShell>
                <CardShell title="RFM" />
                <CardShell title="Forecasting" />
            </div>
            <PricingAgentButton /> 
        </div>
    );
}

export default ProfilePage;