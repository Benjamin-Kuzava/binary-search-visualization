// Base Search URL: http://openlibrary.org/subjects/${subject}.json?limit=96
// Base Img URL: http://covers.openlibrary.org/b/id/${id}-L.jpg

// API Requests
let subjectArray = [];

// Grab array of book objects from API
async function getBooks(subject) {
  try {
    const url = `http://openlibrary.org/subjects/${subject}.json?limit=96`;
    const responses = await axios.get(url);
    // console.log(responses);
    subjectArray = [...responses.data.works];
    subjectArray.sort((a, b) => {
      return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
    });
    bookOption(subjectArray);
    assignBook(subjectArray, 5);
    return subjectArray;
  } catch (error) {
    console.log(error);
  }
}
getBooks('literature');

// Grab book description
async function bookSummary(key) {
  try {
    const url = `https://openlibrary.org${key}.json`;
    const responses = await axios.get(url);
    const description = responses.data.description.value;
    // console.log(description);
  } catch (error) {
    console.log(error);
  }
}

// Append book titles to dropdown
function bookOption(subjectArray) {
  const select = document.querySelector("#book-dropdown");
  return subjectArray.forEach((book) => {
    const option = document.createElement('option');
    option.value = `${book.title}`;
    option.textContent = `${book.title}`;
    select.append(option);
  });
}

// Assign each book to corresponding book div
function assignBook(array, length) {
  for (let i = 0; i < array.length; i++) {
      let shortened = shortedTitle(array[i]['title'], length);
      let bookDiv = document.querySelector(`#i${i}`);
      bookDiv.lastChild.textContent = `${shortened}`;
  }
  
}

// Shorten title to fit inside div
function shortedTitle(title, length) {
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
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const beginSearch = document.querySelector('#start');

beginSearch.addEventListener('click', (e) => {
  e.preventDefault();
  const array = arrayGeneration(subjectArray.length);
  let target = selectBookToSearch();
  binarySearch(array, target);
  })


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

        leftBook.classList.add('leftBound');
        rightBook.classList.add('rightBound');
        await sleep(1000);
        potentialBook.classList.add('mid');
        if (target === potentialMatch) {
            await sleep(1000);
            potentialBook.classList.remove('mid');
            potentialBook.classList.add('match');
            leftBook.classList.remove('leftBound');
            rightBook.classList.remove('rightBound');
            await sleep(1000);
            potentialBook.classList.remove('match');
            // getCover(subjectArray[mid]['cover_id']);
            // populateBookInfo(mid);
            // setTimeout(() => {
            //   displayInfo();
            // }, 750);
            return mid;
        } else if (target < potentialMatch) {
          await sleep(1000);
          rightBook.classList.remove('rightBound');
          right = mid - 1;
          setTimeout(() => {
            potentialBook.classList.remove('mid');
          }, 1000);
        } else {
          await sleep(1000);
          leftBook.classList.remove('leftBound');
          left = mid + 1;
          potentialBook.classList.remove('mid');
        }
    }
    return -1;
}

  // function binarySearch(array, target) {
  //   return searchHelper(array, target, 0, array.length - 1);
  // }

  // function searchHelper(array, target, left, right) {
  //   const mid = Math.floor((left + right) / 2);
  //   const potentialMatch = array[mid];
  //   let leftBook = document.querySelector(`#i${array[left]}`);
  //   let rightBook = document.querySelector(`#i${array[right]}`);
  //   let potentialBook = document.querySelector(`#i${array[mid]}`);
  //   let speed = selectSpeed(document.querySelector('#adjust-speed').value);
    
  //   if (left > right) return -1;
  //   leftBook.classList.add('leftBound');
  //   rightBook.classList.add('rightBound');
  //   potentialBook.classList.add('mid');
  //   if (target === potentialMatch) {
  //     leftBook.classList.remove('leftBound');
  //     rightBook.classList.remove('rightBound');
  //     potentialBook.classList.remove('mid');
  //     potentialBook.classList.add('match');
  //     setTimeout(() => {
  //     potentialBook.classList.remove('match');
  //     }, 1000);
  //     getCover(subjectArray[mid]['cover_id']);
  //     populateBookInfo(mid);
  //     setTimeout(() => {
  //       displayInfo();
  //     }, 750);
  //     return mid;
  //     // ^Note: here, it should return a function to open a div and display info
  //   } else if (target < potentialMatch) {
  //     setTimeout(() => {
  //       rightBook.classList.remove('rightBound');
  //       potentialBook.classList.remove('mid');
  //       return searchHelper(array, target, left, mid - 1);
  //     }, speed);
  //   } else {
  //     setTimeout(() => {
  //       leftBook.classList.remove('leftBound');
  //       potentialBook.classList.remove('mid');
  //       return searchHelper(array, target, mid + 1, right);
  //     }, speed);
  //   }
  // }


// Helper functions for algo visualization

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
function selectSpeed(slider) {
  if (slider == 1) {
    return 1000;
  } else if (slider == 2) {
    return 500;
  } else {
    return 250;
  }
}




// Displays book info after algo completes
function displayInfo() {
  const result = document.querySelector('.result');
  result.classList.toggle('hidden');
}

// Event listeners inside book info
const closeInfo = document.querySelector('#result-close');
  closeInfo.addEventListener('click', (e) => {
    e.preventDefault();
    displayInfo();
  });

  function getCover(id) {
    const imgPlaceholder = document.querySelector('.img-placeholder');
    if (id === null) {
      imgPlaceholder.src = 'assets/wp404error.jpg';
    } else {
      imgPlaceholder.src = `http://covers.openlibrary.org/b/id/${id}-L.jpg`;
    }
} 
 
// Add content to book info div
function populateBookInfo(index) {
  const bookTitle = document.querySelector('#book-title');
  const AuthorName = document.querySelector('.author-name');
  // const bookContent = document.querySelector('.book-content');

  bookTitle.textContent = subjectArray[index]['title'];
  AuthorName.textContent = subjectArray[index].authors[0]['name'];
}

// Disable buttons after click
function disableButton(button, time) {
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, time)
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
    }, 1000)
  })
})

// Set dropdown to correct option by extracting index from div id
function getIndex(selection) {
  let index = selection.id.slice(1);
  const option = document.querySelector(`option[value="${subjectArray[index]['title']}"]`);
  document.querySelector('#book-dropdown').value = option.value;
}