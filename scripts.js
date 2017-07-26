// var ideaArray = [];

$(document).ready(function() {
  getIdeaFromStorage();
});
// add localStorage to document.ready
// instead of assuming the array is there, you grab it from localStorage
// localStorage, key value pair (key= ideaArray, [])
  // if there is an array use it, if not localStorage.setItem

$('.todo-card-section').on('click', '#delete', deleteCard)
$("#todo-task, #todo-title").on('keyup', enableSave);
$("#save-btn").on('click', disableSave)
$(document).on('click', ".delete-btn", deleteCard);
$(".todo-card-section").on('click', ".upvote-btn", upvoteRating);
$(".todo-card-section").on('click', ".downvote-btn", downVoteRating);
$('.todo-card-section').on('keyup', 'h2', editTitle);
$('.todo-card-section').on('keyup', 'p', editBody)
$('#search-bar').on('keyup', searchCards)
                .on('keyup', enterKeyBlur)

function enableSave() {
  if (($("#todo-title").val() !== "") || ($("#todo-task").val() !== "")) {
    $("#save-btn").removeAttr("disabled");
  }
};

function disableSave() {
  event.preventDefault();
  evalInputs();
  $("#save-btn").attr("disabled", "disabled");
};

// put the qualities in an array
function upvoteRating() {
  var checkQualityStatus = $(this).closest('.card-quality-flex').find('.idea-quality').text();
  if (checkQualityStatus === 'swill') {
    $(this).closest('.card-quality-flex').find('.idea-quality').text('plausible');
    console.log('first if');

  } else {$(this).closest('.card-quality-flex').find('.idea-quality').text('genius');
  console.log('else')
  }
  var id = $(this).closest('.idea-card')[0].id;
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.status = $('.idea-quality').text()
  }});
  sendIdeaToStorage();
};

function downVoteRating() {
  var checkQualityStatus = $(this).closest('.card-quality-flex').find('.idea-quality').text();
  if (checkQualityStatus === 'genius') {
    $(this).closest('.card-quality-flex').find('.idea-quality').text('plausible');
  } else {$(this).closest('.card-quality-flex').find('.idea-quality').text('swill');
  }
  var id = $(this).closest('.idea-card')[0].id;
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.status = $('.idea-quality').text()
  }});
  sendIdeaToStorage();
};



function addCard() {
  var ideaTitle = $("#todo-title").val();
  var ideaBody = $("#todo-task").val();
  var ideaStatus = "swill"
  var newIdea = new FreshIdea(ideaTitle, ideaBody, ideaStatus);
  prependCard(newIdea);
  ideaArray.push(newIdea);
  sendIdeaToStorage();
};

function sendIdeaToStorage() {
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
};

// function getLocalStorage() {
//   localStorage.setItem("")
//   console.log('getLocalStorage')
// }



function getIdeaFromStorage() {
    ideaArray = JSON.parse(localStorage.getItem("ideaArray")) || [];
    ideaArray.forEach(function(element) {
    prependCard(element);
    });
  }


function prependCard(idea) {
  $('.todo-card-section').prepend(
    `<div class="idea-card" id="${idea.id}">
      <div class="card-title-flex">
        <h2 contenteditable=true>${idea.title}</h2>
        <div class="delete-btn" id="delete"></div>
      </div>
      <p contenteditable=true>${idea.body}</p>
        <div class="card-quality-flex quality-spacing">
        <div class="upvote-btn" id="upvote"></div>
        <div class="downvote-btn" id="downvote"></div>
        <h3>quality: <span class="idea-quality">${idea.status}</span></h3>
      </div>
    </div>`
  )
};

function resetInputs() {
  $('#todo-title').val('');
  $('#todo-task').val('');
};

function evalInputs() {
  var ideaTitle = $("#todo-title").val();
  var ideaBody = $("#todo-task").val();
  if (!ideaTitle) {
    return alert("Please enter a title.");
  } else if (!ideaBody) {
    return alert ("Please enter something in the body.");
  } else {
    addCard();
    resetInputs();
  }
};

function searchCards() {
  var search = $(this).val().toUpperCase();
  var results = ideaArray.filter(function(elementCard) {
    return elementCard.title.toUpperCase().includes(search) ||
    elementCard.body.toUpperCase().includes(search) ||
    elementCard.status.toUpperCase().includes(search);
  });
  $('.todo-card-section').empty();
  for (var i = 0; i < results.length; i++) {
    prependCard(results[i]);
  }
};

 function deleteCard() {
  var currentCardId = $(this).closest('.idea-card')[0].id
  ideaArray.forEach(function(card, index) {
    if (currentCardId == card.id) {
      ideaArray.splice(index, 1)
    }
  });
  sendIdeaToStorage()
  $(this).closest('.idea-card').remove()
};


function storageControl() {
  var cardArray = []
  getIdeaFromStorage();
  console.log(storageControl);
}

// storage check function
// include cardArray = []
// retrieve localStorage function
// limit card list function
// clear inputs function


// -----------------------WORKING REFACTORED FUNCTIONS------------


function FreshIdea(title, body, status) {
  this.title = title;
  this.body = body;
  this.status = "swill";
  this.id = Date.now();
};

// -----return/enterkey---------
function enterKeyBlur(e) {
  if (e.which === 13) {
    $(e.target).blur();
  }
}
// ------EDIT TITLE AND TASK------------
function editTitle(event) {
  var id = $(this).closest('.idea-card')[0].id;
  var title = $(this).text(); {
  enterKeyBlur(event);
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.title = title;
   }
  });
  sendIdeaToStorage();
 }
};

function editBody(event) {
  var id = $(this).closest('.idea-card')[0].id;
  var body = $(this).text();
  enterKeyBlur(event);
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.body = body;
    }
  });
  sendIdeaToStorage();
};
