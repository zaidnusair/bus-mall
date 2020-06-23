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
var allClicks = [];
// allClicks = JSON.parse(localStorage.getItem("storedClicks")) || 0; //used to be inside the function
console.log(allClicks);
var views = []; //used to be inside the function

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
  retrieve();

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
  // console.log((allProducts[leftIndex].timesShown += 1));
  allProducts[middleIndex].timesShown += 1;
  allProducts[rightIndex].timesShown += 1;

  localStorage.setItem(
    allProducts[leftIndex].name,
    JSON.stringify([
      allProducts[leftIndex].numberOfClicks,
      allProducts[leftIndex].timesShown,
    ])
  );
  localStorage.setItem(
    allProducts[middleIndex].name,
    JSON.stringify([
      allProducts[middleIndex].numberOfClicks,
      allProducts[middleIndex].timesShown,
    ])
  );
  localStorage.setItem(
    allProducts[rightIndex].name,
    JSON.stringify([
      allProducts[rightIndex].numberOfClicks,
      allProducts[rightIndex].timesShown,
    ])
  );
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
      localStorage.setItem(
        currentLeftImg.name,
        JSON.stringify([
          currentLeftImg.numberOfClicks,
          currentLeftImg.timesShown,
        ])
      );
      displayRandomImgs();

      console.log(currentLeftImg);
    }
    if (clickedElementId === "middle_img") {
      currentMiddleImg.numberOfClicks += 1;
      totalClicks++;
      localStorage.setItem(
        currentMiddleImg.name,
        JSON.stringify([
          currentMiddleImg.numberOfClicks,
          currentMiddleImg.timesShown,
        ])
      );
      displayRandomImgs();
    }
    if (clickedElementId === "right_img") {
      currentRightImg.numberOfClicks += 1;
      totalClicks++;
      localStorage.setItem(
        currentRightImg.name,
        JSON.stringify([
          currentRightImg.numberOfClicks,
          currentRightImg.timesShown,
        ])
      );
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
    // console.log(allClicks);
    // localStorage.setItem("storedClicks", JSON.stringify(allClicks));

    productsSection.removeEventListener("click", handleProductClick);
  }
}

//charts

function drawResultsCharts() {
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

function retrieve() {
  for (var i = 0; i < localStorage.length; i++) {
    var productKey = localStorage.key(i);
    var productValue = localStorage.getItem(productKey);
    console.log(productValue);

    for (var j = 0; j < allProducts.length; j++) {
      if (productKey == allProducts[i].name) {
        allProducts[j].numberOfClicks += parseInt(productValue[0]);
        allProducts[j].timesShown += parseInt(productValue[2]);
        break;
      }
    }
    // console.log(productValue[1]);
  }
}
//storing data
// localStorage.setItem("storedProducts", JSON.stringify(allProducts));

// localStorage.setItem("storedviews", allProducts.timesShown);
//retrieving data

// var retrieveProducts = localStorage.getItem("storedProducts");

// var retrieveViews = localStorage.getItem("storedViews");
// // obj = JSON.parse(retrieveProducts)
// console.log("retrieveProducts", JSON.parse(retrieveProducts));
// console.log("retrieveClicks", JSON.parse(retrieveClicks));
// console.log("retrieveViews", JSON.parse(retrieveViews));
