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
// перевод массива cookie в объект
const cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');

    prev[name] = value;

    return prev;
}, {});

for (let key in cookies) {
    addToTable(key, cookies[key]);
}

filterNameInput.addEventListener('keyup', function() {
    let allTrs = listTable.children,
        filterValue = filterNameInput.value.trim();

    if (filterValue) {
        for (let i = 0; i < allTrs.length; i++) {
            checkFilter(allTrs[i]);
        }
    } else {
        for (let i = 0; i < allTrs.length; i++) {
            allTrs[i].style.display = '';
        }
    }
});

addButton.addEventListener('click', () => {
    let name = addNameInput.value;
    let value = addValueInput.value;

    if (getCookie(name)) {
        setCookie(name, value);
        editInTable(name, value);
    } else {
        setCookie(name, value);
        addToTable(name, value);
    }

    addNameInput.value = '';
    addValueInput.value = '';
});

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
function addToTable(name, value) {
    let tr = createTr(name, value);

    checkFilter(tr);
    listTable.appendChild(tr);
}
function editInTable(name, value) {
    let tr = listTable.querySelector(`tr[data-name='${name}']`);

    tr.firstElementChild.nextElementSibling.textContent = value;
    checkFilter(tr);
}
function checkFilter(tr) {
    let filterValue = filterNameInput.value.trim();

    if (filterValue) {
        if (getTrName(tr).indexOf(filterValue) < 0 && getTrValue(tr).indexOf(filterValue) < 0) {
            tr.style.display = 'none';

            return;
        }
    }
    tr.style.display = '';
}
function getTrName(tr) {
    return tr.firstElementChild.textContent;
}
function getTrValue(tr) {
    return tr.firstElementChild.nextElementSibling.textContent;
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
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}