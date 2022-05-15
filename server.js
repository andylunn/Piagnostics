let express = require('express');

let PORT = process.env.PORT || '5001';

let app = express();

// Serve up public static files
app.use(express.static('./'));

// // Kick off a new job by adding it to the work queue
// app.post('/job', async (req, res) =>
// {
//     let f =
//     {
//         DataBuffer: req.body.file
//     };

//     upload = await cloud.UploadFile(f);
//     let job = await workQueue.add(upload);
//     res.json({ id: job.id });
// });

// // Allows the client to query the state of a background job
// app.get('/job/:id', async (req, res) =>
// {
//   let id = req.params.id;
//   let job = await workQueue.getJob(id);

//   if (job === null)
//   {
//     res.status(404).end();
//   }
//   else
//   {
//     let state = await job.getState();
//     let progress = job._progress;
//     let reason = job.failedReason;

//     res.json({ id, state, progress, reason });
//   }
// });

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
