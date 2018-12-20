// event listener for form submit

document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(event) {
  event.preventDefault(); // prevents default behaviour of form submit

  // getting values:

  var siteName = document.getElementById("siteName").value;
  var siteURL = document.getElementById("siteURL").value;

  if (!validateFormInput(siteName, siteURL)) {
    return false;
  }

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

  // clear form
  document.getElementById("siteName").value = "";
  document.getElementById("siteURL").value = "";
  window.scrollTo(0, document.body.scrollHeight);

  // re-fetch bookmarks
  fetchBookmarks();
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

    // URL validation

    if (!url.includes("https") || !url.includes("http")) {
      url = "http://" + url;
    } else if (!url.includes("www")) {
      url = "http://www." + url;
    }
    // TODO: Design the output
    // designing output
    bookmarksResult.innerHTML += `<div class="card card-body bg-light row"><div class="col-sm"><h3>${name}</h3></div><div class="col-sm"><a class="btn btn-primary visitBtn" target="__blank" href=${url}>Visit</a></div><div class="col-sm"><button class="btn btn-danger deleteBtn" onClick="deleteBookmark(\'${url}\')">Delete</button></div></div>`;
  }
}

// delete bookmarks
function deleteBookmark(url) {
  console.log(url);
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //loop through bookmarks
  for (let index = 0; index < bookmarks.length; index++) {
    if (url.includes(bookmarks[index].url)) {
      bookmarks.splice(index, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // re-fetch bookmarks
  fetchBookmarks();
}

// input validation
function validateFormInput(siteName, siteURL) {
  if (!siteName || !siteURL) {
    alert("Please fill the form");
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!expression.test(siteURL)) {
    alert("Enter a valid URL!");
    return false;
  }
  return true;
}
