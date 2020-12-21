// Base Search URL: http://openlibrary.org/search.json?q=${genre}&mode=everything
// Base Img URL: 


// Base algoritm

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

// API Requests

async function GetBooks(genre) {
  const url = `http://openlibrary.org/search.json?q=${genre}&mode=everything`;
  const responses = await axios.get(url)
  const bookArray = responses.data.docs;
  console.log(bookArray)
}

// GetBooks('horror');

// Create Books
function generateBooks(num) {
  // counter for column position
  let columnPosition = 0; 
  for (let i = 0; i < num; i++) {
    const gridContainer = document.querySelector('.grid-container')
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book')
    bookDiv.setAttribute("id", `i${i}`);
    bookDiv.textContent = 'text';

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
    columnPosition++;
  }
}

// GenerateBooks(87);

const generateCollection = document.querySelector('#generate-collection');

generateCollection.addEventListener('click', (e) => {
  e.preventDefault();
  generateBooks(87);
})