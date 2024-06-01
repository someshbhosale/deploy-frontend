const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const cors = require('cors');
const app = express();

// app.use(cors());

// const url = 'https://results.eci.gov.in/AcResultGenDecNew2023/partywiseresult-S12.htm';  // Replace with the actual results page URL

// async function fetchElectionResults() {
//   try {
//     console.log('Fetching election results...');
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);

//     // Adjust the selector based on the actual structure of the ECI results page
//     const table = $('table');  // Example class, replace with actual class name
//     const rows = table.find('tr');

//     const results = [];
//     rows.each((index, row) => {
//       if (index === 0) return;  // Skip header row
//       const cols = $(row).find('td');
//       results.push({
//         party: $(cols[0]).text().trim(),
//         won: $(cols[1]).text().trim(),
//         leading: $(cols[2]).text().trim(),
//         total: $(cols[3]).text().trim(),
//       });
//     });

//     console.log('Fetched results:', results);
//     return results;
//   } catch (error) {
//     console.error('Error fetching election results:', error);
//     return [];
//   }
// }

// app.get('/api/results', async (req, res) => {
//   const results = await fetchElectionResults();
//   res.json(results);
// });

// module.exports = app;
const port = process.env.PORT || 3000;
app.use("/",(req,res) =>{
    res.send("server is running");
})

app.listen(port, console.log(`server is running on port ${port}`));

module.exports = app ;