const fs = require("fs");
fs.readFile("incident_report.csv", "utf8", async function (err, data) {
    const reportArray = [];
    const junkArray = [];
    const departmentObj = {};
    const sameDateObj = {};
    const injuryLocationObj = {};
    const genderObj = {};
    const incidentTypeObj = {};
    const ageGroupObj = {};
    const plantObj = {};
    const reportTypeObj = {};
    const lostDaysObj = {};
    const yearObj = {};
    const monthObj = {};
    const weekDayObj = {};
    const shiftObj = {};
    if (err) {
        console.log("There was a problem reading the file.");
    } else {
        let splitByCommaArray = data.split(",");
        let splitWithSpaceArray = data.split("\r\n");

        // reportArray set up
        for (let i = 0; i < splitWithSpaceArray.length; i++) {
            let row = splitWithSpaceArray[i];
            const rowSplitArray = row.split(",");
            let date = rowSplitArray[0]; // first element after spliting up the row into individual elements

            if (rowSplitArray.length === 15) {
                const obj = {
                    date: rowSplitArray[0],
                    injuryLocation: rowSplitArray[1],
                    gender: rowSplitArray[2],
                    ageGroup: rowSplitArray[3],
                    incidentType: rowSplitArray[4],
                    daysLost: Number(rowSplitArray[5]),
                    plant: rowSplitArray[6],
                    reportType: rowSplitArray[7],
                    shift: rowSplitArray[8],
                    department: rowSplitArray[9],
                    incidentCost: rowSplitArray[10].split("$")[1] + rowSplitArray[11].split(" ")[0],
                    weekday: rowSplitArray[12],
                    month: Number(rowSplitArray[13]),
                    year: Number(rowSplitArray[14]),
                    INSERT: "INSERT INTO incidents",
                    ATTRIBUTES:
                        "(date, injury_location, gender, age_group, incident_type, days_lost, plant, report_type, shift, department, incident_cost, weekday, month, year )",
                    VALUES: "VALUES",
                    NEWLINE: "\n",
                };
                // console.log(Number(obj.incidentCost) + 10);
                const dataString = `( '${obj.date}', '${obj.injuryLocation}', '${obj.gender}', '${obj.ageGroup}', '${obj.incidentType}', ${obj.daysLost}, '${obj.plant}', '${obj.reportType}', '${obj.shift}', '${obj.department}', ${Number(obj.incidentCost) + 0.01}, '${obj.weekday}', ${obj.month}, ${obj.year} );`;
                obj["DATA"] = dataString;
                // junkArray.push({ row: rowSplitArray, report: obj});
                reportArray.push(obj);
            } else {
                let replaceDollarSign = rowSplitArray[10].replace('$', '');
                console.log(replaceDollarSign);
                const obj = {
                    date: rowSplitArray[0],
                    injuryLocation: rowSplitArray[1],
                    gender: rowSplitArray[2],
                    ageGroup: rowSplitArray[3],
                    incidentType: rowSplitArray[4],
                    daysLost: Number(rowSplitArray[5]),
                    plant: rowSplitArray[6],
                    reportType: rowSplitArray[7],
                    shift: rowSplitArray[8],
                    department: rowSplitArray[9],
                    incidentCost: rowSplitArray[10].replace('$', ''),
                    weekday: rowSplitArray[11],
                    month: Number(rowSplitArray[12]),
                    year: Number(rowSplitArray[13]),
                    INSERT: "INSERT INTO incidents",
                    ATTRIBUTES:
                        "( date, injury_location, gender, age_group, incident_type, days_lost, plant, report_type, shift, department, incident_cost, weekday, month, year )",
                    VALUES: "VALUES",
                    NEWLINE: "\n",
                };
                const dataString = `( '${obj.date}', '${obj.injuryLocation}', '${obj.gender}', '${obj.ageGroup}', '${obj.incidentType}', ${obj.daysLost}, '${obj.plant}', '${obj.reportType}', '${obj.shift}', '${obj.department}', ${Number(obj.incidentCost) + 0.01}, '${obj.weekday}', ${obj.month}, ${obj.year} );`;
                obj["DATA"] = dataString;
                reportArray.push(obj);
            }
            // 'Date,Injury Location,Gender,Age Group,Incident Type,Days Lost,Plant,Report Type,Shift,Department,Incident Cost,WkDay,Month,Year',
        }

        // INSERTING EACH OBJECT INTO THE SQL FILE
        for (let i = 0; i < reportArray.length; i++) {
            let incident = reportArray[i];

            let INSERT_STRING = `${incident.INSERT}\n` + `${incident.ATTRIBUTES}\n` + `${incident.VALUES}\n` + `${incident.DATA}\n` + `\n`;
            await fs.appendFile("incident_data.sql", INSERT_STRING, () => console.log("INSERT", i)); // operation => add data to the SQL file
        }
    }
});

/**
 *
*   TODO's
*   []  [ Take this data and translate it to a SQL file ]
*   [x] Add a key called INSERT{string}
*   [x] Add a key called ATTRIBUTES{string}
*   [x] Add a key called VALUES{string}
*   [x] Add a key called DATA{string}
*   [x] For loop through [reportArray]
*   [x] Write each obj as QUERY to sql file
*   [x] Include NEWLINES
*   [x] Write this to a new SQL file [x]
* */