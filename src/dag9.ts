// type Run = {
//     distance: number;
//     pace: string;
//     location: string;
// }

// const run: Run = {
//     distance: 12.4,
//     pace: "5:12",
//     location: "Malmö"
// }

// destructuring på objekt

// const {
//     distance,
//     pace,
//     location: city
// } = run;

// console.log(distance);
// console.log(pace);
// console.log(city);

// destructuring på array

// const runners = [
//     "Anna",
//     "Peter",
//     "Johan"
// ];

// console.log(runners[0]);
// console.log(runners[1]);

// const [first, second, third] = runners;


// console.log(first);
// console.log(second);
// console.log(third);

// const [, second, third] = runners;

// console.log(second);
// console.log(third);


// Spread med arrayer

// const easyRuns = [
//     "Monday",
//     "Wednesday"
// ];

// const workouts = [
//     "Tuesday",
//     "Thursday",
// ];


// const week = [
//     easyRuns,
//     workouts
// ];

// console.log(week);

// const week = [
//     ...easyRuns,
//     "Friday",
//     ...workouts
// ]

// console.log(week);


// const numbers = [
//     1,
//     2,
//     3
// ];

// const copy = numbers;

// const copy = [
//     ...numbers
// ];

// copy.push(4);

// console.log(copy);
// console.log(numbers);


// Spread på objekt

// const runner = {
//     name: "Peter",
//     age: 52
// };

// const copy = {
//     ...runner
// };

// const runner2 = {
//     ...runner,
//     club: "Örebro AIK"
// }

// console.log(runner2);

// const runner = {
//     name: "Robert",
//     pace: "5:30"
// };

// const fasterRunner = {
//     ...runner,
//     pace: "4:50"
// }

// console.log(fasterRunner);



type Run = {
    name: string;
    distance: number;
    pace: string;
    location: string;
}

const run: Run = {
    name: "Peter",
    distance: 15,
    pace: "5:05",
    location: "Stockholm"
}

const updateRun = {
    ...run,
    pace: "4:55"
}


function printRunner(
    { distance, pace }: Run
): void {
    console.log(distance);
    console.log(pace)
}


printRunner(updateRun);