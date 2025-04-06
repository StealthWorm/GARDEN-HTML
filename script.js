/* The solution to draggable elements was inspired by w3schools solution on creating a [Draggable HTML Element](https://www.w3schools.com/howto/howto_js_draggable.asp). */

dragElement(document.getElementById('plant1'));
dragElement(document.getElementById('plant2'));
dragElement(document.getElementById('plant3'));
dragElement(document.getElementById('plant4'));
dragElement(document.getElementById('plant5'));
dragElement(document.getElementById('plant6'));
dragElement(document.getElementById('plant7'));
dragElement(document.getElementById('plant8'));
dragElement(document.getElementById('plant9'));
dragElement(document.getElementById('plant10'));

/*"A closure is the combination of a function bundled together (enclosed) 
with references to its surrounding state (the lexical environment). 
In other words, a closure gives you access to an outer function's scope 
from an inner function." Create a closure so that you can track the dragged element*/

function dragElement(terrariumElement) {
  // Set 4 positions for positioning on the screen
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  // Add event listener to clone the element and start dragging when the pointer is down
  terrariumElement.onpointerdown = function (e) {
    e.preventDefault();
    let clonedElement;

    // Clone the clicked element as soon as dragging starts
    if (!terrariumElement.classList.contains('plant-clone')) {
      clonedElement = terrariumElement.cloneNode(true);
      clonedElement.id = `clone-${Date.now()}`; // Give the clone a unique ID
      clonedElement.style.position = 'absolute';
      clonedElement.classList.add('plant-clone');
      clonedElement.style.top = terrariumElement.offsetTop + 'px';
      clonedElement.style.left = terrariumElement.offsetLeft + 'px';
      terrariumElement.parentElement.appendChild(clonedElement);
      dragElement(clonedElement);
    } else {
      clonedElement = terrariumElement;
    }

    // Get the initial mouse cursor position for pos3 and pos4
    pos3 = e.clientX;
    pos4 = e.clientY;

    document.addEventListener('keyup', function (e) {
      if (!e.shiftKey) {
        clonedElement.style.backgroundColor = 'transparent';
        clonedElement.style.cursor = document.onpointermove
          ? 'move'
          : 'default';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.shiftKey) {
        clonedElement.style.cursor = 'nw-resize';
        clonedElement.style.backgroundColor = 'rgba(0, 0, 0, 0.36)';
      }
    });

    // When the mouse moves, start the drag
    document.onpointermove = function (e) {
      if (e.shiftKey) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        clonedElement.style.width = clonedElement.offsetWidth - pos1 + 'px';
        clonedElement.style.height = clonedElement.offsetHeight - pos2 + 'px';
      } else {
        elementDrag(e, clonedElement);
      }
    };

    // When the mouse is lifted, stop the drag
    document.onpointerup = stopElementDrag;
  };

  function elementDrag(e, draggedElement) {
    // Calculate the new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Set the element's new position
    draggedElement.style.top = draggedElement.offsetTop - pos2 + 'px';
    draggedElement.style.left = draggedElement.offsetLeft - pos1 + 'px';
  }

  function stopElementDrag() {
    // Stop calculating when mouse is released
    document.onpointerup = null;
    document.onpointermove = null;
    document.onkeydown = null;
  }
}
