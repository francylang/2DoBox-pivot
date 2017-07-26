$(document).ready(function() {
  initialPrepend();
});

// -------------------EVENT LISTENERS---------------------
$('.todo-card-section').on('click', '#delete', deleteCard)
$(".todo-card-section").on('click', ".upvote-btn", upImportance);
$(".todo-card-section").on('click', ".downvote-btn", downImportance);
$('.todo-card-section').on('keyup', 'h2', editTitle);
$('.todo-card-section').on('keyup', 'p', editBody)
$("#todo-task, #todo-title").on('keyup', enableSave);
$('#search-bar').on('keyup', searchCards)
$("#save-btn").on('click', disableSave)
$(document).on('click', ".delete-btn", deleteCard);
$(document).on('keyup', enterKeyBlur)
$('.bottom-container').on('click', '#none, #low, #normal, #high, #critical', filter)

// RATING THE IMPORTANCE OF QUALITIES-put the qualities in an array

function importanceIndicator() {

}


// -----------IMPORTANCE INDICATOR/RATING------------
function upImportance() {
  var id = $(this).closest('.to-do-card')[0].id;
  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  ideaArray.forEach(function(card) {
    if (card.id == id) {
    var currentIndex = importanceArray.indexOf(card.importance);
    currentIndex = (currentIndex != 4) ? currentIndex + 1 : currentIndex;
    card.importance = importanceArray[currentIndex];
    $('.' + id).text(card.importance);
    console.log(card.importance);


    }
    sendIdeaToStorage();
  })
};

function downImportance() {
  var id = $(this).closest('.to-do-card')[0].id;
  var importanceArray = ['none', 'low', 'normal','high','critical'];
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      var currentIndex = importanceArray.indexOf(card.importance);
      currentIndex = (currentIndex !== 0) ? currentIndex - 1 : currentIndex;
      card.importance = importanceArray[currentIndex];
      card.text(card.importance);
      }
      sendIdeaToStorage();
    })
  };

// ----------ADD CARD/ TO-DO------------
function addCard() {
  var ideaTitle = $("#todo-title").val();
  var ideaBody = $("#todo-task").val();
  var ideaStatus = "swill"
  var newIdea = new NewToDo(ideaTitle, ideaBody, ideaStatus);
  prependCard(newIdea);
  ideaArray.push(newIdea);
  sendIdeaToStorage();
};

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
        <h3>importance: <span class="idea-quality">${idea.importance}</span></h3>
        <button type="button" class="completed-task-btn">completed task</button>
      </div>
    </div>`
  )
};


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

// -----------------------WORKING REFACTORED FUNCTIONS----------------------------

// ----------CONSTRUCTOR FUNCTION------------
function NewToDo(title, body, importance) {
  this.title = title;
  this.body = body;
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
    return ideaArray;
};

function initialPrepend() {
  getToDoFromStorage().forEach(function(element) {
    prependCard(element);
  });
};
// ----------GET STUFF------------
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
// -----------SEARCH TO DO CARDS------------
function searchCards() {
  var search = $(this).val().toUpperCase();
  var results = ideaArray.filter(function(elementCard) {
    return elementCard.title.toUpperCase().includes(search) ||
    elementCard.body.toUpperCase().includes(search)
    });
  $('.todo-card-section').empty();
  for (var i = 0; i < results.length; i++) {
    prependCard(results[i]);
  }
};

// -----------FILTER RESULTS------------

function filter(event) {
  event.preventDefault()
  console.log('string')
  var arrayFromStorage = getToDoFromStorage();
  var importanceRating = $(event.target).text();
  var returnedFilterArray = arrayFromStorage.filter(function(element) {
    return element.importance === importanceRating;
  });
  console.log(returnedFilterArray);
  filterInOrOut();
}

function filterInOrOut(returnedFilterArray) {
  $('to-do-card').empty();
  returnedFilterArray.forEach(function(todo) {
    prependCard(todo);
  })

}
