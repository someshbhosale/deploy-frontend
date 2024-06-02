const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();

app.use(cors());

const url = 'https://results.eci.gov.in/AcResultGen2ndJune2024/partywiseresult-S02.htm';  // Replace with the actual results page URL

async function fetchElectionResults() {
  try {
    console.log('Fetching election results...');
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const table = $('table');  // Use the correct selector for the table
    const rows = table.find('tr');

    const results = [];
    let totalRow = {};

    rows.each((index, row) => {
      const isTotalRow = $(row).closest('tfoot').length > 0;
      if (index === 0 && !isTotalRow) return;  // Skip header row unless it's a total row

      if (isTotalRow) {
        const cols = $(row).find('th');
        totalRow = {
          party: 'Total',
          won: $(cols[1]).text().trim(),
          leading: $(cols[2]).text().trim(),
          total: $(cols[3]).text().trim(),
        };
      } else {
        const cols = $(row).find('td');
        const party = $(cols[0]).text().trim();
        const won = $(cols[1]).text().trim();
        const leading = $(cols[2]).text().trim();
        const total = $(cols[3]).text().trim();

        // Only add rows with valid data
        if (party && won && leading && total) {
          results.push({
            party,
            won,
            leading,
            total,
          });
        }
      }
    });

    // Add the total row to the results if it exists
    if (Object.keys(totalRow).length) {
      results.push(totalRow);
    }

    console.log('Fetched results:', results);
    return results;
  } catch (error) {
    console.error('Error fetching election results:', error);
    return [];
  }
}

app.get('/api/results', async (req, res) => {
  const results = await fetchElectionResults();
  res.json(results);
});

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
