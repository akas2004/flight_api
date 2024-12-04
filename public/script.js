// Function to fetch flight data from the backend API
async function fetchFlights() {
    try {
      const response = await fetch('https://your-app-name.onrender.com/api/flights'); // Replace with your Render API URL
      if (!response.ok) throw new Error('Failed to fetch flights');
      
      const flights = await response.json(); // Parse the response as JSON
      const tableBody = document.getElementById('flightData');
      tableBody.innerHTML = ''; // Clear any previous data
  
      // Insert rows into the table for each flight
      flights.forEach(flight => {
        const row = `
          <tr>
            <td>${flight.flightNumber}</td>
            <td>${new Date(flight.departureDate).toLocaleString()}</td>
            <td>${flight.origin}</td>
            <td>${flight.destination}</td>
            <td>${flight.availableSeats}</td>
            <td>${flight.companyName}</td>
            <td>${flight.priceInINR}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  }
  
  // Fetch flights when the page is loaded
  document.addEventListener('DOMContentLoaded', fetchFlights);
  