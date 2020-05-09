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
const isMSBrowser = navigator.userAgent.includes('MSIE') || navigator.userAgent.includes('Edge')

// const m = navigator.userAgent.match(/(opera|chrome|safari|firefox|edge|msie)\/?\s*(\d+)/i)
const m = navigator.userAgent.match(/(opera|chrome|safari|firefox|edge|msie)/i)
console.log(m)

createBoard()

// Board
function createBoard () {
  const config = {
    draggable: true,
    position: 'start',
    dropOffBoard: 'trash',
    sparePieces: sparePieces
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
  html2canvas(target, { scale: 3 })
    .then(function (canvas) {
       // document.body.appendChild(canvas)
       canvas.toBlob(function(blob) {
         console.log('blob data: ', blob)
         // IE & Edge (не передает фигуры на доску)
         if (isMSBrowser) {
           navigator.msSaveBlob(blob, inputFile.value || 'image.jpg');   
           spinner.classList.add('d-none')
         } else {
           saveAs(blob, 'image.jpg')
           spinner.classList.add('d-none')
           // download(blob) 
         }
       }, 'image/jpeg', 1)
    })
}

function download (blob) {
  fileName = inputFile.value || 'image.jpg'
  // берём Blob и создаём уникальный URL для него в формате blob:<origin>/<uuid>
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  link.click()
  spinner.classList.add('d-none')
  // удаляем внутреннюю ссылку на Blob, что позволит браузеру очистить память
  URL.revokeObjectURL(link.href)
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