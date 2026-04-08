import Plot from "react-plotly.js";

export const createPlot = (plotData, layout = {}) => (
    <Plot
        data={plotData}
        layout={{
            height: 260,
            margin: { t: 10, b: 40, l: 55, r: 20 },
            showlegend: plotData.length > 1,
            legend: { orientation: "h", y: -0.3 },
            plot_bgcolor: "rgba(0,0,0,0)",
            paper_bgcolor: "rgba(0,0,0,0)",
            ...layout
        }}
        config={{ displayModeBar: false, displaylogo: false }}
        style={{ width: "100%" }}
    />
);