import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Select,
  MenuItem,
} from "@mui/material";

// An array of country time zones
const countryTimeZones = [
  { country: "South Korea", timeZone: "Asia/Seoul" },
  { country: "United States", timeZone: "America/New_York" },
  { country: "United Kingdom", timeZone: "Europe/London" },
  // Add more countries and time zones as needed
];

// Styling for the card
const cardStyle = {
  marginTop: "16px",
};

const App = () => {
  // State to track the selected country
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    // Set up an interval to update the selected country every second
    const intervalId = setInterval(() => {
      setSelectedCountry(selectedCountry); // Trigger re-render to update the converted time
    }, 1000);

    // Clean up the interval when the component is unmounted or the selected country changes
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedCountry]);

  // Event handler for country selection
  const handleCountryChange = (event) => {
    const { value } = event.target;
    setSelectedCountry(value);
  };

  // Function to get the converted time for the selected country
  const getConvertedTime = (country) => {
    const timeZone = countryTimeZones.find(
      (ct) => ct.country === country
    )?.timeZone;
    if (!timeZone) return "Invalid country selection";
    const koreanDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
    });
    const convertedDate = new Date(koreanDate).toLocaleString("en-US", {
      timeZone,
    });
    return convertedDate;
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Time Zone Converter
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Select a country to view its time in the Korean time zone
      </Typography>
      {/* Dropdown select input for country selection */}
      <Select
        value={selectedCountry}
        onChange={handleCountryChange}
        fullWidth
        margin="normal"
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select a country
        </MenuItem>
        {/* Generate menu items based on countryTimeZones array */}
        {countryTimeZones.map(({ country }) => (
          <MenuItem value={country} key={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
      {/* Display the converted time when a country is selected */}
      {selectedCountry && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card style={cardStyle}>
              <CardHeader title={selectedCountry} />
              <CardContent>{getConvertedTime(selectedCountry)}</CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {/* Description for automatic real-time updates */}
      <Typography variant="body2" align="center" gutterBottom>
        The converted time will update automatically in real time.
      </Typography>
    </Container>
  );
};

export default App;
