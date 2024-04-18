// Define an array to store user-inputted data points
var userInputDataPoints = [];

// Function to switch to function graph mode
function Functionbutton() {
    // Array of IDs to remove from display
    var IDToRemove = ["Header", "IntroText", "FunctionText", "ScatterText", "ScatterButton", "FunctionButton"];
    // Array of IDs to show on display
    var IDToShow = ["mainMenuButton", "functionCanvas", "inputFunction", "inputfunctionButton"];
    // Hide elements with IDs in IDToRemove array and show elements with IDs in IDToShow array
    for (var i of IDToRemove) {
        var textElement = document.getElementById(i);
        textElement.style.display = 'none';
    }
    for (var i of IDToShow) {
        var textElement = document.getElementById(i);
        textElement.style.display = 'block';
    }
}

// Function to switch to scatter graph mode
function Scatterbutton() {
    // Array of IDs to remove from display
    var IDToRemove = ["Header", "IntroText", "FunctionText", "ScatterText", "ScatterButton", "FunctionButton"];
    // Array of IDs to show on display
    var IDToShow = ["scatterCanvas", "mainMenuButton", "Y_max", "X_max", "inputX", "inputY", "inputButton", "exportButton", "jsoninput", "submitjson"];
    // Hide elements with IDs in IDToRemove array and show elements with IDs in IDToShow array
    for (var i of IDToRemove) {
        var textElement = document.getElementById(i);
        textElement.style.display = 'none';
    }
    for (var i of IDToShow) {
        var textElement = document.getElementById(i);
        textElement.style.display = 'block';
    }
    // If user-inputted data points exist, draw scatter graph
    if (userInputDataPoints != "") {
        drawScatterGraph(userInputDataPoints);
    }
}

// Function to return to main menu
function mainMenuButton() {
    // Array of IDs to remove from display
    var IDToRemove = ["scatterCanvas", "mainMenuButton", "Y_max", "X_max", "inputX", "inputY", "inputButton", "functionCanvas", "inputFunction", "inputfunctionButton", "exportButton", "jsoninput", "submitjson"];
    // Array of IDs to show on display
    var IDToShow = ["Header", "IntroText", "FunctionText", "ScatterText", "ScatterButton", "FunctionButton"];
    // Hide elements with IDs in IDToRemove array and show elements with IDs in IDToShow array
    for (var i of IDToRemove) {
        var textElement = document.getElementById(i);
        textElement.style.display = 'none';
    }
    for (var i of IDToShow) {
        var textElement = document.getElementById(i);
        textElement.style.display = 'block';
    }
}

// Function to draw scatter graph
function drawScatterGraph(dataPoints) {
    var canvas = document.getElementById("scatterCanvas");
    var ctx = canvas.getContext("2d");

    // Array to store data points as a percentage of maximum X and Y coordinates
    percentdataPoints = [];

    ctx.fillStyle = "black";
    var pointSize = 5;
    var largestx = 0;
    var largesty = 0;
    // Calculate largest X and Y coordinates
    for (var i = 0; i < dataPoints.length; i++) {
        var point = dataPoints[i];
        if (point.x >= largestx) {
            largestx = point.x;
        }
        if (point.y >= largesty) {
            largesty = point.y;
        }
    }

    // Convert data points to percentage of maximum X and Y coordinates
    for (var i = 0; i < dataPoints.length; i++) {
        percentdataPoints[i] = Object.assign({}, dataPoints[i]);
        var point = percentdataPoints[i];
        var pointpercent = 0;
        pointpercent = point.x / largestx;
        point.x = pointpercent * 795;
        pointpercent = point.y / largesty;
        point.y = pointpercent * 395;
        point.y = 400 - point.y;
    }

    // Clear canvas and draw data points
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < dataPoints.length; i++) {
        var point = percentdataPoints[i];
        ctx.beginPath();
        ctx.arc(point.x, point.y, pointSize, 0, 2 * Math.PI);
        ctx.fill();
    }
    // Display maximum X and Y coordinates
    var axislabel = document.getElementById("X_max");
    axislabel.innerHTML = largestx;
    var axislabel = document.getElementById("Y_max");
    axislabel.innerHTML = largesty;

    // Calculate linear regression
    var xsum = 0, ysum = 0;
    for (var i = 0; i < dataPoints.length; i++) {
        var point = percentdataPoints[i];
        xsum += point.x;
        ysum += point.y;
    }
    var numerator = 0, denominator = 0;
    var meanX = 0, meanY = 0;
    meanX = xsum / dataPoints.length;
    meanY = ysum / dataPoints.length;

    for (var i = 0; i < dataPoints.length; i++) {
        var point = percentdataPoints[i];
        numerator += ((point.x) - meanX) * (point.y - meanY);
        denominator += (point.x - meanX) ** 2;
    }
    const slope = numerator / denominator;
    const intercept = meanY - slope * meanX;

    // Draw regression line
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.moveTo(0, intercept);
    ctx.lineTo(canvas.width, canvas.width * slope + intercept);
    ctx.stroke();

    // Draw X and Y axes
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 700);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 400);
    ctx.lineTo(800, 400);
    ctx.stroke();
}

// Function to add data point to scatter graph
function addDataPoint() {
    var inputX = document.getElementById("inputX").value;
    var inputY = document.getElementById("inputY").value;

    if (inputX !== "" && inputY !== "") {
        var newDataPoint = { x: parseFloat(inputX), y: parseFloat(inputY) };
        userInputDataPoints.push(newDataPoint);

        document.getElementById("inputX").value = "";
        document.getElementById("inputY").value = "";

        drawScatterGraph(userInputDataPoints);
    } else {
        alert("Please enter valid X and Y coordinates");
    }
}

// Function to add function to function graph
function addFunc() {
    var inputFunc = document.getElementById("inputFunction").value;

    if (inputFunc != "") {
        drawFunctionGraph(inputFunc);
    }
    else {
        alert("Please enter valid function");
    }
}

// Function to draw function graph
function drawFunctionGraph(UserFunction) {
    var canvas = document.getElementById("functionCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "blue";

    const parsedFunction = new Function('x', 'return ' + UserFunction);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.beginPath();

    for (let x = 0; x <= canvas.width; x++) {
        const y = parsedFunction(x - canvas.width / 2);
        if (x == 0) {
            ctx.moveTo(x, -y + canvas.height / 2);
        } else {
            ctx.lineTo(x, -y + canvas.height / 2);
        }
    }

    ctx.stroke();

    // Draw X and Y axes
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
}

// Function to export data points as JSON file
function exportdatapoints() {
    if (userInputDataPoints.length === 0) {
        alert("no data points");
        return;
    }
    const jsonDataPoints = JSON.stringify(userInputDataPoints);

    const blob = new Blob([jsonDataPoints], { type: 'application/json' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data_points.json';

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
}

// Function to add data points from JSON file
function inputJson() {
    const fileInput = document.getElementById('jsoninput');
    const file = fileInput.files[0];

    if (!file) {
        console.error('No file selected.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const jsonData = event.target.result;
        const dataPoints = JSON.parse(jsonData);
        userInputDataPoints = dataPoints;
        drawScatterGraph(userInputDataPoints);
    };

    reader.readAsText(file);
}
