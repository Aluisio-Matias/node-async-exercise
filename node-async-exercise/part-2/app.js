// Part 2: Deck of Cards

const BASE_URL = 'http://deckofcardsapi.com/api/deck'

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
// Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

async function singleCard() {
    let data = await $.getJSON(`${BASE_URL}/new/draw/`)
    let {
        suit,
        value
    } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
}
singleCard()


// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
// Once you have the card, make a request to the same API to get one more card from the same deck.

async function getCard() {
    let firstCard = await $.getJSON(`${BASE_URL}/new/draw/`);
    let deckID = firstCard.deck_id;
    let secondCard = await $.getJSON(`${BASE_URL}/${deckID}/draw/`);
    [firstCard, secondCard].forEach(draw => {
        let {
            suit,
            value
        } = draw.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
}
getCard()


// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, 
// go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. 
// Every time you click the button, display a new card, until there are no cards left in the deck.

async function requestCards() {
    let $btn = $('button');
    let $cardSection = $('#card-section');

    let deckData = await $.getJSON(`${BASE_URL}/new/shuffle/`);
    $btn.show().on('click', async function() {
        let cardData = await $.getJSON(`${BASE_URL}/${deckData.deck_id}/draw/`);
        let cardSrc = cardData.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardSection.append(
            $('<img>', {
                src: cardSrc,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (cardData.remaining === 0) $btn.remove();
    });
};
requestCards();