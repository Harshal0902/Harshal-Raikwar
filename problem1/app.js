const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const goAPI = async (urlData) => {
	console.log(urlData);
	let dataArr = [];
	try {
		const res = await axios.all(urlData.map((url) => axios.get(url)));
		const resArr = res.map((res) => res.data.numbers);
		resArr.forEach((res) => (dataArr = [...dataArr, ...res]));
	} catch (err) {
		console.log(err.message);
	}
	return [...new Set(dataArr.sort((a, b) => a - b))];
};

goAPI();

app.get('/numbers', async (req, res) => {
	const urls = req.query.url;
	const response = await goAPI(urls);
	res.send(response);
});

app.listen(5000, () => {
	console.log('Server running on port 5000');
});
