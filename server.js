const express = require('express');
const path = require('path');
const os = require('os'); 
const app = express();
const PORT = 3000;
const APP_NAME = process.env.APP_NAME || "Unknown Instance";
const CONTAINER_ID = os.hostname().slice(0, 12); 

app.use(express.static(__dirname));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve index.html
app.get('/', (req, res) => {
    res.set('X-Served-By', `${APP_NAME} (${CONTAINER_ID})`); // optional header
    res.sendFile(path.join(__dirname, 'index.html'), {}, function(err) {
        if (!err) {
            console.log(`Served by: ${APP_NAME} (${CONTAINER_ID})`);
        }
    });
});

// API endpoint to return instance info
app.get('/instance', (req, res) => {
    res.json({
        instance: APP_NAME,
        containerId: CONTAINER_ID
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (${APP_NAME} - ${CONTAINER_ID})`);
});
