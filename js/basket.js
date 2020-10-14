'use strict';

const basket = document.querySelector('[data-basket]'),
      modalWrapper = document.querySelector('.modal-wrapper'),
      body = document.body;

// call modal window
basket.addEventListener('click', ()=>{    
    // показ модального окна и проверка наличия продукции
    modalWrapper.classList.remove('none');
    body.style.overflow = 'hidden';
    toggleEmptyListItem();
});

// close modal
function closeModal(){
    modalWrapper.classList.add('none');
    body.style.overflow = '';
}


modalWrapper.addEventListener('click', function(e) {

    // production counter
    let productCounter = e.target.closest('.modal__item-counter');

    // Закрытие модального окна
    if (e.target.hasAttribute('data-close')){
        closeModal();
    } else 
    
     // изменение счетчика товара по нажатию по кнопке + or -
    if (e.target.hasAttribute('data-modalminus')) {
        if (productCounter.querySelector('span').textContent > 1) {
            productCounter.querySelector('span').textContent -= 1;
            toggleEmptyListItem();
        } else {
            e.target.closest('.modal__orders-item').remove();
            toggleEmptyListItem();
        }
    } else if (e.target.hasAttribute('data-modalplus')) {
        productCounter.querySelector('span').innerHTML =
        +productCounter.querySelector('span').innerHTML + 1;
        toggleEmptyListItem();
    }
});

// Добавление продукции в корзину

toggleEmptyListItem();

/*
Создадим объект, в который будут записываться данные карточки, которую мы хотить записать в корзину
при клике на кнопку "в корзину" будем пушить объект, в котором вся эта инфа и подгружать заново 
в корзину этот объект
    
    проверка наличия все так же по id, просто id брать из коллекции объектов
    
    в конце конвертируем этот объект в строку, чтобы ее сохранять в локальное хранилище.
    при вызове конветируем обратно и передаем в корзину
*/

const basketObj = [
];

let cardWrapper = document.querySelector('.modal__orders');
let cardButtons = document.querySelectorAll('[data-productBuy]');

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

        
        basketObj.push(cardItem);
        
        // if ( cardWrapper.querySelector(`[data-id="${cardItem.id}"]`) {
            
        // }

    });
});


// let cardButtons = document.querySelectorAll('[data-productBuy]');

// cardButtons.forEach(function(items, i, cardButtons){
//     items.addEventListener('click', function(){
        
//         //находим карточку, по которой кликнули
//         let card = this.closest('.restaurants__card');

//         // найдем данные карточки
//         const cardItem = {
//             title: card.querySelector('.restaurants__card-name h3').innerText,
//             price: card.querySelector('.restaurants__card-buy span').innerText,
//             id: card.getAttribute('data-id')
//         };

//         let itemInCart = cardWrapper.querySelector(`[data-id="${cardItem.id}"]`);

//         // Проверить, есть ли уже такой товар в корзине
//         if ( itemInCart ) {

//             itemInCart.querySelector('[data-modalCounter]').textContent =
//             parseInt(itemInCart.querySelector('[data-modalCounter]').textContent) + 1;
//             toggleEmptyListItem();

//         } else {

//         let cardItemHtml = `
//                 <div class="modal__orders-item" data-id='${cardItem.id}'>

//                     <span class="modal__item-name">${cardItem.title}</span>
                    
//                     <div class="modal__item-counter">
//                         <button data-modalPlus>+</button>
//                         <span data-modalCounter>1</span>
//                         <button data-modalMinus>-</button>
//                     </div>

//                     <span class="modal__item-price">${cardItem.price}</span>

//                 </div>
//              `;

//         cardWrapper.insertAdjacentHTML('beforeend', cardItemHtml);

//         toggleEmptyListItem();
//         }
//     });
// });


// проверка наличия элементов в корзине
function toggleEmptyListItem() {

    if (cardWrapper.children.length > 1) {
        document.querySelector('.modal__orders-default').style.display = 'none';
    } else {
        document.querySelector('.modal__orders-default').style.display = 'block';
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
function saveData(){
    localStorage.setItem('modal', modalWrapper.innerHTML);
}

// Выгрузка данных в localStorage
function loadData() {
    if (localStorage.getItem('modal')) {
        modalWrapper.innerHTML = localStorage.getItem('modal');
    }
}