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
        descr: 'Рис, креветка отварная, сыр сливочный, лосось, огурец свежий...',
        price: '310',
        id: '03'
    },
    {
        imgSrc: '../img/restaurants/tanuki/caesar-poppy-xl-4.png',
        imgTitle: 'тайтл картинки',
        title: 'Цезарь маки хl',
        descr: 'Рис, куриная грудка копченая, икра масаго, томат, айсберг, соус цезарь...',
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

    //шаблон карточки
    productCellWrapper.insertAdjacentHTML('beforeend',`
        <!-- card item ${productItemObg[i].title} -->
        <div class="restaurants__card" data-id='${productItemObg[i].id}'>

            <div class="restaurants__card-img">
                <img src="${productItemObg[i].imgSrc}" alt="${productItemObg[i].title}" title='${productItemObg[i].imgTitle}'>
            </div>

            <div class="restaurants__card-info">

                <div class="restaurants__card-name">
                    <h3>${productItemObg[i].title}</h3>
                    <p>${productItemObg[i].descr}</p>
                </div>

                <div class="restaurants__card-buy">
                    <button  class="restaurants__card-btn" data-productBuy>
                        В корзину <img src="../img/restaurants/shopping-cart.svg" alt="корзина">
                    </button>
                    <span>${productItemObg[i].price} ₽</span>
                </div>

            </div>

        </div>
        <!-- // card item ${productItemObg[i].title} -->
    `);

});