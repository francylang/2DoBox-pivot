var ideaArray = [];

$(document).ready(function() {
  getIdeaFromStorage();
});

$("#todo-task, #todo-title").on('keyup', enableSave);
$("#save-btn").on('click', disableSave)
$(".todo-card-section").on('click', ".delete-button", removeCard);
$(document).on('click', ".delete-btn", deleteCard);
$(".todo-card-section").on('click', ".upvote-btn", upvoteRating);
$(".todo-card-section").on('click', ".downvote-btn", downVoteRating);
$('.todo-card-section').on('keyup', 'h2', editTitle);
$('.todo-card-section').on('keyup', 'p', editBody)


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

function removeCard() {
  $(this).closest('.idea-card').remove();
};

function deleteCard() {
  $(this).closest('.idea-card').remove();
};

function upvoteRating() {
  var checkQualityStatus = $(this).closest('.card-quality-flex').find('.idea-quality').text();
  if (checkQualityStatus === 'swill') {
    $(this).closest('.card-quality-flex').find('.idea-quality').text('plausible');
  } else {$(this).closest('.card-quality-flex').find('.idea-quality').text('genius');
  }
};

function downVoteRating() {
  var checkQualityStatus = $(this).closest('.card-quality-flex').find('.idea-quality').text();
  if (checkQualityStatus === 'genius') {
    $(this).closest('.card-quality-flex').find('.idea-quality').text('plausible');
  } else {$(this).closest('.card-quality-flex').find('.idea-quality').text('swill');
  }
};

function FreshIdea(title, body, status) {
  this.title = title;
  this.body = body;
  this.status = "swill";
  this.id = Date.now();
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

function getIdeaFromStorage() {
  if (localStorage.getItem('ideaArray')) {
    ideaArray = JSON.parse(localStorage.getItem("ideaArray"));
    ideaArray.forEach(function(element) {
      prependCard(element);
    });
  } else {
    alert('You do not have any of your shit in here');
  }
};

function editTitle(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    this.blur();
  }
  var id = $(this).closest('.idea-card')[0].id;
  var title = $(this).text();
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.title = title;
    }
  });
  sendIdeaToStorage();
};


function editBody(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    this.blur();
  }
  var id = $(this).closest('.idea-card')[0].id;
  var body = $(this).text();
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.body = body;
    }
  });
  sendIdeaToStorage();
};

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




$('#search-bar').on('keyup', searchCards)

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
