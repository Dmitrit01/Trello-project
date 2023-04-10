//Событие на todoFooter
import {createElement} from "./createElement.js";
import { bodyElement,modalWindow,root,doneMain } from "../script.js";
import { checkCountComponents } from "./checkCountComponents.js";
export function showModal(){
    modalWindow.classList.add('modal__visible');//-------------------------------------------Модальное окно ниже создано
    bodyElement.classList.add('lock');//----------------------------------------------------Добавляем lock на body
}
//Навешиваем событие на cancel
export function cancelModal(){
    modalWindow.classList.remove('modal__visible');
    bodyElement.classList.remove('lock');
}
//Ф-ция которая создает окно для редактирования================================================================================================
export function editHelpModalWindow(event){
    // modalWindow
    const modalWindowEdit = createElement('div',{classList:'modal modal__visible'});//-----------------------------------------------создаем элемент modalWindow
    root.insertAdjacentElement('afterend',modalWindowEdit);//---------------------------------------------------------указываем позицию для modalWindow
    //modalBody
    const modalBodyEdit = createElement('div',{classList:'modal__body'});//-------------------------------------------создаем элемент modalBody
    modalWindowEdit.insertAdjacentElement('afterbegin',modalBodyEdit);//--------------------------------------------------указываем позицию для modalBody
    //modalForm
    const modalFormEdit = createElement('div',{classList:'modal__form'});//-------------------------------------------создаем элемент modalForm
    modalBodyEdit.insertAdjacentElement('afterbegin',modalFormEdit);//----------------------------------------------------указываем позицию для modalForm
    //modalTitle
    const modalTitleEdit = createElement('input',{classList:'modal__title',placeholder:'Title'});//-------------------создаем элемент modalTitle
    modalFormEdit.insertAdjacentElement('beforeend',modalTitleEdit);//----------------------------------------------------указываем позицию для modalTitle
    //textarea
    const textAreaEdit = createElement('textarea',{classList:'modal__textarea',placeholder:'Descripion'});//----------создаем элемент textarea
    modalFormEdit.insertAdjacentElement('beforeend',textAreaEdit);//------------------------------------------------------указываем позицию для textarea
    //footer
    const footerEdit = createElement('footer',{classList:'modal__footer'});//---------------------------------------создаем элемент footer
    modalFormEdit.insertAdjacentElement('beforeend',footerEdit);//------------------------------------------------------указываем позицию для footer
    //select
    const selectEdit = createElement('select',{classList:'modal__select'});//---------------------------------------создаем элемент select
    footerEdit.insertAdjacentElement('beforeend',selectEdit);//------------------------------------------------------указываем позицию для select
    //Cоздаем список пользователей
    selectEdit.innerHTML=`<option>User 01</option>
                    <option>User 02</option>
                    <option>User 03</option>
                    <option>User 04</option>
                    <option>User 05</option>`
    //modalButtons                  
    const modalButtonsEdit = createElement('div',{classList:'modal__buttons'});//--------------------------создаем элемент footer
    footerEdit.insertAdjacentElement('beforeend',modalButtonsEdit);//---------------------------------------------указываем позицию для footer
    //cancel
    const cancelEdit = createElement('button',{classList:'modal__cancel',textContent:'cancel'});//------------создаем элемент cancel
    modalButtonsEdit.insertAdjacentElement('beforeend',cancelEdit);//---------------------------------------------указываем позицию для cancel
    //confirm
    const confirmEdit = createElement('button',{classList:'modal__confirm',textContent:'confirm'});//---------создаем элемент confirm
    modalButtonsEdit.insertAdjacentElement('beforeend',confirmEdit);//------------указываем позицию для confirm
    //Навешиваем событие на confirm
    function editComponent(){
        event.target.closest('.component__buttons').previousElementSibling.textContent = `${modalTitleEdit.value === ''?'Title':modalTitleEdit.value}`;
        event.target.closest('.component__header').nextElementSibling.firstChild.textContent = `${textAreaEdit.value === ''?'Description':textAreaEdit.value}`;
        event.target.closest('.component').lastChild.firstChild.textContent = `${selectEdit.value}`;
        modalWindowEdit.remove();
        bodyElement.classList.remove('lock');
        // Работа с localeStorage
        let ID = 0;
        ID = event.target.closest('.component__header').previousElementSibling.value;
        let saveEditId = JSON.parse(localStorage.getItem(ID));
        saveEditId.title = `${modalTitleEdit.value === ''?'Title':modalTitleEdit.value}`;  
        saveEditId.descr = `${textAreaEdit.value === ''?'Description':textAreaEdit.value}`;
        saveEditId.user =  `${selectEdit.value}`;
        console.log(ID);
        localStorage.setItem(ID,JSON.stringify(saveEditId));
    }
    confirmEdit.addEventListener('click',editComponent)
    //Навешиваем событие на cancel
    function cancelModalEdit(){
        modalWindowEdit.remove();
        bodyElement.classList.remove('lock');
    }
    cancelEdit.addEventListener('click',cancelModalEdit)
}
//Функция окно-warning===================================================================================================
export function windowWarning(moveToProgress){
    const warning = createElement('div',{classList:'warning'});
    root.insertAdjacentElement('afterend',warning);
    //warningBody
    const warningBody = createElement('div',{classList:'warning__body'});
    warning.insertAdjacentElement('beforeend',warningBody);
    //warningTitle
    const warningTitle = createElement('h2',{classList:'warning__title',textContent:'Warning! Больше 6 дел нежелательно добавлять в прогресс'});
    warningBody.insertAdjacentElement('beforeend',warningTitle);
    //warningButtons
    const warningButtons=createElement('div',{classList:'warning__buttons'});
    warningBody.insertAdjacentElement('beforeend',warningButtons);
    //warningCancel
    const warningCancel = createElement('button',{classList:'warning__cancel',textContent:'cancel'});
    warningButtons.insertAdjacentElement('beforeend',warningCancel);
    warningCancel.addEventListener('click', function(){warning.remove()});
    //warningConfirm
    const warningConfirm = createElement('button',{classList:'warning__confirm',textContent:'confirm'});
    warningButtons.insertAdjacentElement('beforeend',warningConfirm);
    warningConfirm.addEventListener('click',()=>{moveToProgress(),warning.remove()});
}
//Функция окно-warning2 Связанная с delete all===================================================================================================
export function windowWarning2(){
    const warning2 = createElement('div',{classList:'warning'});
    root.insertAdjacentElement('afterend',warning2);
    //warningBody
    const warningBody2 = createElement('div',{classList:'warning__body'});
    warning2.insertAdjacentElement('beforeend',warningBody2);
    //warningTitle
    const warningTitle2 = createElement('h2',{classList:'warning__title',textContent:'Вы уверенны что хотите удалить все дела?'});
    warningBody2.insertAdjacentElement('beforeend',warningTitle2);
    //warningButtons
    const warningButtons2=createElement('div',{classList:'warning__buttons'});
    warningBody2.insertAdjacentElement('beforeend',warningButtons2);
    //warningCancel
    const warningCancel2 = createElement('button',{classList:'warning__cancel',textContent:'cancel'});
    warningButtons2.insertAdjacentElement('beforeend',warningCancel2);
    warningCancel2.addEventListener('click', function(){warning2.remove()});
    //warningConfirm
    const warningConfirm2 = createElement('button',{classList:'warning__confirm',textContent:'confirm'});
    warningButtons2.insertAdjacentElement('beforeend',warningConfirm2);
    function deleteComponentsDone(){
        //Работа с localeStorage
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = JSON.parse(localStorage.getItem(key));
            if(value.place === 'Done'){
                localStorage.removeItem(key);
             }
        }
        let arrayDone = doneMain.children;
        for(let i=0;i<arrayDone.length;i){
            arrayDone[i].remove();
        }
        checkCountComponents();
        warning2.remove();
    }
    warningConfirm2.addEventListener('click',deleteComponentsDone);
}