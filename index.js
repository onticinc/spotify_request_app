const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
//const layouts = require('express-ejs-layouts');
//app.use(layouts);


app.set('view engine', 'ejs'); // VIEW ENGINE EJS IN ORDER TO USE HTML TEMPLATES


app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');

});

app.get('/dates', (req, res) => {
    let dateArray = []; // set up empty array
    fs.readFile('incident_report.csv', 'utf8', function (err, data) {
        if (err) {
            console.log("There was a problem reading the file.");
        } else {
            let splitByCommaArray = data.split(',');
            let splitWithSpaceArray = data.split('\r\n');

            for (let i = 0; i < splitWithSpaceArray.length; i++) {
                let row = splitWithSpaceArray[i];
                const rowSplitArray = row.split(',');
                // 'Date,Injury Location,Gender,Age Group,Incident Type,Days Lost,Plant,Report Type,Shift,Department,Incident Cost,WkDay,Month,Year',

                // **** [solution]: Date
                let date = rowSplitArray[0];
                dateArray.push(date); // put each date inside array => next: return res.json() with the dateArray
            }
            // [here] => where I would return res.json with the dateArray now the loop is finished
            res.json({ dates: dateArray });
        }
    });
});

app.get('/templates/absurd', (req, res) => {
    res.sendFile(__dirname + '/views/templates/absurd.html');
});

app.get('/templates/admin', (req, res) => {
    res.sendFile(__dirname + '/views/templates/admin.html');
});

app.get('/templates/aside', (req, res) => {
    res.sendFile(__dirname + '/views/templates/aside.html');
});
app.get('/templates/band', (req, res) => {
    res.sendFile(__dirname + '/views/templates/band.html');
});
app.get('/templates/blog', (req, res) => {
    res.sendFile(__dirname + '/views/templates/blog.html');
});
app.get('/templates/cards', (req, res) => {
    res.sendFile(__dirname + '/views/templates/cards.html');
});

app.get('/templates/cards', (req, res) => {
    res.sendFile(__dirname + '/views/templates/cards.html');
});

// bb song data
app.get('/bb', (req, res) => {
    let bbArray = [];
    fs.readFile('bb-song-data.csv', 'utf8', (err, data) => {
        if (err) {
            console.log("There was a problem reading the file.");
        } else {
            let splitByCommaArray = data.split(',');
            let splitWithSpaceArray = data.split('\r\n');

            for (let i = 0; i < splitWithSpaceArray.length; i++) {
                let row = splitWithSpaceArray[i];
                const rowSplitArray = row.split(',');

                if (rowSplitArray.length === 4) {
                    const obj = {
                        artist: rowSplitArray[0],
                        song: rowSplitArray[1],
                        genre: rowSplitArray[2],
                        year: rowSplitArray[3],
                    }
                    bbArray.push(obj);
                } else {
                    const obj = {
                        artist: rowSplitArray[0],
                        song: rowSplitArray[1],
                        genre: rowSplitArray[2],
                        year: rowSplitArray[3],
                    }
                    let song = bbArray;
                    bbArray.push(obj);
                }
            }
        }
        // [here] => where I would return res.render with the dateArray now the loop is finished
        res.render('song', { bbArray });
    });
});

// Departments  x
app.get('/departments', (req, res) => {
    fs.readFile('incident_report.csv', 'utf8', (err, data) => {
        const reportArray = [];
        const junkArray = [];
        const departmentObj = {};
        if (err) {
            console.log("There was a problem reading the file.");
        } else {
            let splitByCommaArray = data.split(',');
            let splitWithSpaceArray = data.split('\r\n');

            // reportArray set up
            for (let i = 0; i < splitWithSpaceArray.length; i++) {
                let row = splitWithSpaceArray[i];
                const rowSplitArray = row.split(',');
                let date = rowSplitArray[0]; // first element after spliting up the row into individual elements

                if (rowSplitArray.length === 15) {
                    const obj = {
                        date: rowSplitArray[0],
                        injuryLocation: rowSplitArray[1],
                        gender: rowSplitArray[2],
                        ageGroup: rowSplitArray[3],
                        incidentType: rowSplitArray[4],
                        daysLost: rowSplitArray[5],
                        plant: rowSplitArray[6],
                        reportType: rowSplitArray[7],
                        shift: rowSplitArray[8],
                        department: rowSplitArray[9],
                        incidentCost: rowSplitArray[10].split('$')[1] + rowSplitArray[11].split(' ')[0],
                        weekday: rowSplitArray[12],
                        month: rowSplitArray[13],
                        year: rowSplitArray[14],
                    }
                    junkArray.push({ row: rowSplitArray, report: obj });
                    reportArray.push(obj);
                } else {
                    const obj = {
                        date: rowSplitArray[0],
                        injuryLocation: rowSplitArray[1],
                        gender: rowSplitArray[2],
                        ageGroup: rowSplitArray[3],
                        incidentType: rowSplitArray[4],
                        daysLost: rowSplitArray[5],
                        plant: rowSplitArray[6],
                        reportType: rowSplitArray[7],
                        shift: rowSplitArray[8],
                        department: rowSplitArray[9],
                        incidentCost: rowSplitArray[10],
                        weekday: rowSplitArray[11],
                        month: rowSplitArray[12],
                        year: rowSplitArray[13],
                    }
                    reportArray.push(obj);
                }
            }
            // departmentObj set up
            for (let i = 0; i < reportArray.length; i++) {
                let incident = reportArray[i];
                if (departmentObj[incident.department] === undefined) {
                    departmentObj[incident.department] = [incident];
                } else {
                    departmentObj[incident.department].push(incident);
                }
            }
        }
        // [here] => where I would return res.render with the dateArray now the loop is finished
        res.render('departments', { departmentObj });
    });
});


