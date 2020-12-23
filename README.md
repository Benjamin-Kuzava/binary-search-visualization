# Project Overview

## Project Name

The Bookcase: Binary Search Visualization

## Project Description

Users can generate a random collection of books that are then arranged on a virtual bookshelf. Users can select a specific title to see how the binary search algorithm locates a specific book on the shelf. While the search runs, values tracked within the algorithm are highlighted, including the left and right bounds and current target.

Additionally, clicking on a book will allow users to view additional information or follow a link back to Open Library to learn more.

## API and Data Sample

[Open Library API](https://openlibrary.org/developers/api)

```
{
            "cover_i": 8600440,
            "has_fulltext": false,
            "title": "Horror Masters Vol. 5",
            "title_suggest": "Horror Masters Vol. 5",
            "type": "work",
            "ebook_count_i": 0,
            "edition_count": 1,
            "key": "/works/OL19799843W",
            "last_modified_i": 1561320169,
            "cover_edition_key": "OL27011325M",
            "first_publish_year": 2010,
            "author_name": [
                "Sons of Horror"
            ],
            "publish_year": [
                2010
            ],
            "author_key": [
                "OL7553344A"
            ],
            "seed": [
                "/books/OL27011325M",
                "/works/OL19799843W",
                "/authors/OL7553344A"
            ],
            "isbn": [
                "161704041X",
                "9781617040412"
            ],
            "edition_key": [
                "OL27011325M"
            ],
            "publisher": [
                "River Styx Publishing"
            ],
            "text": [
                "OL27011325M",
                "161704041X",
                "9781617040412",
                "Sons of Horror",
                "OL7553344A",
                "Horror Masters Vol. 5",
                "/works/OL19799843W",
                "River Styx Publishing"
            ],
            "publish_date": [
                "Jan 05, 2010"
            ]
        },
```

## Wireframe

![Wireframe](./assets/WireframeDec12.png)

## MVP/PostMVPs

#### MVP 

- Welcome page or tutorial pop-up for user instruction.
- Generate a random collection of books.
- Click on a book on the shelf to view additional information.
- Click button to run a visual binary search for a title somewhere in the collection.

#### PostMVP  

- Add a linear search option for comparision.
- Add more advanced CSS animations.
- Consider Goodreads API for extra functionality. 

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Dec 18| Prompt / Wireframes / Priority Matrix / Timeframes / API Access | Completed
|Dec 21| Project Approval | Completed
|Dec 22| Core Application Structure: Basic page layout, code for book generation, basic code for binary search | Completed
|Dec 23| Pseudocode / code for generating collection on click, selecting book to be searched in dropdown| Completed
|Dec 24- Dec 26| Holiday| N/A
|Dec 28| Pseudocode / code for highlighting book and accessing additional information | Incomplete
|Dec 30| JS and CSS for visualizing binary search | Completed
|Dec 31- Jan 1| Holiday | N/A
|Jan 3| Additional CSS / PMVP if applicable | Incomplete
|Jan 4| MVP | Incomplete
|Jan 5| Presentations | Incomplete

## Priority Matrix

![Priority Matrix](./assets/priority-matrix.png)

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Basic HTML/CSS| L | 1hr| 1hr | 1hr |
| Fetch info from API | H | 1hr| 1hr | 1hr  |
| Grid and design for bookshelf | H | 3hr| 4hr | 4hr |
| Connect API info and HTML elements| H | 3hr|  |  |
| JS for generating books | H | 2hr| 2hr | 2hr |
| JS for User inputs | H | 3hr|  |  |
| MVP CSS | H | 3hr|  |  |
| Responsive design | M | 3hr|  |  |
| Basic JS for BS search| H | 3hr| 5hr |  5hr|
| Basic CSS for BS search| H | 3hr| 3hr | 3hr |
| Tutorial or Info page| M | 3hr|  |  |
| Speed adjustment for BS search| L | 3hr| 1hr | 1hr |
| Advanced CSS styling| L | 3hr|  |  |
| General QA | H | 5hr|  |  |
| Total | H | 40hrs |  |  |

## Code Snippet
```
	W.I.P.
```
## Change Log
```
	W.I.P.
```
