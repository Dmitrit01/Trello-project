import {createElement} from "./modules/createElement.js";
import { checkCountComponents } from "./modules/checkCountComponents.js";
import {moveTodoAccordion,moveProgressAccordion,moveDoneAccordion} from "./modules/accordion.js";
import {showModal,cancelModal,windowWarning2} from "./modules/modalWindow.js";
import { addComponent } from "./modules/addComponent.js";
import { addComponentsFromLocaleStorage } from "./modules/localeStorage.js"; 

export const bodyElement = document.body; // добавляем bodyElement
//root******************************************************************************************************************************************
export const root = document.getElementById('root');//------------------------------------------------находим div c id='root'
//application
export const application = createElement('div',{classList:'application'});//---------------------------создаем element application
root.insertAdjacentElement('afterbegin',application);//-----------------------------------------указываем позицию для application

//header****************************************************************************************************************************************
export const header = createElement('header',{classList:'header'});//----------------------------------создаем элемент header
application.insertAdjacentElement('afterbegin',header);//---------------------------------------указываем позицию для header

export const headerTitle = createElement('h1',{classList:'header__title',textContent:'Trello'});//-----создаем элемент headerTitle
export const headerTime = createElement('div',{classList:'header__time'});//---------------------------создаем элемент headerTime

setInterval(()=>{//----------------------------------------------------------------------------создаем время
    const time = new Date();
    const hours = time.getHours();
    const minuts = time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes();
    const seconds = time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds();
    headerTime.innerHTML = `${hours}.${minuts}.${seconds}`;
},1000);

header.insertAdjacentElement('afterbegin',headerTime);//----------------------------------------указываем позицию для headerTime
header.insertAdjacentElement('afterbegin',headerTitle);//---------------------------------------указываем позицию для headerTitle

//box***********************************************************************************************************************************************
export const box = createElement('div',{classList:'box'});//-------------------------------------------создаем элемент box
application.insertAdjacentElement('beforeend',box);//-------------------------------------------указываем позицию для box
//Cоздаем колонки в box

//todo колонка=========================================================================================================================================
export const todo = createElement('div',{classList:'box__item todo'});//-------------------------------cоздаем элемент todo
box.insertAdjacentElement('beforeend',todo);//--------------------------------------------------указываем позицию для todo
export const todoTop = createElement('header',{classList:'todo__top'});//------------------------------создаем элемент todoTop
todo.insertAdjacentElement('afterbegin',todoTop);//---------------------------------------------указываем позицию для todoTop

//Вставляем элементы в todoTop
export const todoTopTitle = createElement('h2',{classList:'todo__top-title',textContent:'TODO'});//----создаем элемент todoTopTitle
export const todoTopNumber = createElement('div',{classList:'todo__top-number',textContent:0});//------создаем элемент todoTopNumber

export const todoAccordion = createElement('div',{classList:'todo__accordion'});//---------------------создаем todoAccordion

todoAccordion.addEventListener('click',moveTodoAccordion);
//img в todoAccordion
export const todoAccordionImg = createElement('img',{classList:'todo__accordion__img'});
todoAccordionImg.setAttribute('src','img/arrow.png');
todoAccordion.insertAdjacentElement('beforeend',todoAccordionImg);

todoTop.insertAdjacentElement('beforeend',todoTopTitle);//--------------------------------------указываем позицию для todoTopTitle
todoTop.insertAdjacentElement('beforeend',todoTopNumber);//-------------------------------------указываем позицию для todoTopNumber
todoTop.insertAdjacentElement('beforeend',todoAccordion);//-------------------------------------указываем позицию для todoAccordion

//todoMain
export const todoMain = createElement('main',{classList:'todo__main'});//------------------------------cоздаем элемент todoMain
todo.insertAdjacentElement('beforeend',todoMain);//---------------------------------------------указываем позицию для todoMain

//todoFooter
export const todoFooter= createElement('footer',{classList:'todo__footer',textContent:'Add'});//-------cоздаем элемент todoFooter
todo.insertAdjacentElement('beforeend',todoFooter);//-------------------------------------------указываем позицию для todoFooter
//Событие на todoFooter
todoFooter.addEventListener('click',showModal);

//progress колонка======================================================================================================================================
export const progress = createElement('div',{classList:'box__item progress'});//-----------------------cоздаем элемент progress
box.insertAdjacentElement('beforeend',progress);//----------------------------------------------указываем позицию для progress

export const progressTop = createElement('header',{classList:'progress__top'});//------------------------------создаем элемент progressTop
progress.insertAdjacentElement('afterbegin',progressTop);//---------------------------------------------указываем позицию для progressTop

//Вставляем элементы в progressTop
export const progressTopTitle = createElement('h2',{classList:'progress__top-title',textContent:'progress'});//----создаем элемент progressTopTitle
export const progressTopNumber = createElement('div',{classList:'progress__top-number',textContent:0});//------создаем элемент progressTopNumber
export const progressAccordion = createElement('div',{classList:'progress__accordion'});

progressAccordion.addEventListener('click',moveProgressAccordion);
//img в progressAccordion
export const progressAccordionImg = createElement('img',{classList:'progress__accordion__img'});
progressAccordionImg.setAttribute('src','img/arrow.png');
progressAccordion.insertAdjacentElement('beforeend',progressAccordionImg);

