const aInputEl = document.getElementById('input')
const addBtnEl = document.getElementById('addBtn')
const listEl = document.querySelector('.todo-list')

addBtnEl.addEventListener('click', addTask)

aInputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (e.isComposing) return // keydown 이슈방지
    addTask()
  }
})

function addTask() {
  if (aInputEl.value === '') {
    alert('문자를 입력해주세요!')
    return
  }

  const taskEl = document.createElement('li')
  const taskTxt = document.createElement('span')
  taskTxt.textContent = aInputEl.value
  listEl.appendChild(taskEl)
  taskEl.appendChild(taskTxt)
  aInputEl.value = null

  addEditBtn(taskEl) // editing 버튼 추가
  addDltBtn(taskEl) // remove 버튼 추가
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

/**
 * Editing
 */
function addEditBtn(taskEl) {
  let eXIcon = document.createElement('i') // 변수명을 eXIcon으로 변경
  eXIcon.setAttribute('class', 'xi-pen')
  taskEl.append(eXIcon)

  eXIcon.addEventListener('click', () => {
    editTodoItem(taskEl)
  })
}

function editTodoItem(item) {
  // 이미 수정 중인 항목이면 리턴
  if (item.classList.contains('editing')) {
    return
  }

  const existingSpan = item.querySelector('span')
  const oldText = existingSpan ? existingSpan.textContent : ''

  const eInputEl = document.createElement('input')
  eInputEl.value = oldText

  if (existingSpan) {
    existingSpan.style.display = 'none' // 기존의 span 태그를 일시적으로 숨김
    item.insertBefore(eInputEl, existingSpan) // input 태그를 span 태그 앞에 삽입
  } else {
    item.appendChild(eInputEl) // span 태그가 없으면 그냥 input 태그를 추가
  }

  item.classList.add('editing')
  eInputEl.focus()

  // 수정 완료 이벤트 리스너 등록
  eInputEl.addEventListener('blur', () => {
    finishEditing(item, eInputEl.value)
  })

  eInputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (e.isComposing) return
      finishEditing(item, eInputEl.value)
    }
  })

  function finishEditing(item, newText) {
    if (existingSpan) {
      existingSpan.textContent = newText
      existingSpan.style.display = '' // 텍스트 수정이 끝나면 다시 span 태그 보이도록 설정
    } else {
      const newSpan = document.createElement('span')
      newSpan.textContent = newText
      item.insertBefore(newSpan, eInputEl) // input 태그를 삭제하고 span 태그를 추가
    }

    item.classList.remove('editing')
    eInputEl.remove() // input 태그 삭제
  }
}

/**
 * Remove
 */
function addDltBtn(taskEl) {
  let dXIcon = document.createElement('i') // 변수명을 dXIcon으로 변경
  dXIcon.setAttribute('class', 'xi-close')
  taskEl.append(dXIcon)

  dXIcon.addEventListener('click', (e) => {
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
    tasks: tasksArray.map((task) => {
      const taskData = {
        content: task.querySelector('span') ? task.querySelector('span').textContent : task.textContent,
        isChecked: task.classList.contains('checked'),
      }
      return taskData
    }),
  }
  localStorage.setItem('data', JSON.stringify(data))
}

function showTask() {
  const data = JSON.parse(localStorage.getItem('data'))
  if (data && data.tasks) {
    data.tasks.forEach((task) => {
      const taskEl = document.createElement('li')
      const span = document.createElement('span')
      span.textContent = task.content

      if (task.isChecked) {
        taskEl.classList.add('checked')
      }

      taskEl.appendChild(span)
      listEl.appendChild(taskEl)
      CtlCheckbox(taskEl)
      addEditBtn(taskEl)
      addDltBtn(taskEl)
    })
  }
}
