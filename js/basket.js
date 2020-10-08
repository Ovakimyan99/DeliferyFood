'use strict';

const basket = document.querySelector('[data-basket]'),
      modalWrapper = document.createElement('div'),
      body = document.body;

// Загрузка
loadData();

// Create modal
modalWrapper.classList.add('modal-wrapper', 'none');

modalWrapper.insertAdjacentHTML('afterBegin', `
    <div class="modal">
        <div class="modal__heading">
            <span>Корзина</span>
            <button class="modal__circle" data-close></button>
        </div>

        <!-- product list -->
        <div class="modal__orders">

            <!-- first item  -->
            <div class="modal__orders-item">

                <span class="modal__item-name">Ролл угорь стандарт</span>
                
                <div class="modal__item-counter">
                    <button data-modalPlus>+</button>
                    <span data-modalCounter>1</span>
                    <button data-modalMinus>-</button>
                </div>

                <span class="modal__item-price">250 ₽</span>

            </div>
            <!-- // first item -->

            <!-- second item  -->
            <div class="modal__orders-item">

                <span class="modal__item-name">Ролл угорь стандарт 2</span>
                
                <div class="modal__item-counter">
                    <button data-modalPlus>+</button>
                    <span data-modalCounter>1</span>
                    <button data-modalMinus>-</button>
                </div>
                
                <span class="modal__item-price">250 ₽</span>

            </div>
            <!-- // second item -->

            <!-- item default -->
            <div class="modal__orders-default">
                <p>Корзина пуста</p>
            </div>
            <!-- // item default -->

        </div>
        <!-- // product list -->

        <div class="modal__footer">
            <div class="modal__sum">1200 ₽</div>
            <div class="modal__footer-buttons">
                <button class="modal__checkout">Оформить заказ</button>
                <button class="modal__canceling" data-close>Отмена</button>
            </div>
        </div>

    </div>
`);

body.append(modalWrapper);

// call modal window
basket.addEventListener('click', ()=>{
    console.log('open');
    // показ модального окна и проверка наличия продукции
    modalWrapper.classList.remove('none');
    body.style.overflow = 'hidden';
    toggleEmptyListItem();  

    // загрузка данных из LocalStoresh
    loadData();
});

// close modal and save data
function closeModal(e){

    toggleEmptyListItem();  
    console.log(document.querySelector('.modal__orders').children.length);
    
    if (e.target.hasAttribute('data-close')){
        console.log('close');
        modalWrapper.classList.add('none');
        saveData();
    }
  
}

modalWrapper.addEventListener('click', closeModal);


// проверка наличия элементов в корзине
function toggleEmptyListItem() {

    if (document.querySelector('.modal__orders').children.length > 1) {
        document.querySelector('.modal__orders-default').style.display = 'none';
    } else {
        document.querySelector('.modal__orders-default').style.display = 'block';
    }
}

// сохранение данных в localStorage
function saveData(){
    localStorage.setItem('modal', modalWrapper.innerHTML);
}

// Выгрузка данных в localStorage
function loadData() {
    if (localStorage.getItem('modal')) {
        modalWrapper.innerHTML = localStorage.getItem('modal');
    }
}