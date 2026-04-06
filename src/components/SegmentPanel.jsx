import { useEffect, useMemo, useState } from "react";

function formatK(value) {
    return `$${Math.round(value / 1000)}K`;
}

function formatPercent(value) {
    return `${(value * 100).toFixed(1)}%`;
}

export default function SegmentPanel() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/profitmatrix-data")
            .then((res) => res.json())
            .then((data) => setRows(data))
            .catch((err) => console.error("Failed to load data:", err));
    }, []);

    const summary = useMemo(() => {
        if (!rows.length) return null;

        const base = {
            Grow: {
                label: "Grow",
                count: 0,
                revenue: 0,
                margin: 0,
                opportunity: 0,
                vmPctSum: 0,
            },
            Defend: {
                label: "Defend",
                count: 0,
                revenue: 0,
                margin: 0,
                opportunity: 0,
                vmPctSum: 0,
            },
            "Review/Fix": {
                label: "Review/Fix",
                count: 0,
                revenue: 0,
                margin: 0,
                opportunity: 0,
                vmPctSum: 0,
            },
            Optimize: {
                label: "Optimize",
                count: 0,
                revenue: 0,
                margin: 0,
                opportunity: 0,
                vmPctSum: 0,
            },
        };

        rows.forEach((row) => {
            const segment = row.segment;
            if (!base[segment]) return;

            const revenue = parseFloat(row.revenue || 0);
            const margin = parseFloat(row.variable_margin || 0);
            const opportunity = parseFloat(row.opportunity || 0);
            const vmPct = parseFloat(row.vm_pct || 0);

            base[segment].count += 1;
            base[segment].revenue += revenue;
            base[segment].margin += margin;
            base[segment].opportunity += opportunity;
            base[segment].vmPctSum += vmPct;
        });

        const totalRevenue = Object.values(base).reduce((sum, item) => sum + item.revenue, 0);
        const totalMargin = Object.values(base).reduce((sum, item) => sum + item.margin, 0);
        const totalOpportunity = Object.values(base).reduce((sum, item) => sum + item.opportunity, 0);

        Object.values(base).forEach((item) => {
            item.avgVmPct = item.count ? item.vmPctSum / item.count : 0;
            item.revenueShare = totalRevenue ? item.revenue / totalRevenue : 0;
            item.marginShare = totalMargin ? item.margin / totalMargin : 0;
            item.opportunityShare = totalOpportunity ? item.opportunity / totalOpportunity : 0;
        });

        return {
            segments: base,
            totals: {
                revenue: totalRevenue,
                margin: totalMargin,
                opportunity: totalOpportunity,
                count: rows.length,
            },
        };
    }, [rows]);

    if (!summary) {
        return <div style={{ padding: "16px" }}>Loading segment data...</div>;
    }

    const { segments } = summary;

    const cardBase = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "14px",
        textAlign: "center",
        gap: "2px", // tighter spacing
    };

    const titleStyle = {
        margin: 0,
        fontSize: "1.2rem",
        fontWeight: 500,
        color: "#3a477f",
    };

    const metricStyle = {
        margin: "6px 0",
        fontSize: "2.6rem", // slightly smaller than before
        fontWeight: 700,
        lineHeight: 1,
    };

    const metaStyle = {
        margin: 0,
        fontSize: "0.95rem",
        color: "#3a477f",
    };

    const detailStyle = {
        margin: 0,
        fontSize: "0.8rem",
        color: "#3a477f",
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: "12px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "560px",
                    aspectRatio: "1.45 / 1",
                    border: "2px solid #3a477f",
                    borderRadius: "34px",
                    overflow: "hidden",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "1fr 1fr",
                    backgroundColor: "#ffffff",
                }}
            >
                <div
                    style={{
                        ...cardBase,
                        borderRight: "2px solid #3a477f",
                        borderBottom: "2px solid #3a477f",
                    }}
                >
                    <h3 style={titleStyle}>{segments.Grow.label}</h3>
                    <p style={{ ...metricStyle, color: "#000000" }}>
                        {formatK(segments.Grow.margin)}
                    </p>
                    <p style={metaStyle}>{segments.Grow.count} Accounts</p>
                    <p style={detailStyle}>Revenue: {formatK(segments.Grow.revenue)}</p>
                    <p style={detailStyle}>Avg VM%: {formatPercent(segments.Grow.avgVmPct)}</p>
                </div>

                <div
                    style={{
                        ...cardBase,
                        borderBottom: "2px solid #3a477f",
                    }}
                >
                    <h3 style={titleStyle}>{segments.Defend.label}</h3>
                    <p style={{ ...metricStyle, color: "#7fa34d" }}>
                        {formatK(segments.Defend.margin)}
                    </p>
                    <p style={metaStyle}>{segments.Defend.count} Accounts</p>
                    <p style={detailStyle}>Revenue: {formatK(segments.Defend.revenue)}</p>
                    <p style={detailStyle}>Avg VM%: {formatPercent(segments.Defend.avgVmPct)}</p>
                </div>

                <div
                    style={{
                        ...cardBase,
                        borderRight: "2px solid #3a477f",
                    }}
                >
                    <h3 style={titleStyle}>{segments["Review/Fix"].label}</h3>
                    <p style={{ ...metricStyle, color: "#cf4e2e" }}>
                        {formatK(segments["Review/Fix"].opportunity)}
                    </p>
                    <p style={metaStyle}>{segments["Review/Fix"].count} Accounts</p>
                    <p style={detailStyle}>
                        Margin: {formatK(segments["Review/Fix"].margin)}
                    </p>
                    <p style={detailStyle}>
                        Avg VM%: {formatPercent(segments["Review/Fix"].avgVmPct)}
                    </p>
                </div>

                <div style={cardBase}>
                    <h3 style={titleStyle}>{segments.Optimize.label}</h3>
                    <p style={{ ...metricStyle, color: "#000000" }}>
                        {formatK(segments.Optimize.opportunity)}
                    </p>
                    <p style={metaStyle}>{segments.Optimize.count} Accounts</p>
                    <p style={detailStyle}>Margin: {formatK(segments.Optimize.margin)}</p>
                    <p style={detailStyle}>Avg VM%: {formatPercent(segments.Optimize.avgVmPct)}</p>
                </div>
            </div>
        </div>
    );
}