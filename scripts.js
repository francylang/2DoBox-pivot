$(document).ready(function() {
  prependAll(getToDoFromStorage());
});

// -----------EVENT LISTENERS------------
$('.todo-card-section').on('click', '#delete', deleteCard);
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
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.classy = !card.classy;
   }
  });
  sendIdeasToStorage();
}

function prepareTheCardInfo(card) {
  var initialClass;
  if (card.classy) {
    initialClass = 'to-do-card completed-task';
  }
  prependCard(card, initialClass);
}


function injection(Idea) {
  return `<div class="${Idea.classy} to-do-card" id="${Idea.id}">
            <div class="card-title-flex">
              <h2 contenteditable=true>${Idea.title}</h2>
              <div class="delete-btn" id="delete"></div>
            </div>
              <p contenteditable=true>${Idea.body}</p>
              <div class="card-quality-flex quality-spacing">
              <div class="upvote-btn" id="upvote"></div>
              <div class="downvote-btn" id="downvote"></div>
              <h3>importance:
              <span class="idea-quality">${Idea.importance}</span></h3>
              <button type="button" class="completed-task-btn">
                completed task</button>
              <hr>
            </div>
          </div>`;
}


function prependCard(Idea) {
  var injected = injection(Idea);
  $(".todo-card-section").prepend(injected);
}

function appendLastTenCards(Idea) {
  var injected = injection(Idea);
  $(".todo-card-section").prepend(injected);
}


function addCard() {
  var todoTitle = $("#todo-title").val();
  var todoTask = $("#todo-task").val();
  var newToDo = new NewToDo(todoTitle, todoTask);
  prepareTheCardInfo(newToDo);
  ideaArray.push(newToDo);
  sendIdeasToStorage();
};


function deleteCard() {
 var currentCardId = $(this).parent().parent()[0].id;
 ideaArray.forEach(function(card, index) {
   if (currentCardId == card.id) {
     ideaArray.splice(index, 1)
   }
 });
 sendIdeasToStorage()
 $(this).closest('.to-do-card').remove();
};


function upImportance() {
  var id = $(this).closest('.to-do-card')[0].id;
  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  ideaArray.forEach(function(card, i) {
    if (card.id == id) {
      var currentIndex = importanceArray.indexOf(card.importance);
      currentIndex = (currentIndex != 4) ? currentIndex + 1 : currentIndex;
      card.importance = importanceArray[currentIndex];
      $(event.target).siblings().find('span').text(card.importance);
    }
  })
  sendIdeasToStorage();
};


function downImportance() {
  var id = $(this).closest('.to-do-card')[0].id;
  var importanceArray = ['none', 'low', 'normal','high','critical'];
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      var currentIndex = importanceArray.indexOf(card.importance);
      currentIndex = (currentIndex !== 0) ? currentIndex - 1 : currentIndex;
      card.importance = importanceArray[currentIndex];
      $(event.target).siblings().find('span').text(card.importance);
    }
  })
  sendIdeasToStorage();
};


function enterKeyBlur(e) {
  if (e.which === 13) {
    $(e.target).blur();
  }
}


function editTitle(event) {
  var id = $(this).closest('.to-do-card')[0].id;
  var title = $(this).text(); {
  enterKeyBlur(event);
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.title = title;
   }
 });
  sendIdeasToStorage();
 }
};


function editBody(event) {
  var id = $(this).closest('.to-do-card')[0].id;
  var body = $(this).text();
  enterKeyBlur(event);
  ideaArray.forEach(function(card) {
    if (card.id == id) {
      card.body = body;
    }
  });
  sendIdeasToStorage();
};


function sendIdeasToStorage() {
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
};


function getToDoFromStorage() {
  ideaArray = JSON.parse(localStorage.getItem("ideaArray")) || [];
    return ideaArray;
};

function filterOutClassy() {
  return ideaArray.filter(function(el) {
    if (!el.classy) {
      return el;
    }
  })
}

/////////////////////////////////////////////////////////////////////
function prependAll(ideaArray) {
  var lengthOfTenArray = filterOutClassy();
  lengthOfTenArray.slice(-10).forEach(function(el){
    appendLastTenCards(el);
  });
}
//////////////////////////////////////////////////////////////////////

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


function resetInputs() {
  $('#todo-title').val('');
  $('#todo-task').val('');
};


function searchCards() {
  var search = $(this).val().toUpperCase();
  var results = ideaArray.filter(function(elementCard) {
                return elementCard.title.toUpperCase().includes(search) ||
                elementCard.body.toUpperCase().includes(search)
                });
  $('.todo-card-section').empty();
  for (var i = 0; i < results.length; i++) {
    prepareTheCardInfo(results[i]);
  }
};


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
  $('.to-do-card').empty();
  returnedFilterArray.forEach(function(todo) {
    prepareTheCardInfo(todo);
  })
}

function clearAndReplaceWithAll() {
  $('.to-do-card').empty();
  appendLastTenCards();
}

function filterTasksWithoutCompletedClass(e) {
  e.preventDefault();
  var storedArray = getToDoFromStorage();

}
