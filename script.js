/*Объект prod */
/* Гетеры и сетеры - get(возвращает значение свойства, нельзя передавать параметры)
set - устанавливает свойства и его значение  */
/* метод это функция внутри объекта */

const prod = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.amount * this.kcall;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 500,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.amount * this.kcall;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 900,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.amount * this.kcall;
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        kcall: 100,
        price: 200,
        name: 'Двойной майонез'
    },
    lettuce: {
        kcall: 10,
        price: 500,
        name: 'Салатный лист'
    },
    cheese: {
        kcall: 150,
        price: 800,
        name: 'Сыр'
    }
}

/* получаем все кнопки +/- */
const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
// console.log(btnPlusOrMinus);

/* получаем все чекбоксы */
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');


for(let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function() {
        plusOrMinus(this);
    })
}

/* .closest() - находит(возвращает) ближайший указаный родитель */
/* .getAttribute('id') - метод возвращает значение указанного атрибута */

function plusOrMinus(btn) {
    const parent = btn.closest('.main__product');
    const parentId = parent.getAttribute('id'); /* получает id родителя */
    const count = parent.querySelector('.main__product-num'); /* получает поле для кол-ва товара */
    const kcall = parent.querySelector('.main__product-kcall span'); /* получаем поле для каллорий */
    const btnSymbol = btn.getAttribute('data-symbol'); /* получаем символ +/- */
    const price = parent.querySelector('.main__product-price span'); /* ПОлучаем поле общей суммы */

    if(btnSymbol == '+') {
        prod[parentId].amount++;/* увеличиваем кол-во товара в ключе amount */
    }
    else if(btnSymbol == '-') {
        if(prod[parentId].amount <= 0) {
            prod[parentId].amount = 0;
        }
        else{
            prod[parentId].amount--; /* уменьшаем кол-во товара в ключе amount */
        }
    }

    count.innerHTML = prod[parentId].amount;
    kcall.innerHTML = prod[parentId].Kcall;
    price.innerHTML = prod[parentId].Sum;

}



for(let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function () {
        addExtraProduct(this);
    })
}


function addExtraProduct(check) {
    const parent = check.closest('.main__product');
    const parentId = parent.getAttribute('id');
    const price = parent.querySelector('.main__product-price span');
    const kcall = parent.querySelector('.main__product-kcall span');
    const checkExtra = check.getAttribute('data-extra');
    prod[parentId][checkExtra] = check.checked; /* добавляем ключ доп товара( сыр) в ключ plain burger объекта prod       false / true */
    if(prod[parentId][checkExtra] === true) {
        prod[parentId].price += extraProduct[checkExtra].price; /* Добавляем цену доп продукта к цене бургера */
        prod[parentId].kcall += extraProduct[checkExtra].kcall; /* Добавляем каллории доп продукта к цене бургера */
    }
    else{
        prod[parentId].price -= extraProduct[checkExtra].price;
        prod[parentId].kcall -= extraProduct[checkExtra].kcall;
    }

    price.innerHTML = prod[parentId].Sum; /* Перезапись содержимое поля суммы */
    kcall.innerHTML = prod[parentId].Kcall; /* Перезапись содержимое поля каллорий*/
}


const lvlUp = document.querySelector('.header__timer-extra');
const lvl = document.querySelector('.header__timer-lvl');

// console.log(lvlUp);

    function extraTimerStart() {
        if(lvlUp.innerHTML <= 50) {
            lvlUp.innerHTML++;
            timer = setTimeout(extraTimerStart, 50);
        }
        else if(lvlUp.innerHTML > 50 && lvlUp.innerHTML < 100) {
            lvlUp.innerHTML++;
            timer = setTimeout(extraTimerStart, 75);
        }
        // else {
        //     lvlUp.innerHTML = 100;
        // }

        // if(lvlUp.innerHTML = 50) {
        //     clearTimeout(timer);
        // }
        // if(lvlUp.innerHTML < 100) {
        //     lvlUp.innerHTML++;
        // }
    }
    extraTimerStart();


// 

let arrayProduct = [];
let totalPrice = 0;
let totalName = '';
let totalKcall = 0;


/* Получаем ссылки для вывода продуктов для пользователя */
const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const receiptWindowOut = document.querySelector('.receipt__window-out');
const receiptBtn = document.querySelector('.receipt__window-btn');



addCart.addEventListener('click', function() {
    for(let key in prod) {
        const po = prod[key];
        
        if(po.amount > 0) {
            arrayProduct.push(po);
            for(let newKey in po) {
                if(po[newKey] === true) {
                    po.name += '\n' + extraProduct[newKey].name; /* '\n ' - экраннирование(перенос строки на след строчку)*/
                    
                }
            }
        }

        po.price = po.Sum;
        po.kcall = po.Kcall;  
    }

    for(let i = 0; i < arrayProduct.length; i++) {
        const obj = arrayProduct[i];

        totalName += '\n' + obj.name + '\n';
        totalPrice += obj.price;
        totalKcall += obj.kcall;
    }

    receiptWindowOut.innerHTML = `Вы заказали: \n ${totalName} \n Каллорийность ${totalKcall} \n Стоимость заказа ${totalPrice} сум `;

    receipt.style.display = 'flex'; 
    setTimeout(function() {
        receipt.style.opacity = '1'; 
        receiptWindow.style.top = '0';

    }, 200);


    // receiptBtn.addEventListener('click', function () {
    //     location.reload();
    // })
});




const info = document.querySelectorAll('.main__product-info');
const closeBtn = document.querySelector('.view__close');
const view = document.querySelector('.view');
const viewImg = document.querySelector('img')
const img = document.querySelector('.imgZoom');
const exitCheck = document.querySelector('.check__close');




console.log(exitCheck); 


for(let i = 0; i < info.length; i++) {
    info[i].addEventListener('dblclick' , function () {
        console.log(info[i].querySelector('img'));
        srcImg = info[i].querySelector('img').getAttribute('src');
        viewSrc = img.setAttribute('src', srcImg);
        console.log(viewSrc);
        view.classList.add('active');
        closeBtn.addEventListener('click' , function () {
            view.classList.remove('active');
        });
    })
    exitCheck.addEventListener('click', function () {
        location.reload();
    });
}

// const img = document.querySelector('.imgZoom');
// const imgZoom = img.getAttribute(src);



