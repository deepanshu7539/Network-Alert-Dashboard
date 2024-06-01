# Network Alert Dashboard

The Network Alert Dashboard is a React application that visualizes network alert data using various charts. It provides insights into alert counts over time, severity distribution, top source IPs, and destination ports. The dashboard is designed to be beautiful, responsive, and user-friendly.

## Features

- **Alert Count Over Time**: Line chart showing the number of alerts per day.
- **Alert Severity Distribution**: Bar chart and Pie chart displaying the distribution of alert severities.
- **Top Source IPs**: Bar chart displaying the most frequent source IP addresses.
- **Alerts by Destination Ports**: Bar chart displaying the most frequent destination ports.
- **Combined View**: Radar chart displaying a combined view of top source IPs and destination ports.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Chart.js**: JavaScript library for creating charts.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Dummy Data**: Sample data for demonstration purposes.

## Demo

You can view a live demo of the application [here](https://network-alert-dashboard.vercel.app/).

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/deepanshu7539/Network-Alert-Dashboard.git
    cd network-alert-dashboard
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

- Navigate to `http://localhost:3000` to view the dashboard.
- The dashboard displays various charts representing network alert data.
- The data is processed from a `dummyData` file for demonstration purposes.

## Project Structure

network-alert-dashboard/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ └── Dashboard.js
│ ├── data/
│ │ └── dummyData.js
│ ├── App.js
│ ├── index.css
│ └── index.js
├── .gitignore
├── package.json
└── README.md


- **public/**: Contains the HTML template.
- **src/**: Contains the source code, including components and data.
- **components/**: Contains the `Dashboard.js` component.
- **data/**: Contains the `dummyData.js` file with sample data.
- **App.js**: Main application component.
- **index.css**: Global CSS file.
- **index.js**: Entry point for the React application.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, please contact [deepanshu75378@gmail.com].
