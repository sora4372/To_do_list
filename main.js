const items = document.querySelector('.items');
const form = document.querySelector('.new-form');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_icon');

form.addEventListener('submit' , event=>{
  event.preventDefault();
  onAdd();
})

function onAdd(){
  //1. 사용자가 입력한 텍스를 받아옴
  const text = input.value;
  // console.log(text);
  if(input.value === ''){
    input.focus();
    return;
  }

  //2. 받아온 텍스트를 이용해 새로운 아이템을 만든다
  //(텍스트 + 삭제 버튼)
  const item = createItem(text);
  //3. items의 컨테이너 안에 새로만든 아이템 추가
  items.appendChild(item);
  //4. 새로 추가된 아이템으로 스르콜링
  item.scrollIntoView({block : 'center'});
  //5. 입력한 textinput을 초기화한다.
  input.value = '';
  input.focus();
}

let id = 0;  //UUID

function createItem(text){
    //1. 입력받은 텍스트를 ul에 추가한다.

  const itemrow = document.createElement('li');
  itemrow.setAttribute('class','item_row');
  itemrow.setAttribute('data-id' , id);

  itemrow.innerHTML = `
                  <div class="item">
                    <span class="item_name">${text}</span>
                    <button class="item_delete">
                      <i class="far fa-trash-alt" data-id = ${id}></i>
                    </button>
                  </div>
                  <div class="divider"></div>`;
          id++;
  return itemrow;
}

addBtn.addEventListener('click',()=>{
  onAdd();
});

//keypress는 input에 사용되는 모든 press를 잡아오므로
//콜백함수에 event를 받아와서 어떤 key가 press됬는지 구분함

input.addEventListener('keypress',(event) => {
  if(event.key === 'Enter'){
    onAdd();
  }
});

items.addEventListener('click',event =>{
  const id = event.target.dataset.id;
  if (id) {
    const tobeDeleted = document.querySelector(`.item_row[data-id = "${id}"]`);
    tobeDeleted.remove();
    input.focus();
  }
});