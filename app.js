// Main API request
let subjectArray = [];

async function getBooks(subject) {
  try {
    const url = `https://openlibrary.org/subjects/${subject}.json?limit=96`;
    const responses = await axios.get(url);
    subjectArray = [...responses.data.works];
    subjectArray.sort((a, b) => {
      return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
    });
    bookOptions(subjectArray);
    assignBook(subjectArray, 4);
    return subjectArray;
  } catch (error) {
    console.log(error);
  }
}
getBooks('fantasy');

// Append book titles to dropdown
function bookOptions(array) {
  const select = document.querySelector("#book-dropdown");
  return array.forEach((book) => {
    const option = document.createElement('option');
    let cleanedTitle = book.title.replaceAll('"', "'"); // edge case where title has double quotes
    option.value = `${cleanedTitle}`;
    option.textContent = `${cleanedTitle}`;
    select.append(option);
  });
}

// Assign each book to corresponding book div
function assignBook(array, length) {
  for (let i = 0; i < array.length; i++) {
      let shortened = shortenedTitle(array[i]['title'], length);
      let bookDiv = document.querySelector(`#i${i}`);
      bookDiv.lastChild.textContent = `${shortened}`;
  }
  
}

// Shorten title to fit inside div
function shortenedTitle(title, length) {
    if (title.length === length || title.length < length) {
      return `${title}`;
    } else if (title.match(/^The/)) {
      return `${title.slice(4, length + 3)}`;
    } else {
      return `${title.slice(0, length)}`;
    }
  }

// Binary Search
  // sleep() in js = https://medium.com/dev-genius/how-to-make-javascript-sleep-or-wait-d95d33c99909
  // ^ More intuitive implementation of setTimeout
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const beginSearch = document.querySelector('#start');

beginSearch.addEventListener('click', (e) => {
  e.preventDefault();
  if (!document.querySelector('.pop-up').classList.contains('hidden')) {
    document.querySelector('.pop-up').classList.toggle('hidden');
  }
  document.querySelector('.book-content').textContent = '';
  let array = [];
  if(window.innerWidth<800) {
    array = arrayGeneration(25);
  } else {
    array = arrayGeneration(subjectArray.length);
  }
  let target = selectBookToSearch();
  binarySearch(array, target);
  });

  // Adapted algorithm from https://www.algoexpert.io/
function binarySearch(array, target) {
    return binarySearchHelper(array, target, 0, array.length - 1);
}

async function binarySearchHelper(array, target, left, right) {
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const potentialMatch = array[mid];
        let leftBook = document.querySelector(`#i${array[left]}`);
        let rightBook = document.querySelector(`#i${array[right]}`);
        let potentialBook = document.querySelector(`#i${array[mid]}`);
        let speed = selectSpeed();

      // Update variable boxes && display bounds on bookshelf each iteration
        document.querySelector('.midpoint').textContent = ``;
        document.querySelector('.low').textContent = `${left}`;
        document.querySelector('.high').textContent = `${right}`;
        leftBook.classList.add('leftBound');
        rightBook.classList.add('rightBound');
        await sleep(speed);
        potentialBook.classList.add('mid');
        document.querySelector('.midpoint').textContent = `${mid}`;
      // Run search
        if (target === potentialMatch) {
          await sleep(500)
          leftBook.classList.remove('leftBound');
          rightBook.classList.remove('rightBound');
          potentialBook.classList.remove('mid');
          removeRight(mid);
          removeLeft(mid);
          potentialBook.classList.add('match');
          await sleep(speed);
          potentialBook.classList.remove('match');
          getCover(subjectArray[mid]['cover_id']);
          populateBookInfo(mid);
          await sleep(500);
          toggleDiv('.pop-up');
          reset(subjectArray); // take a look at this again
          return mid;
        } else if (target < potentialMatch) {
          await sleep(speed);
          rightBook.classList.remove('rightBound');
          right = mid - 1;
          removeRight(right);
          potentialBook.classList.remove('mid');
        } else {
          await sleep(speed);
          leftBook.classList.remove('leftBound');
          left = mid + 1;
          removeLeft(left);
          potentialBook.classList.remove('mid');
        }
    }
  // If no book is selected
    document.querySelector('.button').textContent = 'NO MATCH';
    await sleep(1000);
    reset(subjectArray);
    document.querySelector('.button').textContent = 'Start Search';
    return -1;
}

