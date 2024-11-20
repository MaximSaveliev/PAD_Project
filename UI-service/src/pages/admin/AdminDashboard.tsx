import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const AdminDashboard = () => {
  // Users data with country flags
  const usersByCountry = [
    { country: 'USA', flag: 'https://cdn-icons-png.flaticon.com/512/206/206626.png', count: 1200 },
    { country: 'Germany', flag: 'https://cdn-icons-png.flaticon.com/512/555/555613.png', count: 950 },
    { country: 'France', flag: 'https://cdn-icons-png.flaticon.com/512/206/206657.png', count: 850 },
    { country: 'India', flag: 'https://cdn-icons-png.flaticon.com/512/206/206606.png', count: 1400 },
    { country: 'China', flag: 'https://cdn-icons-png.flaticon.com/512/5111/5111624.png', count: 2000 },
    { country: 'Brazil', flag: 'https://cdn-icons-png.flaticon.com/512/3022/3022546.png', count: 700 },
    { country: 'Russia', flag: 'https://cdn-icons-png.flaticon.com/512/555/555451.png', count: 800 },
  ];

  // Pie Chart Options for News Topics
  const pieChartOptions: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: ['Politics', 'Business', 'Technology', 'Health', 'Science', 'Entertainment', 'Sports'],
    colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF9933', '#9C27B0', '#FFB6C1'],
  };

  // Pie Chart Data for News Topics
  const pieChartData = [25, 15, 20, 10, 5, 15, 10];

  // Line Chart Options for Scraped News per Day
const lineChartOptions: ApexOptions = {
  chart: {
    type: 'area', // 'area' type connects the points with a smooth line and fills the area under it
  },
  xaxis: {
    categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    labels: {
      style: {
        colors: '#fff',
      },
    },
  },
  stroke: {
    curve: 'smooth', // Ensures the line is smooth
    width: 2, // Adjust the width of the line
  },
  colors: ['#FFF'], 
  fill: {
    type: 'gradient', // Adds a gradient color under the line
    gradient: {
      shade: 'light',
      type: 'horizontal',
      gradientToColors: ['#FFF'], // Gradient color after the line
    },
  },
  title: {
    text: 'Number of News Scraped (Weekly)',
    style: {
      fontSize: '16px',
      color: '#fff',
    },
  },
};

  // Line Chart Data for Scraped News per Day
  const lineChartData = [
    {
      name: 'Scraped News',
      data: [10, 12, 15, 18, 16, 14, 13],
    },
  ];

  // Bar Chart for News Sentiment (Positive, Negative, Neutral)
  const barChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: ['Positive', 'Negative', 'Neutral'],
    },
    colors: ['#F9A8D4', '#F4A261', '#2A9D8F'], // Pastel colors
  };

  // Bar Chart Data for News Sentiment Analysis
  const barChartData = [
    {
      name: 'Sentiment Analysis',
      data: [60, 25, 15],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* News Categories Pie Chart */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <h2 className="text-white text-lg font-semibold mb-4">News Topics</h2>
        <Chart options={pieChartOptions} series={pieChartData} type="pie" height={300} />
      </div>

      {/* Scraped News per Day Line Chart */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <h2 className="text-white text-lg font-semibold mb-4">Scraped News per Day</h2>
        <Chart options={lineChartOptions} series={lineChartData} type="line" height={300} />
      </div>

      {/* News Sentiment Bar Chart */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <h2 className="text-white text-lg font-semibold mb-4">News Sentiment Analysis</h2>
        <Chart options={barChartOptions} series={barChartData} type="bar" height={300} />
      </div>

      {/* Users by Country Section */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <h2 className="text-white text-lg font-semibold mb-4">Users by Country</h2>
        <div className="grid grid-cols-2 gap-4">
          {usersByCountry.map((user, index) => (
            <div key={index} className="flex items-center text-white">
              <img src={user.flag} alt={user.country} className="w-6 h-4 mr-2" />
              <span>{user.country}: {user.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
