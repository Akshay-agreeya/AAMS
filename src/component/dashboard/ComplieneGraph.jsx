import React, { useCallback, useEffect, useState } from 'react';
import { getData } from '../../utils/CommonApi';
import { Doughnut } from 'react-chartjs-2';

const bgColors = [
    'rgb(54, 162, 235)',
    'rgb(255, 159, 64)'];

const ComplieneGraph = () => {

    const [compliant, setCompliant] = useState({
        compliant_products: 0,
        non_compliant_products: 0,
    });

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            }
        },
        cutout: '60%',
    }

    const getCompliant = useCallback(async () => {
        try {
            const resp = await getData(`/dashboard/total-products-compliance`);
            setCompliant(resp.contents || { compliant_products: 0, non_compliant_products: 0 });
        }
        catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getCompliant();
    }, [getCompliant]);

    // Ensure data is correctly passed
    const data = {
        labels: [
            'Compliant',
            'Non Compliant',
          ],
        datasets: [
            {
                data: [compliant.compliant_products,compliant.non_compliant_products],
                backgroundColor: bgColors,
            },
        ],
    };

    const legendItems = [
        { label: "Product Compliant", color: bgColors[0], value: compliant.compliant_products },
        { label: "Product non-Compliant", color: bgColors[1], value: compliant.non_compliant_products },
    ];

    const styles = {
        legendContainer: {
            display: "block",
            gap: "15px",
            padding: "10px",
            color: "black",
            borderRadius: "8px",
        },
        legendItem: {
            display: "flex",
            alignItems: "center",
            fontSize:'14px'
        },
        legendBox: {
            width: "12px",
            height: "12px",
            display: "inline-block",
            marginRight: "5px",
            borderRadius: "50px",
            maxWidth: '12px'
        },
    };

    return (
        <div className='activityLeft'>
            <div className="graphOuter">
                <Doughnut data={data} options={options} />
            </div>
            <div style={styles.legendContainer}>
                {legendItems.map((item, index) => (
                    <div key={index} style={styles.legendItem}>
                        <span style={{ ...styles.legendBox, backgroundColor: item.color }}></span>
                        <span className='me-3' style={{ color: bgColors[index] }}>{item.label} </span>( {item.value} )
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ComplieneGraph;