// Helper functions for algo visualization

// Gray out searched areas
function removeLeft(bound) {
  for (let i = 0; i < bound; i++) {
    const book = document.querySelector(`#i${i}`);
    book.classList.add('searched');
  }
}
function removeRight(bound) {
  for (let i = 95; i > bound; i--) {
    const book = document.querySelector(`#i${i}`);
    book.classList.add('searched');
  }
}

// Reset shelf && variable display
function reset(array) {
  for (let i = 0; i < array.length; i++) {
    const book = document.querySelector(`#i${i}`);
    if(book.classList.contains('searched')) {
      book.classList.remove('searched');
    }
    if(book.classList.contains('rightBound' || book.classList.contains('leftBound'))) {
      book.classList.remove('rightBound');
      book.classList.remove('leftBound');
    }
  }
  document.querySelector('.low').textContent = ``;
  document.querySelector('.midpoint').textContent = ``;
  document.querySelector('.high').textContent = ``;
}

// Temporary array
function arrayGeneration(num) {
  let result = [];
  let i = 0;
  while (i < num) {
    result.push(i);
    i++;
  }
  return result;
}

// Reads value of dropdown
function selectBookToSearch() {
  const select = document.querySelector('#book-dropdown');
  let index;
  for (let i = 0; i < subjectArray.length; i++) {
    if(subjectArray[i].title === select.value) {
      index = i;
      return index;
    }
  }
}

// Sets speed of algo visualization
function selectSpeed() {
  const slider = document.querySelector('#adjust-speed').value;
  if (slider == 1) {
    return 1000;
  } else if (slider == 2) {
    return 500;
  } else {
    return 250;
  }
}

// Toggles hidden book information
function toggleDiv(elementName) {
  const result = document.querySelector(`${elementName}`);
  result.classList.toggle('hidden');
}

// Event listeners for closing divs
const closeInfo = document.querySelector('#result-close');
  closeInfo.addEventListener('click', (e) => {
    e.preventDefault();
    toggleDiv('.pop-up');
  });

  const closeWelcome = document.querySelector('.close');
    closeWelcome.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDiv('.welcome-wrapper');
    });

// Grab book cover if available
  function getCover(id) {
    const imgPlaceholder = document.querySelector('.img-placeholder');
    if (id === null) {
      imgPlaceholder.src = 'assets/wp404error.jpg';
    } else {
      imgPlaceholder.src = `https://covers.openlibrary.org/b/id/${id}-L.jpg`;
    }
} 

// Grab book description
async function bookSummary(key) {
  try {
    const url = `https://openlibrary.org${key}.json`;
    const responses = await axios.get(url);
    const bookContent = document.querySelector('.book-content');
    const description = responses.data.description;
    // Some summaries are one step deeper in the json object
    if(typeof(description) === 'string') {
      bookContent.textContent = cleanSummary(description);
    } else if(typeof(description) === 'object') {
      bookContent.textContent = cleanSummary(description['value']);
    } else {
      bookContent.textContent = "If you are reading this, then unfortunately Open Library's API did not have a book summary available for this title. However, I can assure you that there's a summary out there on the internet, so RIP Open Library."
    }
  } catch (error) {
    console.log(error);
  }
}

// Add content to book info div
function populateBookInfo(index) {
  const bookTitle = document.querySelector('#book-title');
  const AuthorName = document.querySelector('.author-name');
  
  bookSummary(subjectArray[index]['key']);
  bookTitle.textContent = subjectArray[index]['title'];
  AuthorName.textContent = subjectArray[index].authors[0]['name'];
}

