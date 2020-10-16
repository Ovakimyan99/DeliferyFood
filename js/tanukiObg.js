// данные карточек
const productItemObg = [
    {
        imgSrc: '../img/restaurants/tanuki/eel-roll-standard-1.png',
        imgTitle: 'тайтл картинки',
        title: 'Ролл угорь стандарт',
        descr: 'Рис, угорь, соус унаги, кунжут, водоросли нори.',
        price: '250',
        id: '01'
    },
    {
        imgSrc: '../img/restaurants/tanuki/california-salmon-standard-2.png',
        imgTitle: 'тайтл картинки',
        title: 'Калифорния лосось стандарт',
        descr: 'Рис, лосось, авокадо, огурец, майонез, икра масаго, водоросли нори.',
        price: '300',
        id: '02'
    },
    {
        imgSrc: '../img/restaurants/tanuki/okinawa-standard-3.png',
        imgTitle: 'тайтл картинки',
        title: 'Окинава стандарт',
        descr: 'Рис, креветка отварная, сыр сливочный, лосось, огурец свежий; Продолжение описание товара',
        price: '310',
        id: '03'
    },
    {
        imgSrc: '../img/restaurants/tanuki/caesar-poppy-xl-4.png',
        imgTitle: 'тайтл картинки',
        title: 'Цезарь маки хl',
        descr: 'Рис, куриная грудка копченая, икра масаго, томат, айсберг, соус цезарь (70 символов) описание опписание цезаря маки хл',
        price: '320',
        id: '04'
    },
    {
        imgSrc: '../img/restaurants/tanuki/yasai-maki-standard-5.png',
        imgTitle: 'тайтл картинки',
        title: 'Ясай маки стандарт 185 г',
        descr: 'Рис, помидор свежий, перец болгарский, авокадо, огурец, айсберг',
        price: '280',
        id: '05'
    },
    {
        imgSrc: '../img/restaurants/tanuki/shrimp-roll-standard-6.png',
        imgTitle: 'тайтл картинки',
        title: 'Ролл с креветкой стандарт',
        descr: 'Рис, водоросли нори, креветки отварные, сыр сливочный, огурцы',
        price: '290',
        id: '06'
    }
];

// обертка для карточек
const productCellWrapper = document.querySelector('.restaurants__card-wrapper');

// внедряем карточки в верстку
productItemObg.forEach(function(item, i){

    /* Если длина описанного товара больше 70 символов, 
    то создаем новый блок с текстом и при наведении высвечиваени его */
    if (item.descr.length > 70) {
        let newObj = JSON.parse(JSON.stringify(productItemObg));

        item.descr = item.descr.slice(0, 70) + '...';

        callTemplate();


        let restCard = document.querySelectorAll('.restaurants__card')[i];
        restCard.insertAdjacentHTML('beforeend', `
        <div class="restaurants__card--descr-hidden">
            <h3>${item.title}</h3>
            <p>${newObj[i].descr}</p>
            <div class="restaurants__card-buy">
            <button  class="restaurants__card-btn" data-productBuy>
                В корзину <img src="../img/restaurants/shopping-cart.svg" alt="корзина">
            </button>
            <span>${item.price} ₽</span>
        </div>
        </div>
        `);
    } else {callTemplate();}


    //шаблон внедряемой карточки
    function callTemplate () {

        productCellWrapper.insertAdjacentHTML('beforeend',`
            <!-- card item ${item.title} -->
            <div class="restaurants__card" data-id='${item.id}'>

                <div class="restaurants__card-img">
                    <img src="${item.imgSrc}" alt="${item.title}" title='${item.imgTitle}'>
                </div>

                <div class="restaurants__card-info">

                    <div class="restaurants__card-name">
                        <h3>${item.title}</h3>
                        <p>${item.descr}</p>
                    </div>

                    <div class="restaurants__card-buy">
                        <button  class="restaurants__card-btn" data-productBuy>
                            В корзину <img src="../img/restaurants/shopping-cart.svg" alt="корзина">
                        </button>
                        <span>${item.price} ₽</span>
                    </div>

                </div>

            </div>
            <!-- // card item ${item.title} -->
        `);

    }

});


