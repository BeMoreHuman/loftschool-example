/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

addToTable();
filterNameInput.addEventListener('keyup', function () {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    addToTable();
});
addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    addToTable();
});

function getCookie() {
    return document.cookie.split('; ').reduce((previous, current) => {
        const [name, value] = current.split('=');

        previous[name] = value;

        return previous;
    }, {})
}
function createTr(name, value) {
    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdValue = document.createElement('td');
    let tdDelete = document.createElement('td');
    let btnDeleteCookie = document.createElement('button');

    btnDeleteCookie.textContent = 'удалить cookie';
    btnDeleteCookie.classList.add('remove-button');
    tdName.textContent = name;
    tdValue.textContent = value;
    tr.dataset.name = name;

    btnDeleteCookie.addEventListener('click', () => {
        tr.remove();
        deleteCookie(name);
    });

    tdDelete.appendChild(btnDeleteCookie);

    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdDelete);

    return tr;
}
function addToTable() {
    listTable.innerHTML = '';

    const cookieObj = getCookie();
    let filterValue = filterNameInput.value.trim();

    if (document.cookie === '') {
        return;
    }
    for (const cookie in cookieObj) {
        if (cookie in cookieObj && (cookie.indexOf(filterValue) >= 0 || cookieObj[cookie].indexOf(filterValue) >= 0)) {
            let tr = createTr(cookie, cookieObj[cookie]);

            listTable.appendChild(tr);
        }
    }
}
function deleteCookie(name) {
    setCookie(name, '', {
        expires: -1
    })
}
function setCookie(name, value, options) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires === 'number' && expires) {
        let d = new Date();

        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + '=' + value;

    for (let propName in options) {
        updatedCookie += '; ' + propName;
        let propValue = options[propName];

        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }

    document.cookie = updatedCookie;
}
