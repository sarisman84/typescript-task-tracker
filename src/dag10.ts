
// localStorage.setItem(
//     "name",
//     "Jane"
// );

// localStorage.setItem(
//     "city",
//     "Göteborg"
// );


// const name = localStorage.getItem("name");
// console.log(name);

// const city = localStorage.getItem("city");
// console.log(city);

// const age = localStorage.getItem("age");
// console.log(age);

// localStorage.removeItem("city");

// localStorage.clear();


const tasks = [
    "Träna",
    "Handla"
];

localStorage.setItem(
    "tasks", 
    String(tasks)
)

const runner = {
    name: "Bill",
    pace: "5:10"
};

// console.log(JSON.stringify(runner));

const json = JSON.stringify(runner);

localStorage.setItem(
    "runner",
    json
);


const runner2 = localStorage.getItem("runner");
console.log(runner2);

const runnerObject = JSON.parse(runner2!);   
console.log(runnerObject);
