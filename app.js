// Base Search URL: http://openlibrary.org/search.json?q=${genre}&mode=everything
// Base Img URL: 

// API Requests

async function GetBooks(genre) {
  const newObj = {};
  const url = `http://openlibrary.org/search.json?q=${genre}&mode=everything`;
  const responses = await axios.get(url)
  const bookArray = responses.data.docs;
  // console.log(bookArray)
  // bookArray.forEach((book => {
  //   console.log(book.title);
  //   console.log(book.cover_i)
  //   console.log(book.author_name[0])
  // }))
}

GetBooks('horror');

// Generate Collection
function generateBooks(num) {
  // counter for column position
  let columnPosition = 0; 
  for (let i = 0; i < num; i++) {
    setTimeout(() => {
      const gridContainer = document.querySelector('#grid-container')
      const bookDiv = document.createElement('div');

      bookDiv.classList.add('book')
      bookDiv.setAttribute("id", `i${i}`);
      bookDiv.textContent = `${i}`;
      // randomColor(bookDiv);

      // If i has reached a shelf breakpoint, reset column counter 
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

function linkBooks() {

}

const generateCollection = document.querySelector('#generate-collection');

generateCollection.addEventListener('click', (e) => {
  e.preventDefault();
  clearBooks();
  generateBooks(87);
})

// Algo Visualization

const startButton = document.querySelector('#start')

startButton.addEventListener('click', (e) => {
  const array =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
  e.preventDefault();
  function vBinarySearch(array, target) {
    return vSearchHelper(array, target, 0, array.length - 1);
  }

  function vSearchHelper(array, target, left, right) {
    // const leftDiv = document.querySelector(`#i${array[0]}`);
    // const rightDiv = document.querySelector(`#i${array[array.length - 1]}`);
    if (left > right) return -1;
    // leftDiv.style.color = 'gold';
    // rightDiv.style.color = 'gold';
    const mid = Math.floor((left + right) / 2);
    const potentialMatch = array[mid];
    if (target === potentialMatch) {
      return mid;
    } else if (target < potentialMatch) {
      return searchHelper(array, target, left, mid - 1);
    } else {
      return searchHelper(array, target, mid + 1, right);
    }
  }
  vBinarySearch(array, 9);
})

// highlight the left and right bounds of search

function binarySearch(array, target) {
  return searchHelper(array, target, 0, array.length - 1);
}

function searchHelper(array, target, left, right) {
	if (left > right) return -1;
	const mid = Math.floor((left + right) / 2);
	const potentialMatch = array[mid];
	if (target === potentialMatch) {
		return mid;
	} else if (target < potentialMatch) {
		return searchHelper(array, target, left, mid - 1);
	} else {
		return searchHelper(array, target, mid + 1, right);
	}
}