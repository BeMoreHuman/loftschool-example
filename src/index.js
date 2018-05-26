/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    let sec = seconds * 1000;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, sec)
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';
        xhr.send();
        xhr.addEventListener('load', () => {
            if (xhr.status >= 400) {
                // console.log('что-то пошло не так');
            } else {
                // console.log('load');
                // console.log(xhr);
                const towns = xhr.response;

                towns.sort(function sortTowns(TownA, TownB) {
                    if (TownA.name < TownB.name) {
                        return -1;
                    }
                    if (TownA.name > TownB.name) {
                        return 1;
                    }

                    return 0;
                });

                resolve(towns);
            }
        });
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
