// Get references to DOM elements
const quoteText = document.getElementById('text');
const quoteAuthor = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const tweetQuoteButton = document.getElementById('tweet-quote');

// Function to fetch and display a random quote
function fetchQuote() {
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes',
    headers: { 'X-Api-Key': 'wKEbzfyFi8U8oxP/Y9a9Ew==icpkOI47crXCeifG' },
    contentType: 'application/json',
    success: function (result) {
      console.log(result); 

      // Check if we received a quote
      if (result && result.length > 0) {
        const randomQuote = result[0]; 

        // Display the quote and author
        quoteText.textContent = `"${randomQuote.quote}"`;
        quoteAuthor.textContent = `- ${randomQuote.author}`;

        // Update the Tweet
        tweetQuoteButton.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `"${randomQuote.quote}" - ${randomQuote.author}`
        )}`;
      } else {
        quoteText.textContent = 'No quote available';
        quoteAuthor.textContent = '';
      }
    },
    error: function (jqXHR) {
      console.error('Error: ', jqXHR.responseText);
      quoteText.textContent = 'Oops! Unable to fetch quote at the moment.';
      quoteAuthor.textContent = '';
    }
  });
}

newQuoteButton.addEventListener('click', fetchQuote);

fetchQuote();
