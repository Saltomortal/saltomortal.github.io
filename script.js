let input = document.getElementById('user-input');
let desiredBox = document.getElementById('desired-box');

class Weight {
    constructor(lable, mass, quantity) {
        this.lable = lable;
        this.mass = mass;
        this.quantity = quantity;
    }
}

let slider = document.getElementById('range-input');
slider.oninput = function () {
    let sliderValue = this.value / 10;
    input.value = sliderValue;
    formFunction();
}

function formFunction() {
    makeDumbell(Math.round(((input.value - 1.2) / 2 - 0.23) * 100) / 100);
}

function makeDumbell(desiredWeight) {
    let xs = new Weight('x-small', 0.57, 1);
    let s = new Weight('small', 1.13, 2);
    let m = new Weight('medium', 1.25, 1);
    let l = new Weight('large', 2.5, 1);

    let space = document.createElement('div');
    space.classList.add('space');

    let lock = document.createElement('div');
    lock.classList.add('lock');
    let nut = document.createElement('div');
    nut.classList.add('lock');
    nut.classList.add('nut');


    console.clear();

    let dumbell = document.querySelector('.dumbell');
    dumbell.innerHTML = "";
    dumbell.append(space);

    console.log("Desired weight halved without bar and locks: " + desiredWeight)
    // Quantity is divided by 4 since we only need to determine one side of one dumbell.
    // let bar = new Weight('bar', 1.2, 1)
    // let lock = new Weight('lock', 0.23, 1);

    const listOfWeights = [l, m, s, xs];

    let newWeightListRight = [];
    let newWeightListLeft = [];
    let addedWeight = 0;
    // Start adding weights together to get the desired weight load, start with the heaviest.
    // If the large is too much, continue with medium, and so forth.
    for (let i = 0; i < listOfWeights.length; i++) {

        let weight = listOfWeights[i];

        let disc = document.createElement('div');
        disc.classList.add('weight');
        disc.classList.add(weight.lable);

        for (let j = 0; addedWeight + weight.mass <= desiredWeight && weight.quantity > 0; j++) {

            weight.quantity--;
            addedWeight += weight.mass;

            console.log("Add one " + weight.lable + ".");

            // Put weights in two arrays, one for either side
            newWeightListLeft.unshift(disc);
            newWeightListRight.push(disc);
        }
    }

    newWeightListLeft.unshift(nut, lock);
    newWeightListRight.push(lock, nut);

    for (let k = 0; k < newWeightListRight.length; k++) {
        dumbell.append(newWeightListRight[k].cloneNode(true));
        dumbell.insertBefore(newWeightListLeft[k].cloneNode(true), space);
    }

    let currentWeight = addedWeight * 2 + 1.2 + 0.46;

    console.log("Actual weight of your dumbell: " + currentWeight);
    console.log("The difference: " + Math.round((desiredWeight - addedWeight) * 100) / 100);

    applyChange();
}

function applyChange() {
    let rangeInput = document.getElementById('range-input').value / 10;
    input.value = rangeInput;
}

applyChange();







