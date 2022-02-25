const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const appData = ['bonfire', 'cardio', 'case', 'character', 'bonsai'];

const uniqPref = (keyword) => {
    var start = 0;
    appData.forEach((data) => {
        if ((data[start] = keyword[start])) {
            start++;
        }
    });
    return keyword.substr(0, start - 1);
};

const computePrefix = (keywords) => {
    let result = [];
    const keywordArr = keywords.split(',');
    keywordArr.forEach((keyword) => {
        if (appData.includes(keyword)) {
            result.push({
                keyword,
                status: 'found',
                prefix: uniqPref(keyword),
            });
        } else {
            result.push({
                keyword,
                status: 'not_found',
                prefix: 'not_applicable',
            });
        }
    });

    return result;
};

app.get('/prefixes', async (req, res) => {
    const keywords = req.query.keywords;
    console.log(keywords);
    const response = computePrefix(keywords);
    res.send(response);
});

app.listen(5001, () => {
    console.log('Server running on port 5001');
});