// limit summary to 640 chars. If no summary, give templated response.
function cleanSummary(description) {
  let cleaned = '';
  if (description !== undefined) {
    if (description.length > 640 && description.length > 100) {
      cleaned = `${description.slice(0, 639)}...`;
      return cleaned;
    } else {
      return description;
    }
  } 
}

// Disable buttons after click
function disableButton(button, time) {
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, time);
}

// Alternate way to select dropdown
  // Add event listener to multiple divs: https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
const books = document.querySelectorAll(".book-title");

books.forEach(book => {
  book.addEventListener('click', (e) => {
    const selection = e.target.parentElement;
    selection.classList.toggle('selected');
    getIndex(selection);
    setTimeout(() => {
      selection.classList.toggle('selected');
    }, 250);
  });
})

// Set dropdown to selection
function getIndex(selection) {
  let index = selection.id.slice(1);
  let cleanedTitle = subjectArray[index]['title'].replaceAll('"', "'"); // edge case where title has double quotes
  const option = document.querySelector(`option[value="${cleanedTitle}"]`);
  document.querySelector('#book-dropdown').value = option.value;
  document.querySelector('#input-display').textContent = option.value;
}

// Welcome Screen

function nextPage(count) {
  const welcomeHeader = document.querySelector(".welcome-header");
  const welcomeSubheader = document.querySelector(".welcome-subheader");
  const welcomeP1 = document.querySelector(".welcome-p1");
  const welcomeP2 = document.querySelector(".welcome-p2");
  const welcomeImgSrc = document.querySelector(".welcome-img");
  
  switch(count) {
    case 0:
      header = "Binary Search Visualization";
      subheader = "This application is a visualization tool that illustrates how a binary search navigates through an array of sorted items to locate a specific item.";
      p1 = `Feel free to skip ahead using the <span class="bold">Close</span> button below.`;
      p2 = `To learn more, click <span class="bold">Next</span> to continue.`;
      image = "./assets/bs.png";
      break;
    case 1:
      header = "What is a Binary Search?";
      subheader = "A binary search works by dividing its search area in half at each interval. The algorithm checks which side of the midpoint the final target sits, and then adjusts its bounds accordingly.";
      p1 = `The advantage of using a binary search over something like a linear search is time complexity. A linear search has a time complexity of <span class="bold">O(n)</span>, while most implementations of binary searches have a time complexity of <span class="bold">O(log n)</span>. In other words, the larger the array, the more efficient a binary search becomes.`;
      p2 = "";
      image = "./assets/mario-bs.png";
      break;
    case 2:
      header = "How to Use This Application";
      subheader = "Imagine that, like me, you collect a ton of books, but can never find the one you’re looking for on your huge bookshelf.";
      p1 = "If you sorted your collection alphabetically, you could implement a binary search to locate whatever book you need to find. This application visualizes what that process might look like!";
      p2 = `Below, select a book to search, choose your speed, and click <span class="bold">Start Search</span> to begin.`;
      image = "./assets/cat-bs.png";
      break;
  }
  welcomeHeader.textContent = header;
  welcomeSubheader.textContent = subheader;
  welcomeP1.innerHTML = p1;
  welcomeP2.innerHTML = p2;
  welcomeImgSrc.src = image;
}

const next = document.querySelector('.next');
let pageCount = 1;

next.addEventListener('click', (e) => {
  e.preventDefault();
  nextPage(pageCount);
    pageCount++;
  if(pageCount === 3) {
    next.classList.toggle('hidden');
  }
});

// Adjust amount of books depending on screen size
window.addEventListener("resize", smallScreen);
window.addEventListener("load", smallScreen);
window.addEventListener("resize", largeScreen);

function smallScreen() {
  if (window.innerWidth<800){
  for (let i = 25; i < 96; i++) {
    let bookDiv = document.querySelector(`#i${i}`);
    bookDiv.classList.add('hidden');
  }
 }
}

function largeScreen() {
  if (window.innerWidth>800){
  for (let i = 25; i < 96; i++) {
    let bookDiv = document.querySelector(`#i${i}`);
    bookDiv.classList.remove('hidden');
  }
 }
}