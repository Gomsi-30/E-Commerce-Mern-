
import dotenv from 'dotenv';
import {app} from "./app.js";
import { connectDB } from "./config/database.js";

dotenv.config();

//connecting
connectDB()

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting down...');
  console.log(err)
  server.close(() => {
    process.exit(1); // Exit the process after the server is closed
  });
});

process.on('uncaughtException', (err) => {
  console.log('uncaughtException! Shutting down...');
    process.exit(1); // Exit the process after the server is closed
});




















// READING FILE -> COMPRESSING FILE -> WRITING FILE


// import express from 'express';
// import { pipeline } from 'node:stream/promises';
// import { createReadStream, createWriteStream } from 'node:fs';
// import { createGzip } from 'node:zlib';

// const app = express();

// app.get('/compress', async (req, res) => {
//   try {
//     // Ye stream pipeline start kar raha hai
//     await pipeline(
//       createReadStream('archive.txt'),  // File read kar raha hai
//       createGzip(),                     // Data ko compress kar raha hai
//       createWriteStream('archive.txt.zip') // Compressed data ko new file mein save kar raha hai
//     );

//     res.send('File compression succeeded.');
//   } catch (error) {
//     console.error('Pipeline failed.', error);
//     res.status(500).send('File compression failed.');
//   }
// });

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });



// ABORTING A STREAM
// import express from 'express';
// import { pipeline } from 'node:stream/promises';
// import { createReadStream, createWriteStream } from 'node:fs';
// import { createGzip } from 'node:zlib';

// const app = express();

// app.get('/compress', async (req, res) => {
//   const ac = new AbortController();   // JAVASCRIPT API TO CANCEL THE ASYNCCHRONOUS OPERATION
//   const { signal } = ac;

//   // Let's say we want to abort the stream after a delay or specific condition
//   setTimeout(() => ac.abort(), 10); // Abort after 100ms

//   try {
//     // Pipeline for streaming data with abort signal
//     await pipeline(
//       createReadStream('archive.txt'), // Read the file in chunks
//       createGzip(),                    // Compress the chunks
//       createWriteStream('archive.zip'), // Write the compressed data
//       { signal }                        // Pass the abort signal
//     );

//     res.send('File compression succeeded.');
//   } catch (err) {
//     if (err.name === 'AbortError') {
//       console.error('Pipeline was aborted');
//       res.status(500).send('File compression was aborted.');
//     } else {
//       console.error('Pipeline failed', err);
//       res.status(500).send('File compression failed.');
//     }
//   }
// });

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });

// import express from 'express';

// import redis from 'express-redis-cache';

// // Create a custom Redis client
// const redisClient = redis({
//     host: 'localhost',
//     port: 6379,
//     prefix:'hello'
// })

// const app = express();

// // Example route with caching
// app.get('/data',redisClient.route(), async(req, res) => {
  
  // let data = await redisClient.get('data');
  // if(data){
  //   res.send({data});
  // }else{
  //     for(let i=0; i<10000000000; i++){
  //        data+=i
  //     }
  //   data = await redisClient.set('data',data);
  //   res.send({data});
  // }


//   let data = 0;
//   for(let i=0; i<10000000000; i++){
//            data+=i
//      }
//      res.send({data});
// });





// import express from 'express';
// import redis from 'redis';

// // Create a custom Redis client
// const redisClient = redis.createClient({
//     host: 'localhost',
//     port: 6379,
// });

// const connectRedis =  () => {
//     try {
//        redisClient.connect();
// // if(redisClient.connect()){
// //   console.log("connectedji");
// // }

//         // Log a message when Redis successfully connects
//         redisClient.on('connect', () => {
//             console.log('Connected to Redis successfully');
//         });

//         // Log an error message if there's an issue connecting to Redis
//         redisClient.on('error', (err) => {
//             console.error('Redis connection error:', err);
//         });

//     } catch (err) {
//         console.error('Failed to connect to Redis:', err);
//     }
// };

// connectRedis();

// const app = express();

// // Example route with caching
// app.get('/data', async (req, res) => {
//     console.log('Route /data called');
//     // await redisClient.del('data')
//     let data = await redisClient.get('data');
//     if (data) {
//         console.log('Data found in cache');
//         res.send({ data });
//     } else {
//         console.log('Data not found in cache, computing...');

//         // Initialize data as a number
//         data = 0;
//         for (let i = 0; i < 1000000000; i++) {
//             data += i;
//         }

//         // Cache the computed data
//         await redisClient.set('data', data.toString(),{EX:60});
//         res.send({ data });
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// // docker run -d --name redis-server -p 6379:6379 -p 8001:8001 redis/redis-stack:latest