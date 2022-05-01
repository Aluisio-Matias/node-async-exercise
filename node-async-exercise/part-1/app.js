//Part 1: Number Facts

const BASE_URL = 'http://numbersapi.com';

// 1. Make a request to the Numbers API to get a fact about your favorite number. 
//Make sure you get back JSON by including the json query key

let favNum = 8;
async function favNumFact() {
    let res = await axios.get(`${BASE_URL}/${favNum}?json`)
    console.log(res.data.text)
}

// 2. Figure out how to get data on multiple numbers in a single request. 
//Make that request and when you get the data back, put all of the number facts on the page.

let favNums = [8, 22, 88];
async function favNumsFacts() {
    let res = await $.getJSON(`${BASE_URL}/${favNums}?json`)
    console.log(res);
    let data = "";
    for (let prop in res) {
        data += prop + ': ' + res[prop] + '; ';
        $('#favNumsFacts').html(data)
    };
};
favNumsFacts();


// 3. Use the API to get 4 facts on your favorite number. 
//Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

async function getFourFacts() {
    let facts = await Promise.all(
        Array.from({
                length: 4
            }, () =>
            $.getJSON(`${BASE_URL}/${favNum}?json`))
    );
    facts.forEach(data => {
        $('#fourFacts').append(`<li>${data.text}</li>`);
    });
};
getFourFacts();