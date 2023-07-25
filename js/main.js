const inputEl = document.getElementById('input')
const addBtnEl = document.getElementById('addBtn')
const listEl = document.querySelector('.todo-list')

addBtnEl.addEventListener('click', addTask)

inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (e.isComposing) return // keydown 이슈방지
    addTask()
  }
})

function addTask() {
  if (inputEl.value === '') {
    alert('문자를 입력해주세요!')
    return
  }

  const taskEl = document.createElement('li')
  const taskTxt = document.createElement('span')
  taskTxt.textContent = inputEl.value
  listEl.appendChild(taskEl)
  taskEl.appendChild(taskTxt)
  inputEl.value = null

  addDltBtn(taskEl)
  CtlCheckbox(taskEl)
  saveData()
}

function CtlCheckbox(taskEl) {
  taskEl.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked')
      saveData()
    }
  })
}

function addDltBtn(taskEl) {
  let xIcon = document.createElement('i')
  xIcon.setAttribute('class', 'xi-close')
  taskEl.append(xIcon)

  xIcon.addEventListener('click', (e) => {
    if (e.target.tagName === 'I') {
      e.target.parentElement.remove()
      saveData()
    }
  })
}

function currentDate() {
  const date = new Date()

  const year = date.getFullYear() // 연도
  const month = date.getMonth() + 1 // 월은 0부터 시작하므로 1을 더해줌
  const day = date.getDate() // 일

  const formattedDate = `${year}년 ${month}월 ${day}일`

  const dateEl = document.querySelector('.todo-date')
  const addDate = document.createElement('span')
  addDate.textContent = formattedDate
  dateEl.appendChild(addDate)
}
currentDate()

function saveData() {
  const tasks = listEl.querySelectorAll('li')
  const tasksArray = Array.from(tasks)
  const data = {
    tasks: tasksArray.map((task) => ({
      content: task.textContent,
      isChecked: task.classList.contains('checked'),
    })),
  }
  localStorage.setItem('data', JSON.stringify(data))
}

function showTask() {
  const data = JSON.parse(localStorage.getItem('data'))
  if (data && data.tasks) {
    data.tasks.forEach((task) => {
      const taskEl = document.createElement('li')
      taskEl.textContent = task.content
      if (task.isChecked) {
        taskEl.classList.add('checked')
      }
      listEl.appendChild(taskEl)
      CtlCheckbox(taskEl)
      addDltBtn(taskEl)
    })
  }
}

showTask()
