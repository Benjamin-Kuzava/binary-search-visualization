// Base Search URL: http://openlibrary.org/subjects/${subject}.json?limit=87
// Base Img URL: 

// API Requests
let subjectArray = [];

async function GetBooks(subject) {
  try {
    const url = `http://openlibrary.org/subjects/${subject}.json?limit=87`;
    const responses = await axios.get(url);
    subjectArray = [...responses.data.works];
    subjectArray.sort((a, b) => {
      return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
    });
    bookOption(subjectArray);
    return subjectArray;
  } catch (error) {
    console.log(error);
  }
}

GetBooks('literature');

function bookOption(subjectArray) {
  const select = document.querySelector("#book-dropdown");
  return subjectArray.forEach((book) => {
    const option = document.createElement('option');
    option.value = `${book.title}`;
    option.textContent = `${book.title}`;
    select.append(option);
  });
}

function shortedTitle(title) {
  return `${title.slice(0, 6)}...`;
  // Adjust later to check if the slice ends with a space
}

// Generate Collection
function generateBooks(num) {
  // counter for column position
  let columnPosition = 0; 
  for (let i = 0; i < num; i++) {
    setTimeout(() => {
      const gridContainer = document.querySelector('#grid-container')
      const bookDiv = document.createElement('div');
      let shortened = shortedTitle(subjectArray[i].title); // Consider taking care of this on load instead

      bookDiv.classList.add('book')
      bookDiv.setAttribute("id", `i${i}`);
      bookDiv.textContent = `${shortened}`;
      // bookDiv.textContent = `${i}`;
      // randomColor(bookDiv);

      // If i has reached column limit, reset column counter 
      if (i == Math.floor(num * (2 / 3)) || i == Math.floor(num * (1 / 3))) {
        columnPosition = 0;
      }
      bookDiv.style.gridColumn = columnPosition + 4;

      // If a shelf has filled, move to next shelf
      if (i >= num * (2 / 3)) {
        bookDiv.style.gridRow = 18;
      } else if (i >= num * (1 / 3)) {
        bookDiv.style.gridRow = 13;
      } else {
        bookDiv.style.gridRow = 8;
      }
      gridContainer.append(bookDiv);
      // bookDiv.addEventListener('click', () => {
        
      //   bookDiv.style.backgroundColor = 'gold';
      // })
      columnPosition++;
    }, 25*i);
  }
}

function clearBooks() {
  const gridContainer = document.getElementById('grid-container');
  while (gridContainer.childNodes.length > 11) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
}

// Might use
function randomColor(bookDiv) {
  let random = Math.floor(Math.random() * 3);
  if (random === 0) {
    bookDiv.style.backgroundColor = 'rgb(240, 162, 2)';
  } else if (random === 1) {
    bookDiv.style.backgroundColor = 'rgb(39, 7, 34)';
  } else {
    bookDiv.style.backgroundColor = 'rgb(173, 106, 108)';
  }
}
// Might use^

const generateCollection = document.querySelector('#generate-collection');

generateCollection.addEventListener('click', (e) => {
  e.preventDefault();
  clearBooks();
  generateBooks(87);
})

// Algo Visualization

const startButton = document.querySelector('#start')

startButton.addEventListener('click', (e) => {
  const array = testArrayGen(87);
  let target = selectBookToSearch();
  e.preventDefault();
  selectBookToSearch();
  function binarySearch(array, target) {
    return searchHelper(array, target, 0, array.length - 1);
  }
  
  function searchHelper(array, target, left, right) {
    if (left > right) return -1;
    const mid = Math.floor((left + right) / 2);
    const potentialMatch = array[mid];
    let leftBook = document.querySelector(`#i${array[left]}`);
    let rightBook = document.querySelector(`#i${array[right]}`);
    let potentialBook = document.querySelector(`#i${array[mid]}`);

    leftBook.style.backgroundColor = 'gold';
    rightBook.style.backgroundColor = 'gold';
    if (target === potentialMatch) {
      leftBook.style.backgroundColor = 'rgb(249, 111, 93)';
      rightBook.style.backgroundColor = 'rgb(249, 111, 93)';
      potentialBook.style.backgroundColor = 'green';
      setTimeout(() => {
        potentialBook.style.backgroundColor = 'rgb(249, 111, 93)';
      }, 1500)
      return mid;
      // ^Note: here, it should return a function to open a div and display info
    } else if (target < potentialMatch) {
      setTimeout(() => {
        rightBook.style.backgroundColor = 'rgb(249, 111, 93)';
        return searchHelper(array, target, left, mid - 1)
      }, 1000);
    } else {
      setTimeout(() => {
        leftBook.style.backgroundColor = 'rgb(249, 111, 93)';
        return searchHelper(array, target, mid + 1, right)
      }, 1000);
    }
  }
  binarySearch(array, target);
})

function testArrayGen(num) {
  let i = 0;
  let testArray = [];
  while (i < num) {
    testArray.push(i);
    i++;
  }
  return testArray;
}


// when a book is clicked (or searched for), pull up a new div whose content is related to 
  // the bookDiv's id(i${number} and the book array's index(array[${number}]))

function selectBookToSearch() {
  const select = document.querySelector('#book-dropdown')
  let index;
  for (let i = 0; i < subjectArray.length; i++) {
    if(subjectArray[i].title === select.value) {
      index = i;
      return index;
    }
  }
}


// I want the index of the object in subjectArray 
// where subjectArray[index].title === select.value
// iterate through 

/*
for (let i = 0; i < subjectArray.length; i++) {
  if(subjectArray[i].title === select.value) {
  return i;
  }
}
*/