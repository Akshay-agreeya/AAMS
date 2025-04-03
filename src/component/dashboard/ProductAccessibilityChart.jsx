import React, { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { getData } from '../../utils/CommonApi';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement,ArcElement, Title, Tooltip, Legend);

const bgColors = [
    'rgb(54, 162, 235)',
    'rgb(64, 197, 130)',
    'rgb(255, 159, 64)',
];
const ProductAccessibilityChart = () => {

    const [productCounts, setProductCounts] = useState([]);


    const getProductCounts = useCallback(async () => {
        try {
            const resp = await getData(`/dashboard/service-type-count`);
           // resp.contents = resp.contents.map((item,index)=>({...item, service_count: (index+1)*20}))
            setProductCounts(resp.contents);
        }
        catch (error) {
            console.log(error);
        }
    }, []);


    useEffect(() => {
        getProductCounts();
    }, [getProductCounts]);


    const options = {
        indexAxis: 'y', // This makes the chart horizontal
        responsive: true, // Makes the chart responsive to window resizing
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true, // Enables the tooltip
            },
        },
        scales: {
            x: {
                beginAtZero: true, // Ensure the y-axis starts at 0
                ticks: {
                    color:'#356A8F',
                    stepSize: 20, // Set the step size for the ticks (20 in your case)
                    max: Math.ceil(Math.max(...productCounts.map(item => item.service_count)) / 20) * 20, // Set max value to nearest multiple of 20
                },
                grid: {
                    display: true, // Keep the grid lines, but you can set to false if you want to hide them
                    color: '#356A8F'
                },
            },
            y: {
                ticks: {
                    display: false, // Hides the tick labels on the y-axis
                },
                grid: {
                    display: false, // Keep the grid lines, but you can set to false if you want to hide them
                },
            },
        },
    };

    const data = {
        labels: productCounts?.map(item => item.name),
        datasets: [
            {
                data: productCounts?.map(item => item.service_count),
                backgroundColor: bgColors,
                barThickness: 45,
            },
        ],
    };

    const legendItems = [
        { label: "Website", color: bgColors[0], value: productCounts?.[0]?.service_count },
        { label: "Mobile App", color: bgColors[1], value: productCounts?.[1]?.service_count },
        { label: "PDF", color: bgColors[2], value: productCounts?.[2]?.service_count },
    ];

    const styles = {
        legendContainer: {
            display: "flex",
            gap: "15px",
            padding: "10px",
            color: "white",
            borderRadius: "8px",
        },
        legendItem: {
            display: "flex",
            alignItems: "center",
        },
        legendCount: {
            display: "flex",
            alignItems: "center",
        },
        legendBox: {
            width: "20px",
            height: "12px",
            display: "inline-block",
            marginRight: "5px",
            borderRadius: "2px",
        },
    };

    return (
        <div>
            <Bar data={data} options={options} height={40} width={'70%'}/>
            <div style={styles.legendContainer}>
                {legendItems.map((item, index) => (
                    <div key={index} style={styles.legendItem}>
                        <span style={{ ...styles.legendBox, backgroundColor: item.color }}></span>
                        <span className='me-3' style={{ color: bgColors[index] }}>{item.label} </span>{item.value}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductAccessibilityChart