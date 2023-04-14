const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mean', (req, res) => {

    const { nums } = req.query;
    let numlist = nums.split`,`
    totes = 0
    for (i in numlist) {
        totes += (parseInt(numlist[i]))
    }
    let mean = totes / numlist.length

    return res.send(`list of nums are: ${nums} and the AVG is ${mean}`)
})

app.get('/median', (req, res) => {
    const { nums } = req.query;
    let numlist = nums.split`,`
    totes = []
    for (i in numlist) {
        totes.push(parseInt(numlist[i]))
    }

    function median(totes) {
        if (totes.length === 0) throw new Error("No inputs");

        totes.sort(function (a, b) {
            return a - b;
        });

        var half = Math.floor(totes.length / 2);

        if (totes.length % 2)
            return totes[half];

        return (totes[half - 1] + totes[half]) / 2.0;
    }


    let med = median(totes)
    return res.send(`list of nums are: ${nums} and the Median number is ${med}`)
})

app.get('/mode', (req, res) => {
    const { nums } = req.query;
    let numlist = nums.split`,`
    let numl = []
    for (i in numlist) {
        numl.push(parseInt(numlist[i]))
    }

    let mx = 0;
    let vlues = [];
    var Mode = function (data) {
        var counts = {};
        for (let i = 0; i < data.length; i++) {
            counts[data[i]] = (counts[data[i]] || 0) + 1
        }
        var max = 0;
        var values = [];
        for (var key in counts) {
            if (counts.hasOwnProperty(key)) {
                if (counts[key] > max) {
                    max = counts[key];
                    values = [key];
                } else if (counts[key] === max) {
                    max = counts[key];
                    values.push(key);
                }
            }
        }
        mx = max
        vlues = values
        return "The highest value is " + values.join(", ") + " with a count of " + max;
    }
    console.log(Mode(numl));
    return res.send(`list of nums are: ${nums} and the Mode number is ${vlues} with a count of ${mx}`)
})

app.listen(3000, function () {
    console.log('Server started on port 3000.');
});