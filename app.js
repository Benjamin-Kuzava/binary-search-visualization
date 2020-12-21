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

// async function getBookCover(book) {
//   const responses = await axios.get(url)
// }

// GetBooks('horror');
