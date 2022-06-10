let express = require('express');
const fs = require('fs')

let PORT = process.env.PORT || '5001';

let app = express();

// Serve up public static files
app.use(express.static('./'));

app.get('/getfilecontents/:filename', async (req, res) =>
{
    fs.stat(req.params.filename, (err, stats) =>
    {
        if (err)
        {
          console.error(err);

          res.status(500);
          return;
        }
        
        fs.readFile(req.params.filename, 'utf8', (err, data) =>
        {
            if (err)
            {
              console.error(err);

              res.status(500);
              return;
            }

            res.json({ contents: data });
        });
    });
});

app.get('/getfilestats/:filename', async (req, res) =>
{
    fs.stat(req.params.filename, (err, stats) =>
    {
        if (err)
        {
          console.error(err);

          res.status(500);
          return;
        }

        res.json({ stats: stats });
    });
});

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