progressTop.insertAdjacentElement('beforeend',progressTopTitle);//--------------------------------------указываем позицию для progressTopTitle
progressTop.insertAdjacentElement('beforeend',progressTopNumber);//-------------------------------------указываем позицию для progressTopNumber
progressTop.insertAdjacentElement('beforeend',progressAccordion);//-------------------------------------указываем позицию для progressAccordion
//progressMain
export const progressMain = createElement('main',{classList:'progress__main'});//------------------------------cоздаем элемент progressMain
progress.insertAdjacentElement('beforeend',progressMain);//-------------------------------------------указываем позицию для progressMain
//progressFooter
export const progressFooter= createElement('footer',{classList:'progress__footer'});//------------------------------cоздаем элемент progressFooter
progress.insertAdjacentElement('beforeend',progressFooter);//-------------------------------------------указываем позицию для progressFooter

//done колонка===============================================================================================================
export const done =  createElement('div',{classList:'box__item done'});//------------------------------создаем элемент done
box.insertAdjacentElement('beforeend',done);//--------------------------------------------------указываем позицию для done

export const doneTop = createElement('header',{classList:'done__top'});//------------------------------создаем элемент doneTop
done.insertAdjacentElement('afterbegin',doneTop);//---------------------------------------------указываем позицию для doneTop

//Вставляем элементы в doneTop
export const doneTopTitle = createElement('h2',{classList:'done__top-title',textContent:'done'});//----создаем элемент doneTopTitle
export const doneTopNumber = createElement('div',{classList:'done__top-number',textContent:0});//------создаем элемент doneTopNumber
export const doneAccordion = createElement('div',{classList:'done__accordion'});//---------------------создаем todoAccordion

doneAccordion.addEventListener('click',moveDoneAccordion);
//img в doneAccordion
export const doneAccordionImg = createElement('img',{classList:'done__accordion__img'});
doneAccordionImg.setAttribute('src','img/arrow.png');
doneAccordion.insertAdjacentElement('beforeend',doneAccordionImg);
doneTop.insertAdjacentElement('beforeend',doneTopTitle);//--------------------------------------указываем позицию для doneTopTitle
doneTop.insertAdjacentElement('beforeend',doneTopNumber);//-------------------------------------указываем позицию для doneTopNumber
doneTop.insertAdjacentElement('beforeend',doneAccordion);//-------------------------------------указываем позицию для todoAccordion
//doneMain
export const doneMain = createElement('main',{classList:'done__main'});//------------------------------cоздаем элемент doneMain
done.insertAdjacentElement('beforeend',doneMain);//---------------------------------------------указываем позицию для doneMain
//doneFooter
export const doneFooter= createElement('footer',{classList:'done__footer',textContent:'deleteAll'});//--cоздаем элемент doneFooter
done.insertAdjacentElement('beforeend',doneFooter);//-------------------------------------------указываем позицию для doneFooter
doneFooter.addEventListener('click',windowWarning2);

//124Создаем модальное окно************************************************************************************************************************
//modalWindow
export const modalWindow = createElement('div',{classList:'modal'});//-----------------------------------------------создаем элемент modalWindow
root.insertAdjacentElement('afterend',modalWindow);//---------------------------------------------------------указываем позицию для modalWindow
//modalBody
export const modalBody = createElement('div',{classList:'modal__body'});//-------------------------------------------создаем элемент modalBody
modalWindow.insertAdjacentElement('afterbegin',modalBody);//--------------------------------------------------указываем позицию для modalBody
//modalForm
export const modalForm = createElement('div',{classList:'modal__form'});//-------------------------------------------создаем элемент modalForm
modalBody.insertAdjacentElement('afterbegin',modalForm);//----------------------------------------------------указываем позицию для modalForm
//modalTitle
export const modalTitle = createElement('input',{classList:'modal__title',placeholder:'Title'});//-------------------создаем элемент modalTitle
modalForm.insertAdjacentElement('beforeend',modalTitle);//----------------------------------------------------указываем позицию для modalTitle
//textarea
export const textArea = createElement('textarea',{classList:'modal__textarea',placeholder:'Descripion'});//----------создаем элемент textarea
modalForm.insertAdjacentElement('beforeend',textArea);//------------------------------------------------------указываем позицию для textarea
//footer
export const footer = createElement('footer',{classList:'modal__footer'});//---------------------------------------создаем элемент footer
modalForm.insertAdjacentElement('beforeend',footer);//------------------------------------------------------указываем позицию для footer
//select
export const select = createElement('select',{classList:'modal__select'});//---------------------------------------создаем элемент select
footer.insertAdjacentElement('beforeend',select);//------------------------------------------------------указываем позицию для select
//Cоздаем список пользователей
select.innerHTML=`<option>User 01</option>
                  <option>User 02</option>
                  <option>User 03</option>
                  <option>User 04</option>
                  <option>User 05</option>`
//modalButtons                  
export const modalButtons = createElement('footer',{classList:'modal__buttons'});//--------------------------создаем элемент footer
footer.insertAdjacentElement('beforeend',modalButtons);//---------------------------------------------указываем позицию для footer
//cancel
export const cancel = createElement('button',{classList:'modal__cancel',textContent:'cancel'});//------------создаем элемент cancel
modalButtons.insertAdjacentElement('beforeend',cancel);//---------------------------------------------указываем позицию для cancel
cancel.addEventListener('click',cancelModal);

//confirm
export const confirm = createElement('button',{classList:'modal__confirm',textContent:'confirm'});//---------создаем элемент confirm
modalButtons.insertAdjacentElement('beforeend',confirm);//--------------------------------------------указываем позицию для confirm
confirm.addEventListener('click',()=>{addComponent();modalTitle.value='';textArea.value='';select.value='User 01';checkCountComponents()});
addComponentsFromLocaleStorage();

