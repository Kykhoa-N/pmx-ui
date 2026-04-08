import { Grid } from "@mui/material";
import PricingAgentChat from "../components/PricingAgentChat"; // adjust path if needed
import PricingAgentButton from "../components/PricingAgentButton"
import SegmentPanel from "../components/SegmentPanel";

export const Dashboard = () => {
    return (
        <div style={{ marginTop: 30, marginBottom: 100 }}>
            <Grid container spacing={2}>
                {/* Clustering Card */}
                <Grid size={4} justifyItems="center">
                    <div style={{ 
                        padding: 20, 
                        border: '1px solid #ccc', 
                        borderRadius: 8,
                        textAlign: 'center',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h3>Clustering</h3>
                        <SegmentPanel /> 
                    </div>
                </Grid>

                {/* RFM Card */}
                <Grid size={4} justifyItems="center">
                    <div style={{ 
                        padding: 20, 
                        border: '1px solid #ccc', 
                        borderRadius: 8,
                        textAlign: 'center',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h3>RFM</h3>
                        <p>Recency, Frequency, Monetary analysis</p>
                    </div>
                </Grid>

                {/* Forecasting Card */}
                <Grid size={4} justifyItems="center">
                    <div style={{ 
                        padding: 20, 
                        border: '1px solid #ccc', 
                        borderRadius: 8,
                        textAlign: 'center',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h3>Forecasting</h3>
                        <p>Sales / demand predictions</p>
                    </div>
                </Grid>

                {/* AI Chatbot – spans full width */}
                <Grid size={12} justifyItems="center">
                    <PricingAgentButton />
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;