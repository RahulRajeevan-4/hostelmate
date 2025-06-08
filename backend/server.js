import app from "./app.js"; // Use require for app

import 'dotenv/config';  // Load environment variables once

const PORT = process.env.PORT || 8080; // Use the PORT from .env or default to 8080

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`); // More informative log
});