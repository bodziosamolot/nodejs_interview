const express = require('express');
const axios = require('axios');

class Repository {
    static cpiUsUrl = "https://www.econdb.com/api/series/CPIus/?API_TOKEN=b0f21c0ee9ebf00cac5f4d5015e8fd9d0a6b01c8&format=json"
    static cpiFrUrl = "https://www.econdb.com/api/series/CPIfr/?API_TOKEN=b0f21c0ee9ebf00cac5f4d5015e8fd9d0a6b01c8&format=json"
    static gdpUsUrl = "https://www.econdb.com/api/series/GDPus/?API_TOKEN" + this.apiToken + "=&format=json"
    static gdpFrUrl = "https://www.econdb.com/api/series/GDPfr/?API_TOKEN" + this.apiToken + "=&format=json"

    constructor() {
    }

    static async getCPIus() {
        try {
            const response = await axios.get(this.cpiUsUrl);
            return response.data;
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }

    static async getCPIfr() {
        try {
            const response = await axios.get(this.cpiFrUrl);
            return response.data;
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }

    static async getGDPfr() {
        try {
            const response = await axios.get(this.gdpUsUrl);
            return response.data;
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }

    static async getGDPus() {
        try {
            const response = await axios.get(this.gdpFrUrl);
            return response.data;
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }
}

const app = express();

app.get('/financial/cpi/us', (req, res) => {
    try {
        const financialData = Repository.getCPIus(req.params.id).then(response => res.json(response));
    } catch (error) {
        res.status(401).json({ error: 'An error occurred while fetching student data.' });
    }
});

app.get('/financial/gdp/us', (req, res) => {
    try {
        const financialData = Repository.getGDPus(req.params.id).then(response => res.json(response));
    } catch (error) {
        res.status(401).json({ error: 'An error occurred while fetching student data.' });
    }
});


app.get('/financial/gdp/fr', (req, res) => {
    try {
        const financialData = Repository.getGDPfr(req.params.id).then(response => res.json(response));
    } catch (error) {
        res.status(401).json({ error: 'An error occurred while fetching student data.' });
    }
});

app.get('/financial/cpi/fr', (req, res) => {
    try {
        const financialData = Repository.getCPIfr(req.params.id).then(response => res.json(response));
    } catch (error) {
        res.status(401).json({ error: 'An error occurred while fetching student data.' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
