// event listener for form submit

document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(event) {
  event.preventDefault(); // prevents default behaviour of form submit

  // getting values:

  var siteName = document.getElementById("siteName").value;
  var siteURL = document.getElementById("siteURL").value;

  var bookmark = {
    name: siteName,
    url: siteURL
  };

  // check if any bookmark is already in localStorage

  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);

    // set localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // add new bookmarks
    bookmarks.push(bookmark);

    // set back bookmarks to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}

// Fetching bookmarks to display

function fetchBookmarks() {
  // get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  console.log(bookmarks);

  // output object
  var bookmarksResult = document.getElementById("bookmarksResults");
  bookmarksResult.innerHTML = "";

  // build output
  for (let index = 0; index < bookmarks.length; index++) {
    var name = bookmarks[index].name;
    var url = bookmarks[index].url;

    // TODO: Design the output
    // designing output
    bookmarksResult.innerHTML += `<div class="card card-body bg-light"><h3>${name}</h3></div>`;
  }
}
