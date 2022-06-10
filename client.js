var app = new Vue({
	el: '#app',
	data:
	{
        logPath: 'runcommand.log',
		logContents: '',
        logLastModified: 0
	},
	mounted ()
	{
        setInterval(() =>
        {
            this.getLogFile();
        }, 2000);
    },
    methods:
    {
        getLogFile: function()
        {
            axios.get(`getfilestats/${this.logPath}`).then(r =>
            {
                // Determine if the file has changed since last read
                if (r.data.stats.mtimeMs != this.logLastModified)
                {
                    // If so then fetch its contents
                    this.logLastModified = r.data.stats.mtimeMs;
                    axios.get(`getfilecontents/${this.logPath}`).then(r =>
                    {
                        this.logContents = r.data.contents
                    });
                }
            });
        }
    }
});