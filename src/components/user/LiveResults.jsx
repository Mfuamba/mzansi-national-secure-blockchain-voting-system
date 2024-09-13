import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../../styles/LiveResults.css';
import Map from './Map'; // Import the Map component
import { mockPoliticalParties } from '../mockData'; // Import mock data

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const PAGE_SIZE = 10;

const LiveResults = () => {
    const [page, setPage] = useState(1);
    const [chartType, setChartType] = useState('bar'); // Default chart type

    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentPageData = mockPoliticalParties.slice(startIndex, endIndex);

    // Sort parties by votes and take the top 5
    const topParties = [...currentPageData].sort((a, b) => b.votes - a.votes).slice(0, 5);

    // Prepare data for chart
    const chartData = {
        labels: topParties.map(party => party.name),
        datasets: [{
            label: 'Votes',
            data: topParties.map(party => party.votes),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            borderRadius: 10, // Add border radius to bars
        }],
    };

    const pieData = {
        labels: topParties.map(party => party.name),
        datasets: [{
            data: topParties.map(party => party.votes),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
        }],
    };

    return (
        <section className="live-results">
            <div className="results-content">
                <div className="chart-container">
                    <div className="chart-controls">
                        <button onClick={() => setChartType('bar')} className={chartType === 'bar' ? 'active' : ''}>Bar Graph</button>
                        <button onClick={() => setChartType('pie')} className={chartType === 'pie' ? 'active' : ''}>Pie Chart</button>
                    </div>
                    {chartType === 'bar' ? (
                        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                    ) : (
                        <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} />  // Move legend to the right for better spacing
                    )}
                </div>
                <div className="map-container">
                    <Map />
                </div>
            </div>
        </section>
    );
};

export default LiveResults;
