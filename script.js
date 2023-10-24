let selectedElement = null;
let selectedSequence = [];

function objectClicked(element) {
  
  const tableCell = document.getElementById(element.id + '_t');
  const targetTableCellLeft = document.getElementById(element.id + '_t');
  const targetTableCellRight = document.getElementById(element.id + '_t_r');

  if (selectedElement === null) {
    
    selectedElement = element;
    element.classList.add('selected');
    selectedSequence.push(element.id);
  } else {
    if (selectedElement.id === element.id) {

      if (element.classList.contains('pushed')) {
        
        const selectedValue = selectedElement.innerText;
        tableCell.innerText = '';

        targetTableCellLeft.innerText = selectedValue;
        targetTableCellRight.innerText = '';

        
      } else {

        const selectedValue = selectedElement.innerText;
        tableCell.innerText = '';
        targetTableCellRight.innerText = selectedValue;
        targetTableCellLeft.innerText = '';
      }

      element.classList.toggle('pushed');
      selectedElement.classList.remove('selected');
      selectedElement = null;
    } else {

      const previousTableCellLeft = document.getElementById(selectedElement.id + '_t_l');
      const previousTableCellRight = document.getElementById(selectedElement.id + '_t_r');
      
      previousTableCellLeft.innerText = '';
      previousTableCellRight.innerText = '';

      selectedElement.classList.remove('selected');
      selectedElement = element;
      element.classList.add('selected');
    }

    if(
      document.getElementById('goat').classList.contains('pushed') && document.getElementById('wolf').classList.contains('pushed')
      || (document.getElementById('goat').classList.contains('pushed') &&  document.getElementById('cabbage').classList.contains('pushed'))) {
      alert('Кто-то кого-то съест, но мы можем это изменить :)')
    }
  }
}


// Проверяет правильность выбранной последовательности, а также отправляем answer
function checkSequence() {
  const correctSequence_1 = ['goat', 'wolf', 'goat', 'cabbage', 'goat'];
  const correctSequence_2 = ['goat', 'cabbage', 'goat', 'wolf','goat'];
 
  if (JSON.stringify(selectedSequence) === JSON.stringify(correctSequence_1))  {
    alert('Да, ты молодец')
  }
  else if (JSON.stringify(selectedSequence) === JSON.stringify(correctSequence_2)) {
    alert('Да, ты молодец')
  } 
  else {
    alert('Придется подумать ещё разок)')
  }
  let xhr = new XMLHttpRequest()
  let url = 'save-answer.php'
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  const answer = selectedSequence
  let data = 'answer=' + encodeURIComponent(answer) 
  xhr.send(data)
  console.log(data)
  resetSelection()
  
  fetch('save-answer.php', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'answer=' + answer
    })
    .then(response => response.json())
    .then(data => {
    if (data.status === 'success') {
    console.log('Успешный запрос на базу данных:', data.message);
    } else {
    console.error('Ошибка запроса на базу данных:', data.message);
    }
    })
    .catch(error => {
    console.error('Ошибка при отправке запроса:', error);
    });
}
  

// Сбрасывает выбор и состояние
function resetSelection() {
  items.forEach((item) => {
    item.classList.remove('selected');
  });
  selectedElement = null;
  selectedSequence = [];
}

// Добавляем обработчик клика на каждый объект
const items = document.querySelectorAll('.item');
items.forEach((item) => {
  item.addEventListener('click', function () {
    objectClicked(this);
  });
})


function changeVar() {

}
