$(document).ready(function() {
  getToDoFromStorage();
});

// -------------------EVENT LISTENERS---------------------
$('.todo-card-section').on('click', '#delete', deleteCard)
$(".todo-card-section").on('click', ".upvote-btn", upvoteRating);
$(".todo-card-section").on('click', ".downvote-btn", downVoteRating);
$('.todo-card-section').on('keyup', 'h2', editTitle);
$('.todo-card-section').on('keyup', 'p', editBody)
$("#todo-task, #todo-title").on('keyup', enableSave);
$('#search-bar').on('keyup', searchCards)
$("#save-btn").on('click', disableSave)
$(document).on('click', ".delete-btn", deleteCard);
$(document).on('keyup', enterKeyBlur)

// put the qualities in an array
function upvoteRating() {
  var checkQualityStatus = $(this).closest('.card-quality-flex').find('.idea-quality');
  if (checkQualityStatus === 'swill') {
    checkQualityStatus.text('plausible');
  } else {
    checkQualityStatus.text('genius');
  }
  var id = $(this).closest('.to-do-card')[0].id;
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.status = checkQualityStatus.text();
  }});
  sendIdeaToStorage();
};

function downVoteRating() {
  var checkQualityStatus = $(this).closest('.card-quality-flex').find('.idea-quality');
  if (checkQualityStatus.text() === 'genius') {
    checkQualityStatus.text('plausible');
  } else {
    checkQualityStatus.text('swill')
  }
  var id = $(this).closest('.to-do-card')[0].id;
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.status = checkQualityStatus.text();
  }});
  sendIdeaToStorage();
};

// ----------ADD CARD/ TO-DO------------
function addCard() {
  var ideaTitle = $("#todo-title").val();
  var ideaBody = $("#todo-task").val();
  var ideaStatus = "swill"
  var newIdea = new FreshIdea(ideaTitle, ideaBody, ideaStatus);
  prependCard(newIdea);
  ideaArray.push(newIdea);
  sendIdeaToStorage();
};

// function getLocalStorage() {
//   localStorage.setItem("")
//   console.log('getLocalStorage')
// }

// ----------PREPEND CARD/TO-DO------------
function prependCard(idea) {
  $('.todo-card-section').prepend(
    `<div class="to-do-card" id="${idea.id}">
      <div class="card-title-flex">
        <h2 contenteditable=true>${idea.title}</h2>
        <div class="delete-btn" id="delete"></div>
      </div>
      <p contenteditable=true>${idea.body}</p>
        <div class="card-quality-flex quality-spacing">
        <div class="upvote-btn" id="upvote"></div>
        <div class="downvote-btn" id="downvote"></div>
        <h3>importance: <span class="idea-quality">${idea.status}</span></h3>
        <button type="button" class="completed-task-btn">completed task</button>
      </div>
    </div>`
  )
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

// FILTER FOR IMPORTANCE-------
// function search() {
//   var toDoArray = getToDoFromStorage();
//   var inputText = $('')
// }

function deleteCard() {
 var currentCardId = $(this).closest('.to-do-card')[0].id
 ideaArray.forEach(function(card, index) {
   if (currentCardId == card.id) {
     ideaArray.splice(index, 1)
   }
 });
 sendIdeaToStorage()
 $(this).closest('.to-do-card').remove()
};

// storage check function
// include cardArray = []
// retrieve localStorage function
// limit card list function
// clear inputs function


function storageControl() {
  var cardArray = []
  getToDoFromStorage();
};



// -----------------------WORKING REFACTORED FUNCTIONS----------------------------

// ----------CONSTRUCTOR FUNCTION------------
function FreshIdea(title, body, status) {
  this.title = title;
  this.body = body;
  // this.status = "swill";
  this.id = Date.now();
  this.importance = 'normal';
};
// -------RETURN FUNCTION---------
function enterKeyBlur(e) {
  if (e.which === 13) {
    $(e.target).blur();
  }
}
// --------EDIT TITLE------------
function editTitle(event) {
  var id = $(this).closest('.to-do-card')[0].id;
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
// ------EDIT TASK------------
function editBody(event) {
  var id = $(this).closest('.to-do-card')[0].id;
  var body = $(this).text();
  enterKeyBlur(event);
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.body = body;
    }
  });
  sendIdeaToStorage();
};

// ----------SEND TO LOCAL STORAGE/ STORE TO-DO------------
function sendIdeaToStorage() {
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
};

// ----------GET FROM LOCAL STORAGE------------
function getToDoFromStorage() {
    ideaArray = JSON.parse(localStorage.getItem("ideaArray")) || [];
    ideaArray.forEach(function(element) {
    prependCard(element);
    });
  }
// ----------GET SHIT------------
function getToDoId(todo) {
    return todo.id;
  }
function getToDoIndex(id) {
    var todos = getToDoFromStorage();
    return todos.map(getToDoId).indexOf(parseInt(id));
  }

function getInputs() {
  return { title: $('#todo-title').val(),
  task: $('#todo-task').val(),
  id: Date.now() };
}

// ---------SAVE BUTTON------------
function enableSave() {
  if (($("#todo-title").val() !== "") || ($("#todo-task").val() !== "")) {
    $("#save-btn").removeAttr("disabled");
  }
};

function disableSave() {
  event.preventDefault();
  evalInputsAlertIfEmpty();
  $("#save-btn").attr("disabled", "disabled");
};
// ----------EVALUATE INPUTS------------
function evalInputsAlertIfEmpty() {
  var todoTitle = $("#todo-title").val();
  var todoTask = $("#todo-task").val();
  if (!todoTitle) {
    return alert("Please enter a task title.");
  } else if (!todoTask) {
    return alert ("Please enter a task.");
  } else {
    addCard();
    resetInputs();
  }
};
// -----------RESET INPUTS------------
function resetInputs() {
  $('#todo-title').val('');
  $('#todo-task').val('');
};



// function importanceIndicator() {
//   var toDoArray = getToDoFromStorage();
//   var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
//   var toDoCard = $(e.target).closest('.to-do-card')[0];
//   var editChange = $(e.target).data('')

// toDoArray.forEach(function(card, index) {
//   if (card.id == card.id) {
//     var currentIndex = importanceArray.indexOf(todo.importance);
//     i
//   }
// })
// }
