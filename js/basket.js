'use strict';

const basket = document.querySelector('[data-basket]'),
      modalWrapper = document.createElement('div'),
      body = document.body;

// Загрузка


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

            <!-- item default -->
            <div class="modal__orders-default">
                <p>Корзина пуста</p>
            </div>
            <!-- // item default -->

        </div>
        <!-- // product list -->

        <div class="modal__footer">
            <div class="modal__sum">0 ₽</div>
            <div class="modal__footer-buttons">
                <button class="modal__checkout">Оформить заказ</button>
                <button class="modal__canceling" data-close>Отмена</button>
            </div>
        </div>

    </div>
`);
// if (document.querySelector('modal-wrapper'))
body.append(modalWrapper);

// call modal window
basket.addEventListener('click', ()=>{    
    // показ модального окна и проверка наличия продукции
    modalWrapper.classList.remove('none');
    body.style.overflow = 'hidden';
    toggleEmptyListItem();  

    // загрузка данных из LocalStoresh
    
});

// close modal and save data
function closeModal(){
        toggleEmptyListItem();
        modalWrapper.classList.add('none');
        body.style.overflow = '';
        
}


modalWrapper.addEventListener('click', function(e) {
    // Закрытие модального окна
    if (e.target.hasAttribute('data-close')){
        closeModal();
    } else 
    
    // production counter // изменение счетчика товара по нажатию по кнопке + or -
    if (e.target.hasAttribute('data-modalminus')) {
        if (e.target.closest('.modal__item-counter').querySelector('span').textContent > 1) {
            e.target.closest('.modal__item-counter').querySelector('span').textContent -= 1;
            toggleEmptyListItem();
        } else {
            e.target.closest('.modal__orders-item').remove();
            toggleEmptyListItem();
            
        }
    } else if (e.target.hasAttribute('data-modalplus')) {
        e.target.closest('.modal__item-counter').querySelector('span').innerHTML =
        +e.target.closest('.modal__item-counter').querySelector('span').innerHTML + 1;
        toggleEmptyListItem();
    }
});

// Добавление продукции в корзину
let cardWrapper = document.querySelector('.modal__orders');
let cardButtons = document.querySelectorAll('[data-productBuy]');

toggleEmptyListItem();

cardButtons.forEach(function(items, i, cardButtons){
    items.addEventListener('click', function(){
        
        //находим карточку, по которой кликнули
        let card = this.closest('.restaurants__card');

        // найдем данные карточки
        const cardItem = {
            title: card.querySelector('.restaurants__card-name h3').innerText,
            price: card.querySelector('.restaurants__card-buy span').innerText,
            id: card.getAttribute('data-id')
        };

        let itemInCart = cardWrapper.querySelector(`[data-id="${cardItem.id}"]`);
        console.log(itemInCart);

        // console.log(cardItem.imgSrc, cardItem.title , cardItem.itemsInBox, cardItem.weight, cardItem.price , cardItem.counter, cardItem.id);

        
        // Проверить, есть ли уже такой товар в корзине
        if ( itemInCart ) {
            // card.querySelector('[data-modalCounter]').textContent = parseInt(card.querySelector('[data-modalCounter]').textContent) + 1;
            itemInCart.querySelector('[data-modalCounter]').textContent = +itemInCart.querySelector('[data-modalCounter]').textContent + 1;
            toggleEmptyListItem();
            
            
        } else {
            // cardItem.id = card.getAttribute('data-id');

            let cardItemHtml = `
            <div class="modal__orders-item" data-id='${cardItem.id}'>

                <span class="modal__item-name">${cardItem.title}</span>
                
                <div class="modal__item-counter">
                    <button data-modalPlus>+</button>
                    <span data-modalCounter>1</span>
                    <button data-modalMinus>-</button>
                </div>

                <span class="modal__item-price">${cardItem.price}</span>

            </div>
             `;

        cardWrapper.insertAdjacentHTML('beforeend', cardItemHtml);

        toggleEmptyListItem();
        
        }
        
    });
});


// проверка наличия элементов в корзине
function toggleEmptyListItem() {

    if (cardWrapper.children.length > 1) {
        document.querySelector('.modal__orders-default').style.display = 'none';
        console.log('скрываем дефолтный блок');
    } else {
        document.querySelector('.modal__orders-default').style.display = 'block';
        // console.log(document.querySelector('.modal__orders-default'));
    }

    // подсчет стоимости продукции
    let totalPrice = 0;

    cardWrapper.querySelectorAll('.modal__orders-item').forEach(function(item, i){
        let counter = item.querySelector('[data-modalCounter]').innerText;
        let priceOneItem = item.querySelector('.modal__item-price').innerText;
        let price = parseInt(counter) * parseInt(priceOneItem);

        totalPrice = totalPrice + price;
    });

    document.querySelector('.modal__sum').innerText = totalPrice + ' ₽';
}

// сохранение данных в localStorage
// function saveData(){
//     localStorage.setItem('modal', modalWrapper.innerHTML);
// }

// Выгрузка данных в localStorage
// function loadData() {
//     if (localStorage.getItem('modal')) {
//         modalWrapper.innerHTML = localStorage.getItem('modal');
//     }
// }