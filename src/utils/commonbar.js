
import { useMemo } from 'react';
import { Typography } from '@mui/material';

/**
 * CommonBar Component
 * 
 * Data structure:
 * {
 *   percent: number - Percentage of the bar
 *   value: string - Display value
 *   text: string - Label text
 *   color: string - Color code for the segment
 * }
 * 
 * Visual representation:
 * _________________________________________________________________________
 * |               |               |               |                       |
 * |  32%(Green)   |   18%(Blue)   |   28%(Red)    |   Other(Gray)         |
 * |_______________|_______________|_______________|_______________________|
 */

const BAR_BG = '#BFBFBF';
const BAR_BORDER = '#323D72';
const MIN_SEGMENT_WIDTH = 28;

export const CommonBar = ({ height = 40, data = [], showPercent = true}) => {
    
    const { processedData } = useMemo(() => {
        const total = data.reduce((sum, item) => {
            return sum + (item?.percent ?? 0);
        }, 0);
        
        const processed = [...data];
        processed.is_matched = total === 100;
        
        return {
            totalPercent: total,
            processedData: processed
        };
    }, [data]);

    const renderSegmentContent = (item) => {
        if (item.percent <= 0) return null;
        
        return (
            <>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1,
                        textAlign: "center",
                    }}
                >
                    {showPercent ? `${item.percent}%` : ''}
                </Typography>
                {item.value && (
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            color: "#fff",
                            lineHeight: 1,
                            textAlign: "center",
                            opacity: 0.9,
                        }}
                    >
                        {item.value}
                    </Typography>
                )}
                {item.text && (
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            color: "#fff",
                            lineHeight: 1,
                            textAlign: "center",
                            opacity: 0.8,
                        }}
                    >
                        {item.text}
                    </Typography>
                )}
            </>
        );
    };

    return (
        <div
            style={{
                height,
                width: '100%',
                flex: "1 1 120px",
                backgroundColor: BAR_BG,
                border: `2px solid ${BAR_BORDER}`,
                overflow: "hidden",
                position: "relative",
                display: "flex",
                alignItems: "stretch",
            }}
        >
            {processedData.map((item, index) => {
                const isLastSegment = index === processedData.length - 1;
                const shouldShowBorder = !isLastSegment || !processedData.is_matched;
                
                return (
                    <div
                        key={`segment-${index}`}
                        style={{
                            width: `${item.percent}%`,
                            backgroundColor: item.color,
                            borderRight: shouldShowBorder ? `2px solid ${BAR_BORDER}` : 'none',
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: item.percent > 0 ? MIN_SEGMENT_WIDTH : 0,
                            position: "relative",
                            padding: "2px",
                        }}
                    >
                        {renderSegmentContent(item)}
                    </div>
                );
            })}
        </div>
    );
};
