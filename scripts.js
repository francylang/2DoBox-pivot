$(document).ready(function() {
  prependAll(getToDoFromStorage());
});

<<<<<<< HEAD
// -----------EVENT LISTENERS------------
$('.todo-card-section').on('click', '#delete', deleteCard);
=======
// ------------------- EVENT LISTENERS ---------------------
$('.todo-card-section').on('click', '#delete', deleteCard)
>>>>>>> 5541fb326b44d3060ee0b618f5085335d03c048e
$(".todo-card-section").on('click', '.upvote-btn', upImportance);
$(".todo-card-section").on('click', '.downvote-btn', downImportance);
$('.todo-card-section').on('click', '.completed-task-btn', addClassOfCompletedTask);
$('.todo-card-section').on('keyup', 'h2', editTitle);
$('.todo-card-section').on('keyup', 'p', editBody);
$("#todo-task, #todo-title").on('keyup', enableSave);
$('#search-bar').on('keyup', searchCards);
$("#save-btn").on('click', disableSave);
$(document).on('click', '.delete-btn', deleteCard);
$(document).on('keyup', enterKeyBlur);
$('.bottom-container').on('click', '#none, #low, #normal, #high, #critical', filter);
$('#clear-filters').on('click', clearAndReplaceWithAll);


// ------------FUNCTIONS------------

// ----------CONSTRUCTOR FUNCTION------------
function NewToDo(title, body, id) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.importance = 'normal';
  this.classy = false;
};

function addClassOfCompletedTask() {
  var currentCard = $(this).parents('.to-do-card');
  var id = $(this).parents('.to-do-card')[0].id;
  currentCard.toggleClass('completed-task');
  toDoArray.forEach(function(card) {
    if (card.id == id) {
      card.classy = !card.classy;
   }
  });
  sendToDosToStorage();
}

function prepareTheCardInfo(card) {
  var initialClass;
  if (card.classy) {
    initialClass = 'to-do-card completed-task';
  }
  prependCard(card, initialClass);
}


function injection(ToDo) {
  return `<div class="${ToDo.classy} to-do-card" id="${ToDo.id}">
            <div class="card-title-flex">
              <h2 contenteditable=true>${ToDo.title}</h2>
              <div class="delete-btn" id="delete"></div>
            </div>
              <p contenteditable=true>${ToDo.body}</p>
              <div class="card-quality-flex quality-spacing">
              <div class="upvote-btn" id="upvote"></div>
              <div class="downvote-btn" id="downvote"></div>
              <h3>importance:
              <span class="ToDo-quality">${ToDo.importance}</span></h3>
              <button type="button" class="completed-task-btn">
                completed task</button>
              <hr>
            </div>
          </div>`;
}


function prependCard(ToDo) {
  var injected = injection(ToDo);
  $(".todo-card-section").prepend(injected);
}

function appendLastTenCards(ToDo) {
  var injected = injection(ToDo);
  $(".todo-card-section").prepend(injected);
}


function addCard() {
  var todoTitle = $("#todo-title").val();
  var todoTask = $("#todo-task").val();
  var newToDo = new NewToDo(todoTitle, todoTask);
  prepareTheCardInfo(newToDo);
  toDoArray.push(newToDo);
  sendToDosToStorage();
};


function deleteCard() {
 var currentCardId = $(this).parent().parent()[0].id;
 toDoArray.forEach(function(card, index) {
   if (currentCardId == card.id) {
     toDoArray.splice(index, 1)
   }
 });
 sendToDosToStorage()
 $(this).closest('.to-do-card').remove();
};


