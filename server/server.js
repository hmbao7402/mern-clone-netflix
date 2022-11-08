const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/UserRoute');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log('DB connected successfully');
	})
	.catch((error) => {
		console.log(error);
	});

app.use('/api/user', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log('server is running on port ' + port);
});
