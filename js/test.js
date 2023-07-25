/**
 * Create Input & add button
 */
const inputEl = document.getElementById('input') // 지역변수로 바꾸기!!!!!!!!!
const addBtnEl = document.getElementById('addBtn')
const listEl = document.querySelector('.todo-list') // 지역변수로 바꾸기!!!!!!!
// Add button Event
addBtnEl.addEventListener('click', () => {
  addTask()
})
// EnterKey Event
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (e.isComposing) return // keydown 이슈방지
    addTask()
  }
})

/**
 * Add Task
 */
function addTask() {
  // 공백 입력 시 경고창
  if (inputEl.value === '') {
    alert('문자를 입력해주세요!')
    return
  }
  const taskEl = document.createElement('li')
  // 할 일 추가
  taskEl.textContent = inputEl.value
  listEl.appendChild(taskEl)
  // input 초기화
  inputEl.value = null
  // remove button생성 함수호출
  addDltBtn(taskEl)
  // checkbox생성 함수 호출
  CtlCheckbox(taskEl)
  // Save data
  saveData()
}

/**
 * Checkbox control
 */
function CtlCheckbox(taskEl) {
  taskEl.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked') // toggle로 checked 감시
      saveData()
    }
  })
}

/**
 * Remove button
 */
function addDltBtn(taskEl) {
  // remove button 생성
  let xIcon = document.createElement('i')
  xIcon.setAttribute('class', 'xi-close')
  taskEl.append(xIcon)
  // remove event
  xIcon.addEventListener('click', (e) => {
    if (e.target.tagName === 'I') {
      e.target.parentElement.remove()
      saveData()
    }
  })
}
