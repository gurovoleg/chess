const saveButton = document.querySelector('#save')
const clearButton = document.querySelector('#clear')
const initButton = document.querySelector('#start')
const flipButton = document.querySelector('#flip')
const spareInput = document.querySelector('#spare')
const target = document.querySelector("#board")
const link = document.querySelector("#download")
const spinner = document.querySelector("#spinner")
const inputFile = document.querySelector("#file")
let board = null
let sparePieces = false

createBoard()

// Board
function createBoard () {
  const config = {
    draggable: true,
    position: 'start',
    dropOffBoard: 'trash',
    sparePieces
	}

  board = Chessboard('board', config)

  startEventListeners()
  
}

// reload board (delete & create)
function reloadBoard() {
  if (board) {
    stopEventListeners()
    board.destroy()
  	createBoard()
  }
}

function handleInputChange () {
  sparePieces = this.checked
  reloadBoard()
}

function startEventListeners () {
  initButton.addEventListener('click', board.start)
  clearButton.addEventListener('click', board.clear)
  flipButton.addEventListener('click', board.flip)
  spareInput.addEventListener('change', handleInputChange)
  saveButton.addEventListener('click', getCanvas)
}

function stopEventListeners () {
  initButton.removeEventListener('click', board.start)
  clearButton.removeEventListener('click', board.clear)
  flipButton.removeEventListener('click', board.flip)
  spareInput.removeEventListener('change', handleInputChange)
  saveButton.removeEventListener('click', getCanvas)
}


function getCanvas () {
  spinner.classList.remove('d-none')
  html2canvas(target)
    .then(canvas => {
       canvas.toBlob(function(blob) {
         download(blob) 
       })
    }, 'image/jpeg', 1)
}

function download (blob) {
  fileName = inputFile.value || 'image.jpg'
  url = window.URL.createObjectURL(blob)
  link.href = url
  link.download = fileName
  link.click()
  spinner.classList.add('d-none')
  window.URL.revokeObjectURL(url)
}


// saveButton.addEventListener('click', () => {
// 	html2canvas(target, { allowTaint: true, useCORS: false })
// 		.then(canvas => {
//     	console.log(canvas)
//     	// document.body.appendChild(canvas)
//     	// const dataURL = canvas.toDataURL("image/jpeg")
// 			// console.log(dataURL)
//     	// canvas.toBlob(function(blob) {
//     	//     saveAs(blob, "pretty test-image.png");
//     	// });
// 		});
// })