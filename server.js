let express = require('express');
const fs = require('fs')
let HID = require('node-hid');
const { exec } = require("child_process");

var attachedDevs = [];
let devs = HID.devices();//.filter(d => d.usage == 5 && !(d.productId == 4639 && d.vendorId == 1102));

// console.log(devs);

// for (const d of devs)
// {
//     let newDev = new Object();
//     newDev.HID = new HID.HID(d.vendorId, d.productId);
//     newDev.HID.on('data', function(data)
//     {
//         newDev.Snapshot = data;
//     });

//     attachedDevs.push(newDev);
// }

// console.log(attachedDevs);

// exec("dir", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });

let PORT = process.env.PORT || '5001';

let app = express();

// Serve up public static files
app.use(express.static('./'));

//let fileList = ['/dev/shm/runcommand.log'];
let fileList = ['runcommand.log'];

app.get('/getjoysticks', async (req, res) =>
{
    res.json({ status: 0, contents: attachedDevs });
});

app.get('/getfilecontents/:id', async (req, res) =>
{
    fs.readFile(fileList[req.params.id], 'utf8', (err, data) =>
    {
        if (err)
        {
            if (err.code == 'ENOENT')
                res.json({ status: -1});    // File not found
            else
            {
                console.error(err);

                res.status(500);
            }

            return;
        }

        res.json({ status: 0, contents: data });
    });
});

app.get('/getfilestats/:id', async (req, res) =>
{
    fs.stat(fileList[req.params.id], (err, stats) =>
    {
        if (err)
        {
            if (err.code == 'ENOENT')
                res.json({ status: -1});    // File not found
            else
            {
                console.error(err);

                res.status(500);
            }

            return;
        }

        res.json({ status: 0, stats: stats });
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
