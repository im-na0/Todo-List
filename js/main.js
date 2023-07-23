/**
 * Unique Number Counter
 */
let counter = 0;

function getUniqueID() {
  return `id-${counter++}`;
}

/**
 * Create Input & add button
 */
const inputEl = document.getElementById('input'); // 지역변수로 바꾸기!!!!!!!!!
const addBtnEl = document.getElementById('addBtn'); // 지역변수로 바꾸기!!!!!!!
addBtnEl.addEventListener('click', () => {
  onClick();
});
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (e.isComposing) return; // keydown 이슈방지
    onClick();
  }
});

function onClick() {
  const listEl = document.querySelector('.todo-list');
  const taskEl = document.createElement('li');
  // 할 일 추가 + 고유 번호 클래스명
  const className = getUniqueID();
  taskEl.classList.add(className);
  taskEl.textContent = inputEl.value;

  listEl.appendChild(taskEl);
  // input 초기화
  inputEl.value = null;

  // checkbox생성 함수호출
  AddCheckBox(taskEl);

  // remove button생성 함수호출
  AddDltBtn(taskEl, listEl, className);
}

/**
 * Checkbox
 */
function AddCheckBox(taskEl) {
  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  taskEl.prepend(checkBox);
}

/**
 * Remove button
 */
function AddDltBtn(taskEl, listEl, ClassName) {
  // remove button 생성
  const dltBtn = document.createElement('input');

  dltBtn.setAttribute('type', 'button');
  dltBtn.setAttribute('value', 'x');

  taskEl.append(dltBtn);

  // Delete Elements Event
  dltBtn.addEventListener('click', () => {
    const dltEl = listEl.querySelector(`.${ClassName}`);
    dltEl.remove();
  });
}
