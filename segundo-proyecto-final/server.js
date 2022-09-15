const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

switch (process.env.NODE_ENV) {
  case 'mongodb':
    const mongoose = require('mongoose');

    const DB = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    );

    mongoose
      .connect(DB, {
        useNewUrlParser: true,
      })
      .then(() => console.log('DB connection successful!'));

    console.log('Using MongoDB!');
    break;
  case 'firebase':
    const admin = require('firebase-admin');
    const serviceAccount = require('ecommer-api-firebase-adminsdk-for4l-089f18e4cf.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log('Using Firebase!');
    break;
  default:
    console.log('Using File System!');
}

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});