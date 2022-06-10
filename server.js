let express = require('express');
const fs = require('fs')

let PORT = process.env.PORT || '5001';

let app = express();

// Serve up public static files
app.use(express.static('./'));

let fileList = ['/dev/shm/runcommand.log'];
//let fileList = ['runcommand.log'];

app.get('/getfilecontents/:id', async (req, res) =>
{
    fs.access(fileList[req.params.id], fs.constants.F_OK | fs.constants.R_OK, (err) =>
    {
        if (err)
        {
          console.error(err);

          res.status(500);
          return;
        }
        
        fs.readFile(fileList[req.params.id], 'utf8', (err, data) =>
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

app.get('/getfilestats/:id', async (req, res) =>
{
    fs.access(fileList[req.params.id], fs.constants.F_OK | fs.constants.R_OK, (err) =>
    {
        if (err)
        {
            console.error(err);

            res.status(500);
            return;
        }

        fs.stat(fileList[req.params.id], (err, stats) =>
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
