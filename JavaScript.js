﻿var userInputDataPoints = [];


function Functionbutton() {
    var IDToRemove = ["Header", "IntroText", "FunctionText", "ScatterText", "ScatterButton", "FunctionButton"];
    var IDToShow = ["mainMenuButton"];
    for (var i of IDToRemove) {
        var textElement = document.getElementById(i);
        textElement.style.display = 'none';
    }
    for (var i of IDToShow) {
        var textElement = document.getElementById(i);
        textElement.style.display = 'block';
    }
}

function Scatterbutton() {
    
    var IDToRemove = ["Header", "IntroText", "FunctionText", "ScatterText", "ScatterButton", "FunctionButton"];
    var IDToShow = ["scatterCanvas", "mainMenuButton", "Y_max", "X_max", "inputX","inputY","inputButton"];

    for (var i of IDToRemove) {
        var textElement = document.getElementById(i);
        textElement.style.display = 'none';
    }
    for (var i of IDToShow) {
        var textElement = document.getElementById(i);
        textElement.style.display = 'block';
    }

    
    drawScatterGraph();
}
function mainMenuButton() {
    console.log("test");
    var IDToRemove = ["scatterCanvas", "mainMenuButton" , "Y_max","X_max"];
    var IDToShow = ["Header", "IntroText", "FunctionText", "ScatterText", "ScatterButton", "FunctionButton"];
    ["scatterCanvas", "mainMenuButton"];
    for (var i of IDToRemove) {
        var textElement = document.getElementById(i);
        textElement.style.display = 'none';
    }
    for (var i of IDToShow) {
        var textElement = document.getElementById(i);
        textElement.style.display = 'block';
    }
}

function drawScatterGraph(dataPoints) {
    var canvas = document.getElementById("scatterCanvas");
    var ctx = canvas.getContext("2d");

    percentdataPoints = [];

    ctx.fillStyle = "blue"; 
    var pointSize = 5; 
    var largestx = 0;
    var largesty = 0;
    for (var i = 0; i < dataPoints.length; i++) {
        var point = dataPoints[i];
        if (point.x >= largestx) {
            largestx = point.x;
        }
        if (point.y >= largesty) {
            largesty = point.y;
        }
    }

    for (var i = 0; i < dataPoints.length; i++) {
        
        percentdataPoints[i] = dataPoints[i];
        var point = percentdataPoints[i];
        var pointpercent = 0;
        pointpercent = point.x / largestx;
        point.x = pointpercent * 795;
        
        pointpercent = point.y / largesty;
        point.y = pointpercent * 395;
        point.y = 400 - point.y;
    }

    console.log(largestx, largesty);

    for (var i = 0; i < dataPoints.length; i++) {
        var point = percentdataPoints[i];
        ctx.beginPath();
        ctx.arc(point.x, point.y, pointSize, 0, 2 * Math.PI);
        ctx.fill();
    }
    var axislabel = document.getElementById("X_max");
    axislabel.innerHTML = largestx;
    var axislabel = document.getElementById("Y_max");
    axislabel.innerHTML = largesty;


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