<<<<<<< HEAD
function upImportance() {
  var id = $(this).closest('.to-do-card')[0].id;
  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  toDoArray.forEach(function(card, i) {
=======
// -------- CONSTRUCTOR FUNCTION ---------
function NewToDo(title, body, importance) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.importance = 'normal';
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

function prependAll() {
  getToDoFromStorage().forEach(function(element) {
    prependCard(element);
  });
};

// ---------- SEND TO LOCAL STORAGE/ STORE TO-DO ------------
function sendIdeasToStorage() {
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
};

// ---------- GET ------------
function getToDoFromStorage() {
  ideaArray = JSON.parse(localStorage.getItem("ideaArray")) || [];
    return ideaArray;
};

// -------- IMPORTANCE INDICATOR ---------
function importanceArray() {
  return ['none', 'low', 'normal', 'high', 'critical'];
}

function upImportance() {
  var id = $(this).closest('.to-do-card')[0].id;
  ideaArray.forEach(function(card) {
>>>>>>> 5541fb326b44d3060ee0b618f5085335d03c048e
    if (card.id == id) {
      var currentIndex = importanceArray().indexOf(card.importance);
      currentIndex = (currentIndex != 4) ? currentIndex + 1 : currentIndex;
      card.importance = importanceArray()[currentIndex];
      $(event.target).siblings().find('span').text(card.importance);
    }
  })
  sendToDosToStorage();
};


function downImportance() {
  var id = $(this).closest('.to-do-card')[0].id;
<<<<<<< HEAD
  var importanceArray = ['none', 'low', 'normal','high','critical'];
  toDoArray.forEach(function(card) {
=======
  ideaArray.forEach(function(card) {
>>>>>>> 5541fb326b44d3060ee0b618f5085335d03c048e
    if (card.id == id) {
      var currentIndex = importanceArray().indexOf(card.importance);
      currentIndex = (currentIndex !== 0) ? currentIndex - 1 : currentIndex;
      card.importance = importanceArray()[currentIndex];
      $(event.target).siblings().find('span').text(card.importance);
    }
  })
<<<<<<< HEAD
  sendToDosToStorage();
};


=======
  sendIdeasToStorage();
};

// ------ Marking card with a class of '.completed-task' -------
function addClassOfCompletedTask() {
  var currentCard = $(this).closest('.to-do-card');
  // if card hasClass() of '.completed-task', remove it.
  // if card does not have '.completed-task', give it one.
  currentCard.toggleClass("completed-task");

}

 //(.id is javascript method, refactor .... using .attr('id')

// ---------- ADD CARD/ TO-DO ------------
function addCard() {
  var ideaTitle = $("#todo-title").val();
  var ideaBody = $("#todo-task").val();
  var ideaStatus = "normal"
  var newIdea = new NewToDo(ideaTitle, ideaBody, ideaStatus);
  prependCard(newIdea);
  ideaArray.push(newIdea);
  sendIdeasToStorage();
};

// ---------- DELETE TO-DO ------------
function deleteCard() {
 var currentCardId = $(this).closest('.to-do-card')[0].id;
 ideaArray.forEach(function(card, index) {
   if (currentCardId == card.id) {
     ideaArray.splice(index, 1)
   }
 });
 sendIdeasToStorage()
 $(this).closest('.to-do-card').remove()
};

// ------- ENTER KEY FUNCTION ---------
>>>>>>> 5541fb326b44d3060ee0b618f5085335d03c048e
function enterKeyBlur(e) {
  if (e.which === 13) {
    $(e.target).blur();
  }
}
<<<<<<< HEAD


function editTitle(event) {
=======
// -------- EDIT TITLE ------------
function editTitle() {
>>>>>>> 5541fb326b44d3060ee0b618f5085335d03c048e
  var id = $(this).closest('.to-do-card')[0].id;
  var title = $(this).text(); {
  enterKeyBlur(event);
  toDoArray.forEach(function(card) {
    if (card.id == id) {
      card.title = title;
   }
 });
  sendToDosToStorage();
 }
};

<<<<<<< HEAD

function editBody(event) {
=======
// -------- EDIT TASK ------------
function editBody() {
>>>>>>> 5541fb326b44d3060ee0b618f5085335d03c048e
  var id = $(this).closest('.to-do-card')[0].id;
  var body = $(this).text();
  enterKeyBlur(event);
  toDoArray.forEach(function(card) {
    if (card.id == id) {
      card.body = body;
    }
  });
  sendToDosToStorage();
};

<<<<<<< HEAD

function sendToDosToStorage() {
  localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
};


function getToDoFromStorage() {
  toDoArray = JSON.parse(localStorage.getItem("toDoArray")) || [];
    return toDoArray;
};

function filterOutClassy() {
  return toDoArray.filter(function(el) {
    if (!el.classy) {
      return el;
    }
  })
}

/////////////////////////////////////////////////////////////////////
function prependAll(toDoArray) {
  var lengthOfTenArray = filterOutClassy();
  lengthOfTenArray.slice(-10).forEach(function(el){
    appendLastTenCards(el);
  });
}
//////////////////////////////////////////////////////////////////////

=======
// --------- SAVE BUTTON ------------
>>>>>>> 5541fb326b44d3060ee0b618f5085335d03c048e
function enableSave() {
  if (($('#todo-title').val() !== "") || ($('#todo-task').val() !== '')) {
    $('#save-btn').removeAttr('disabled');
  }
};


function disableSave() {
  evalInputsAlertIfEmpty();
  $('#save-btn').attr('disabled', 'disabled');
};

<<<<<<< HEAD
=======
// ---------- EVALUATE INPUTS ------------
>>>>>>> 5541fb326b44d3060ee0b618f5085335d03c048e
function evalInputsAlertIfEmpty() {
  var todoTitle = $('#todo-title').val();
  var todoTask = $('#todo-task').val();
  if (!todoTitle) {
    return alert('Please enter a task title.');
  } else if (!todoTask) {
    return alert ('Please enter a task.');
  } else {
    addCard();
    resetInputs();
  }
};

<<<<<<< HEAD

=======
// -----------RESET INPUTS------------
>>>>>>> 5541fb326b44d3060ee0b618f5085335d03c048e
function resetInputs() {
  $('#todo-title').val('');
  $('#todo-task').val('');
};

<<<<<<< HEAD

=======
// -----------SEARCH TO DO CARDS------------
>>>>>>> 5541fb326b44d3060ee0b618f5085335d03c048e
function searchCards() {
  var search = $(this).val().toUpperCase();
  var results = toDoArray.filter(function(elementCard) {
                return elementCard.title.toUpperCase().includes(search) ||
                elementCard.body.toUpperCase().includes(search)
                });
  $('.todo-card-section').empty();
  for (var i = 0; i < results.length; i++) {
    prepareTheCardInfo(results[i]);
  }
};

<<<<<<< HEAD

=======
// -----------FILTER BY IMPORTANCE------------
>>>>>>> 5541fb326b44d3060ee0b618f5085335d03c048e
function filter(event) {
  event.preventDefault()
  var arrayFromStorage = getToDoFromStorage();
  var importanceRating = $(event.target).text();
  var returnedFilterArray = arrayFromStorage.filter(function(element) {
                            return element.importance === importanceRating;
                            });
  filterInOrOut(returnedFilterArray);
}

function filterInOrOut(returnedFilterArray) {
  $('.todo-card-section').empty();
  returnedFilterArray.forEach(function(todo) {
    prepareTheCardInfo(todo);
  })
}

function clearAndReplaceWithAll() {
  $('.todo-card-section').empty();
  prependAll();
}

function filterTasksWithoutCompletedClass(e) {
  e.preventDefault();
  var storedArray = getToDoFromStorage();

}
