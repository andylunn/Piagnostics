var app = new Vue({
	el: '#app',
	data:
	{
		logContents: '',
        logLastModified: 0,
        joystickSnapshot: null
	},
	mounted ()
	{
        setInterval(() => { this.getLogFile(); }, 2000);
        setInterval(() => { this.getJoystickSnapshot(); }, 100);
    },
    methods:
    {
        getJoystickSnapshot: function()
        {
            axios.get(`getjoysticks`).then(r =>
            {
                this.joystickSnapshot = r.data.contents[0].Snapshot.data;
            });
        },
        getLogFile: function()
        {
            axios.get(`getfilestats/0`).then(r =>
            {
                if (r.data.status == 0)
                {
                    // Determine if the file has changed since last read
                    if (r.data.stats.mtimeMs != this.logLastModified)
                    {
                        // If so then fetch its contents
                        this.logLastModified = r.data.stats.mtimeMs;
                        axios.get(`getfilecontents/0`).then(r =>
                        {
                            this.logContents = r.data.contents
                        });
                    }
                }
            })
            .catch(e =>
            {

            });
        }
    }
});