// Plants x
app.get('/plants', (req, res) => {
    fs.readFile('incident_report.csv', 'utf8', function (err, data) {
        const reportArray = [];
        const plantObj = {};
        if (err) {
            console.log("There was a problem reading the file.");
        } else {
            let splitByCommaArray = data.split(',');
            let splitWithSpaceArray = data.split('\r\n');

            // reportArray set up
            for (let i = 0; i < splitWithSpaceArray.length; i++) {
                let row = splitWithSpaceArray[i];
                const rowSplitArray = row.split(',');
                let date = rowSplitArray[0]; // first element after spliting up the row into individual elements

                if (rowSplitArray.length === 15) {
                    const obj = {
                        date: rowSplitArray[0],
                        injuryLocation: rowSplitArray[1],
                        gender: rowSplitArray[2],
                        ageGroup: rowSplitArray[3],
                        incidentType: rowSplitArray[4],
                        daysLost: rowSplitArray[5],
                        plant: rowSplitArray[6],
                        reportType: rowSplitArray[7],
                        shift: rowSplitArray[8],
                        department: rowSplitArray[9],
                        incidentCost: rowSplitArray[10].split('$')[1] + rowSplitArray[11].split(' ')[0],
                        weekday: rowSplitArray[12],
                        month: rowSplitArray[13],
                        year: rowSplitArray[14],
                    }
                    reportArray.push(obj);
                } else {
                    const obj = {
                        date: rowSplitArray[0],
                        injuryLocation: rowSplitArray[1],
                        gender: rowSplitArray[2],
                        ageGroup: rowSplitArray[3],
                        incidentType: rowSplitArray[4],
                        daysLost: rowSplitArray[5],
                        plant: rowSplitArray[6],
                        reportType: rowSplitArray[7],
                        shift: rowSplitArray[8],
                        department: rowSplitArray[9],
                        incidentCost: rowSplitArray[10],
                        weekday: rowSplitArray[11],
                        month: rowSplitArray[12],
                        year: rowSplitArray[13],
                    }
                    reportArray.push(obj);
                }
                // 'Date,Injury Location,Gender,Age Group,Incident Type,Days Lost,Plant,Report Type,Shift,Department,Incident Cost,WkDay,Month,Year',

            }

            // plantObj set up
            for (let i = 0; i < reportArray.length; i++) {
                let incident = reportArray[i];

                if (plantObj[incident.plant] === undefined) {
                    plantObj[incident.plant] = [incident];
                } else {
                    plantObj[incident.plant].push(incident);
                }
            }
            console.log('Location data', plantObj);
            // console.log('List of locations of incidents', Object.keys(plantObj));
            // console.log('Number of incidents in Georgia', plantObj.Georgia.length);
            // console.log('Incident(s) that happen to Georgia', plantObj.Georgia);
        }
        // [here] => where I would return res.render with the dateArray now the loop is finished
        res.render('plants', { plantObj });
    });
});


// Shifts
app.get('/shifts', (req, res) => {  // create route function
    fs.readFile('incident_report.csv', 'utf8', (err, data) => { // Tell route to get data from file. 
        const reportArray = []; // Empty report array. 
        const shiftObj = {}; // empty shift object. 
        if (err) { // if error say there is a problem. 
            console.log("There was a problem reading the file.");
        } else {
            let splitByCommaArray = data.split(',');
            let splitWithSpaceArray = data.split('\r\n');

            // reportArray set up
            for (let i = 0; i < splitWithSpaceArray.length; i++) {
                let row = splitWithSpaceArray[i];
                const rowSplitArray = row.split(',');
                let date = rowSplitArray[0]; // first element after spliting up the row into individual elements

                if (rowSplitArray.length === 15) {
                    const obj = {
                        date: rowSplitArray[0],
                        injuryLocation: rowSplitArray[1],
                        gender: rowSplitArray[2],
                        ageGroup: rowSplitArray[3],
                        incidentType: rowSplitArray[4],
                        daysLost: rowSplitArray[5],
                        plant: rowSplitArray[6],
                        reportType: rowSplitArray[7],
                        shift: rowSplitArray[8],
                        department: rowSplitArray[9],
                        incidentCost: rowSplitArray[10].split('$')[1] + rowSplitArray[11].split(' ')[0],
                        weekday: rowSplitArray[12],
                        month: rowSplitArray[13],
                        year: rowSplitArray[14],
                    }

                    reportArray.push(obj);
                } else {
                    const obj = {
                        date: rowSplitArray[0],
                        injuryLocation: rowSplitArray[1],
                        gender: rowSplitArray[2],
                        ageGroup: rowSplitArray[3],
                        incidentType: rowSplitArray[4],
                        daysLost: rowSplitArray[5],
                        plant: rowSplitArray[6],
                        reportType: rowSplitArray[7],
                        shift: rowSplitArray[8],
                        department: rowSplitArray[9],
                        incidentCost: rowSplitArray[10],
                        weekday: rowSplitArray[11],
                        month: rowSplitArray[12],
                        year: rowSplitArray[13],
                    }
                    reportArray.push(obj);
                }
            }

            // shift Obj set up
            for (let i = 0; i < reportArray.length; i++) {
                let incident = reportArray[i];

                if (shiftObj[incident.shift] === undefined) {
                    shiftObj[incident.shift] = [incident];
                } else {
                    shiftObj[incident.shift].push(incident);
                }
            }
            // console.log('Location data', shiftObj);
            // console.log('List of locations of incidents', Object.keys(shiftObj));
            // console.log('Number of incidents in Georgia', shiftObj.Georgia.length);
            // console.log('Incident(s) that happen to Georgia', shiftObj.Georgia);
        }
        // [here] => where I would return res.render with the dateArray now the loop is finished
        res.render('shifts', { shiftObj });
    });
});


