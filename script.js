const quoteText = document.getElementById("quote");
const authText = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const tweetButton = document.getElementById("twitter");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");

getQuote();

function loading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

async function getQuote() {
  loading();
  const apiUrl = "https://api.quotable.io/random";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const quote = data.content;
    const author = data.author;
    if (author === "") {
      authText.innerText = "Unknown";
    } else {
      authText.innerText = author;
    }
    if (quote.length > 50) {
      quoteText.classList.add("quote-long");
    } else {
      quoteText.classList.remove("quote-long");
    }
    quoteText.innerText = quote;
    complete();
  } catch (error) {
    console.log(error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
  window.open(twitterUrl, "_blank");
}

newQuoteButton.addEventListener("click", getQuote);
tweetButton.addEventListener("click", tweetQuote);
