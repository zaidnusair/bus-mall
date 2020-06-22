"use strict";

var allProducts = [];
var totalClicks = 0;
var productsSection = document.getElementById("all_products");
var currentLeftImg;
var currentMiddleImg;
var currentRightImg;
var rounds = 25;

var previousLeftIndex;
var previousMiddleIndex;
var previousRightIndex;

var leftImg = document.getElementById("left_img");
var middleImg = document.getElementById("middle_img");
var rightImg = document.getElementById("right_img");

var productsNames = [];

function ProductPicture(name, url) {
  this.name = name;
  this.url = url;
  this.numberOfClicks = 0;
  this.timesShown = 0;
  allProducts.push(this);
  productsNames.push(this.name);
}

new ProductPicture("bag", "img/bag.jpg");
new ProductPicture("banana", "img/banana.jpg");
new ProductPicture("bathroom", "img/bathroom.jpg");
new ProductPicture("boots", "img/boots.jpg");
new ProductPicture("breakfast", "img/breakfast.jpg");
new ProductPicture("bubblegum", "img/bubblegum.jpg");
new ProductPicture("chair", "img/chair.jpg");
new ProductPicture("cthulhu", "img/cthulhu.jpg");
new ProductPicture("dog-duck", "img/dog-duck.jpg");
new ProductPicture("dragon", "img/dragon.jpg");
new ProductPicture("pen", "img/pen.jpg");
new ProductPicture("pet-sweep", "img/pet-sweep.jpg");
new ProductPicture("scissors", "img/scissors.jpg");
new ProductPicture("shark", "img/shark.jpg");
new ProductPicture("sweep", "img/sweep.png");
new ProductPicture("tauntaun", "img/tauntaun.jpg");
new ProductPicture("unicorn", "img/unicorn.jpg");
new ProductPicture("usb", "img/usb.gif");
new ProductPicture("water-can", "img/water-can.jpg");
new ProductPicture("wine-glass", "img/wine-glass.jpg");

console.log(allProducts);

function displayRandomImgs() {
  var forbiddenIndex = [];
  if (totalClicks > 0) {
    forbiddenIndex = [
      previousLeftIndex,
      previousMiddleIndex,
      previousRightIndex,
    ];
  }

  var leftIndex = generateRandomNumber(forbiddenIndex);
  forbiddenIndex.push(leftIndex);

  var middleIndex = generateRandomNumber(forbiddenIndex);
  forbiddenIndex.push(middleIndex);

  var rightIndex = generateRandomNumber(forbiddenIndex);

  previousLeftIndex = leftIndex;
  previousMiddleIndex = middleIndex;
  previousRightIndex = rightIndex;

  currentLeftImg = allProducts[leftIndex];
  currentMiddleImg = allProducts[middleIndex];
  currentRightImg = allProducts[rightIndex];

  leftImg.setAttribute("src", currentLeftImg.url);
  middleImg.setAttribute("src", currentMiddleImg.url);
  rightImg.setAttribute("src", currentRightImg.url);

  allProducts[leftIndex].timesShown += 1;
  allProducts[middleIndex].timesShown += 1;
  allProducts[rightIndex].timesShown += 1;
}

function generateRandomNumber(forbiddenIndex) {
  var allowed;
  var randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * allProducts.length);
    allowed = true;
    for (var i = 0; i < forbiddenIndex.length; i++) {
      if (forbiddenIndex[i] === randomNumber) {
        allowed = false;
      }
    }
  } while (!allowed);

  return randomNumber;
}

displayRandomImgs();

productsSection.addEventListener("click", handleProductClick);

function handleProductClick(event) {
  if (totalClicks < rounds) {
    var clickedElement = event.target;
    var clickedElementId = clickedElement.id;

    if (clickedElementId === "left_img") {
      currentLeftImg.numberOfClicks += 1;
      totalClicks++;
      displayRandomImgs();
    }
    if (clickedElementId === "middle_img") {
      currentMiddleImg.numberOfClicks += 1;
      totalClicks++;
      displayRandomImgs();
    }
    if (clickedElementId === "right_img") {
      currentRightImg.numberOfClicks += 1;
      totalClicks++;
      displayRandomImgs();
    }
    console.log(allProducts);
  } else {
    var resultsList = document.getElementById("results");

    for (var i = 0; i < allProducts.length; i++) {
      var listItem = document.createElement("li");
      listItem.textContent =
        allProducts[i].name +
        " had " +
        allProducts[i].numberOfClicks +
        " votes, and was shown " +
        allProducts[i].timesShown +
        " times.";
      resultsList.appendChild(listItem);
    }

    drawResultsCharts();

    productsSection.removeEventListener("click", handleProductClick);
  }
}

//charts

function drawResultsCharts() {
  var allClicks = [];
  var views = [];

  for (var i = 0; i < allProducts.length; i++) {
    allClicks.push(allProducts[i].numberOfClicks);
    views.push(allProducts[i].timesShown);
  }

  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: productsNames,
      datasets: [
        {
          label: "Vote Results",
          data: allClicks,

          backgroundColor: "rgba(255, 99, 132, 0.2)",

          borderColor: "rgba(255, 99, 132, 1)",

          borderWidth: 1,
        },

        {
          label: "Times Shown",
          data: views,

          backgroundColor: "rgba(54, 162, 235, 0.2)",

          borderColor: "rgba(54, 162, 235, 1)",

          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              stepSize: 2,
              precision: 0,
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
