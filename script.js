const container = document.getElementById("listedTodo");
const textTodo = document.getElementById("inputTodo");
let todorow = document.querySelectorAll(".todorow");
//Initialisation cpteur
let itemsLft = 0;
document.getElementById("itemVal").innerText = itemsLft + ' items left';

// ajout d'un todo 
function addTodo() {
    itemsLft = itemsLft + 1; // cpt
    document.getElementById("itemVal").innerText = itemsLft + ' items left';

    const todo = document.createElement("div");
    const todoCheckBox = document.createElement("input");
    const todoLabel = document.createElement("label");
    const cross = document.createElement("img");
    todoLabel.innerText = textTodo.value;

    textTodo.value = "";

    todoCheckBox.type = "checkbox";
    todoCheckBox.name = "checkbox";

    todoLabel.htmlFor = "checkbox";

    todoLabel.addEventListener("click", () => {
        if (todoCheckBox.checked) {
            todoCheckBox.checked = false;
            todo.classList.add("active");
        } else {
            todoCheckBox.checked = true;
            todo.classList.add("completed");
        }
    });


    cross.src = "./images/icon-cross.svg";
    cross.addEventListener("click", (e) => {
        e.target.parentElement.remove();
        itemsLft = itemsLft - 1;
        document.getElementById("itemVal").innerText = itemsLft + ' items left';
    });

    todo.classList.add("todorow")
    todo.appendChild(todoCheckBox);
    todo.appendChild(todoLabel);
    todo.appendChild(cross);
    todo.draggable = true;

    container.appendChild(todo);
    // draggable

    function getDragElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.todorow:not(.dragged)')]

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return {
                    offset: offset,
                    element: child
                }
            } else {
                return closest
            }
        }, {
            offset: Number.NEGATIVE_INFINITY
        }).element;
    }


    // draggable
    todorow = document.querySelectorAll(".todorow");
    todorow.forEach(todorow => {

        todorow.addEventListener('dragstart', (e) => {
            e.target.classList.add('dragged');
        });
        todorow.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragged');
        });


        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const ElemAfter = getDragElement(container, e.clientY);
            const dragged = document.querySelector('.dragged');

            if (ElemAfter == null) {
                container.appendChild(dragged);
            } else {
                container.insertBefore(dragged, ElemAfter)
            }
        });
    })

}



// Enter to add a todo
textTodo.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        addTodo();
        todorow = document.querySelectorAll(".todorow");
    }
})

// switch theme
document.querySelector('.theme').addEventListener('click', () => {
    document.body.classList.toggle('dark')
})

// filter
const showAll = document.getElementById("all");
const showActive = document.getElementById("active");
const showComplete = document.getElementById("finished");
const clearComplete = document.getElementById("clearComplete");



showAll.addEventListener("click", () => {
    showActive.classList.remove("selected");
    showComplete.classList.remove("selected");
    clearComplete.classList.remove("selected");
    showAll.classList.add("selected");

    todorow.forEach(todorow => {
        todorow.classList.remove('hide')
        todorow.classList.add('show')
    })
});

showActive.addEventListener("click", () => {
    showAll.classList.remove("selected");
    showComplete.classList.remove("selected");
    clearComplete.classList.remove("selected");
    showActive.classList.add("selected");

    todorow.forEach(todorow => {
        let inputBox = todorow.firstChild;
        if (inputBox.checked === false) {
            inputBox.parentNode.classList.remove('hide')
            inputBox.parentNode.classList.add('show')
        } else {
            inputBox.parentNode.classList.remove('show')
            inputBox.parentNode.classList.add('hide')
        }
    })
});


showComplete.addEventListener("click", () => {
    showAll.classList.remove("selected");
    showActive.classList.remove("selected");
    clearComplete.classList.remove("selected");
    showComplete.classList.add("selected");

    todorow.forEach(todorow => {
        let inputBox = todorow.firstChild;
        if (inputBox.checked) {
            inputBox.parentNode.classList.remove('hide')
            inputBox.parentNode.classList.add('show')
        } else {
            inputBox.parentNode.classList.remove('show')
            inputBox.parentNode.classList.add('hide')
        }
    })
});

clearComplete.addEventListener("click", () => {

    showAll.classList.remove("selected");
    showActive.classList.remove("selected");
    showComplete.classList.remove("selected");
    clearComplete.classList.add("selected");

    todorow.forEach(todorow => {
        let inputBox = todorow.firstChild;
        if (inputBox.checked) {
            inputBox.parentElement.remove();
            itemsLft = itemsLft - 1;
            document.getElementById("itemVal").innerText = itemsLft + ' items left';
        }
    })
})