// Lost Days
app.get('/lost-days', (req, res) => {
    fs.readFile('incident_report.csv', 'utf8', (err, data) => {
        const reportArray = [];
        const junkArray = [];
        const shiftObj = {};
        if (err) {
            console.log("There was a problem reading the file.");
        } else {
            let splitByCommaArray = data.split(',');
            let splitWithSpaceArray = data.split('\r\n');

            // reportArray set up
            for (let i = 0; i < splitWithSpaceArray.length; i++) {
                let row = splitWithSpaceArray[i];
                const rowSplitArray = row.split(',');
                let date = rowSplitArray[0]; // first element after spliting up the row into individual elements

                if (rowSplitArray.length === 15) {
                    const obj = {
                        date: rowSplitArray[0],
                        injuryLocation: rowSplitArray[1],
                        gender: rowSplitArray[2],
                        ageGroup: rowSplitArray[3],
                        incidentType: rowSplitArray[4],
                        daysLost: rowSplitArray[5],
                        plant: rowSplitArray[6],
                        reportType: rowSplitArray[7],
                        shift: rowSplitArray[8],
                        department: rowSplitArray[9],
                        incidentCost: rowSplitArray[10].split('$')[1] + rowSplitArray[11].split(' ')[0],
                        weekday: rowSplitArray[12],
                        month: rowSplitArray[13],
                        year: rowSplitArray[14],
                    }
                    junkArray.push({ row: rowSplitArray, report: obj });
                    reportArray.push(obj);
                } else {
                    const obj = {
                        date: rowSplitArray[0],
                        injuryLocation: rowSplitArray[1],
                        gender: rowSplitArray[2],
                        ageGroup: rowSplitArray[3],
                        incidentType: rowSplitArray[4],
                        daysLost: rowSplitArray[5],
                        plant: rowSplitArray[6],
                        reportType: rowSplitArray[7],
                        shift: rowSplitArray[8],
                        department: rowSplitArray[9],
                        incidentCost: rowSplitArray[10],
                        weekday: rowSplitArray[11],
                        month: rowSplitArray[12],
                        year: rowSplitArray[13],
                    }
                    reportArray.push(obj);
                }
                // // 'Date,Injury Location,Gender,Age Group,Incident Type,Days Lost,Plant,Report Type,Shift,Department,Incident Cost,WkDay,Month,Year',

            }

            // shift Obj set up
            for (let i = 0; i < reportArray.length; i++) {
                let incident = reportArray[i];

                /**
                 * 
                 * {
                        date: '28-Jun-22',
                        injuryLocation: 'Hands',
                        gender: 'Male',
                        ageGroup: '18-24',
                        incidentType: 'Vehicle',
                        daysLost: '0',
                        plant: 'Texas',
                        reportType: 'Medical Claim',
                        shift: 'Afternoon',
                        department: 'Melting',
                        incidentCost: '706',
                        weekday: 'Tue',
                        month: '6',
                        year: '2022'
                    }
                 * */

                if (shiftObj[incident.shift] === undefined) {
                    shiftObj[incident.shift] = [incident];
                } else {
                    shiftObj[incident.shift].push(incident);
                }
            }
            console.log('Location data', plantObj);
            console.log('List of locations of incidents', Object.keys(shiftObj));
            console.log('Number of incidents in Georgia', shiftObj.Georgia.length);
            console.log('Incident(s) that happen to Georgia', shiftObj.Georgia);
        }
        // [here] => where I would return res.render with the dateArray now the loop is finished
        res.render('shift', { shiftObj });
    });
});




app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

module.exports = app;

/*
   *'Date,
   Injury Location,
   Gender,
   Age Group,
   Incident Type,
   Days Lost,
   Plant,
   Report Type,
   Shift,
   Department,
   Incident Cost,
   WkDay,
   Month,
   Year'
*/