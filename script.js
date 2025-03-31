const INIT_SIZE = 16;

const flexGrid = document.querySelector(".flex-grid");

addInputPanel(flexGrid);
initCanvas(flexGrid, INIT_SIZE);

function addInputPanel(container) {
    const controlPanel = document.createElement("div");
    controlPanel.classList.add('control-panel');
    container.appendChild(controlPanel);

    const inputSize = document.createElement("input");
    inputSize.classList.add('input-size');
    controlPanel.appendChild(inputSize);
    
    inputSize.focus();

    const btnSize = document.createElement("button");
    btnSize.classList.add('btn-size');
    btnSize.textContent = "Set canvas size";
    controlPanel.appendChild(btnSize);

    btnSize.addEventListener("click", () => {
        let canvasSize = getCanvasSize();
        initCanvas(container, canvasSize);
    });

}

function initCanvas(container, size) {
    let canvas = container.querySelector(".canvas");
    if (size) {
        canvas?.remove()
        addCanvas(container, size);
    }
}

function addCanvas(container, size) {
    const canvas = document.createElement("div");
    canvas.classList.add("canvas");
    container.appendChild(canvas);
    
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.add('row');
        for (let j = 0; j < size; j++) {
            const element = document.createElement("div");
            element.classList.add("element");
            row.appendChild(element);
        }
        canvas.appendChild(row);
    }

    canvas.addEventListener('mouseover', setRandomColor)
}

function getCanvasSize(){
    const inputSize = document.querySelector('.input-size');

    const size = +inputSize.value;
    
    if ( !Number.isInteger(size) || size <= 0 ) {
        inputSize.value = "Enter valid number";
        inputSize.focus();
        return;
    } else if ( size > 100 ) {
        inputSize.value = "Max: 100";
        inputSize.focus();
        return;
    }
    inputSize.focus();
    return size;
}

function setRandomColor(event) {
    let target = event.target;
    if (target.classList.contains('element')) {
        target.style.backgroundColor = `${getRandomColor()}`;

        let opacity = +target.style.opacity;
        if (opacity < 1) {
            opacity += .1;
            target.style.opacity = `${opacity}`;
        }
    }
}

function getRandomColor() {
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    return `rgb(${r},${g},${b})`;
}

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));


