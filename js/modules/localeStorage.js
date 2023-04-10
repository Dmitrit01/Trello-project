import { createElement } from "./createElement.js";
import { checkCountComponents } from "./checkCountComponents.js"
import { bodyElement,todoMain,modalWindow,progressMain,doneMain,modalTitle,textArea} from "../script.js";
import { editHelpModalWindow,windowWarning} from "./modalWindow.js"

export function addComponentsFromLocaleStorage(){
    for(let i=0;i<localStorage.length;i++){
         let key = localStorage.key(i);
         let value = JSON.parse(localStorage.getItem(key));
         const component = createElement('article',{classList:'component'});//-----------------------------Создает компонент с классом компонент
         todoMain.insertAdjacentElement('afterbegin',component);//-----------------------------------------Указываем место для создания компонента
         modalWindow.classList.remove('modal__visible');//-------------------------------------------------Делает компонент видимым
        const idComponent = createElement('input',{classList:'idComponent'});
         idComponent.style.display = 'none';
         idComponent.value = key;
         component.insertAdjacentElement('afterbegin',idComponent);
        //componentHeader===================================================================================
         const componentHeader = createElement('header',{classList:'component__header'});
         component.insertAdjacentElement('beforeend',componentHeader);
         //componentTitle
         const componentTitle = createElement('h2',{classList:'component__title',textContent:modalTitle.value.length>0?modalTitle.value:value.title});
         componentHeader.insertAdjacentElement('beforeend',componentTitle);
         //componentButtons
         const componentButtons = createElement('div',{classList:'component__buttons'});
         componentHeader.insertAdjacentElement('beforeend',componentButtons);
         //componentEdit
         const componentEdit = createElement('div',{classList:'component__edit',textContent:'EDIT'});
         componentButtons.insertAdjacentElement('beforeend',componentEdit);
         componentEdit.addEventListener('click',editHelpModalWindow)//===============================
         //componentDelete 
         const componentDelete = createElement('div',{classList:'component__delete',textContent:'DELETE'});
         componentButtons.insertAdjacentElement('beforeend',componentDelete);
         //Навешиваем событие на delete
         function deleteComponent(event){
             delete localStorage.removeItem(key);
             event.target.closest('.component').remove();
             checkCountComponents();
         }
         componentDelete.addEventListener('click',deleteComponent);
         //componentMain=====================================================================================
         const componentMain = createElement('main',{classList:'component__main'});
         component.insertAdjacentElement('beforeend',componentMain);
         //description
         const componentDescr = createElement('p',{classList:'component__descr',textContent:textArea.value.length>0?textArea.value:value.descr});
         componentMain.insertAdjacentElement('beforeend',componentDescr);
         //Arrow
         const arrow = createElement('div',{classList:'component__arrow'});
         componentMain.insertAdjacentElement('beforeend',arrow);
         function moveToProgress(event){
                 //Работа с localeStorage
                 const saveMoveToProgress = JSON.parse(localStorage.getItem(key));
                 saveMoveToProgress.place = 'progress';
                 localStorage.setItem(key,JSON.stringify(saveMoveToProgress));
                 progressMain.append(component);
                 component.classList.add('component__progress');
                 arrow.style.display = 'none';
                 //Преобразуем кнопу EDIT в BACK
                 componentEdit.textContent = 'BACK';
                 componentEdit.removeEventListener('click',editHelpModalWindow);
                 // Создаем функцию для переноса обратно в колонку в TODO
                 function moveToTodo(event){
                     //Работа с localeStorage
                     const saveMoveToTodo = JSON.parse(localStorage.getItem(key));
                     saveMoveToTodo.place = 'Todo';
                     localStorage.setItem(key,JSON.stringify(saveMoveToTodo));
                     todoMain.append(event.target.closest('.component'));
                     componentEdit.addEventListener('click',editHelpModalWindow);
                     componentDelete.addEventListener('click',deleteComponent);
                     componentEdit.textContent = 'EDIT';
                     componentDelete.textContent = 'DELETE';
                     arrow.style.display = 'flex';
                     component.classList.remove('component__progress');
                     checkCountComponents();
                 }
                 componentEdit.addEventListener('click',moveToTodo);
                 //Преобразуем delete в complite
                 componentDelete.textContent = 'COMPLITE';
                 componentDelete.removeEventListener('click',deleteComponent);
                 //Создаем функцию для переноса в колонку DONE
                 function moveToDone(event){
                     //Работа с localeStorage
                     const saveMoveToDone = JSON.parse(localStorage.getItem(key));
                     saveMoveToDone.place = 'Done';
                     localStorage.setItem(key,JSON.stringify(saveMoveToDone));
                     doneMain.append(event.target.closest('.component')); 
                     component.classList.add('component__done');
                     componentDelete.removeEventListener('click',moveToDone);
                     componentDelete.textContent = 'DELETE';
                     componentDelete.addEventListener('click',deleteComponent);
                     componentEdit.style.display = 'none';
                     checkCountComponents();
                 }
                 componentDelete.addEventListener('click',moveToDone);
                 checkCountComponents();
         }
         arrow.addEventListener('click',(event)=>{progressMain.children.length<6?moveToProgress():windowWarning(moveToProgress)});
         //arrowImg
         const arrowImg = createElement('img');
         arrowImg.setAttribute('src','./img/arrow.png');
         arrow.insertAdjacentElement('beforeend',arrowImg);
         //componentFooter===================================================================================
         const componentFooter = createElement('footer',{classList:'component__footer'});
         component.insertAdjacentElement('beforeend',componentFooter);
         //user
         const componentUser = createElement('p',{classList:'component__user',textContent:value.user});
         componentFooter.insertAdjacentElement('beforeend',componentUser);
         //Создаем время deadline
         const timeDeadLine = new Date();
         timeDeadLine.setDate(timeDeadLine.getDate()+7)// Уставнавливаем время выполнения для deadline,то есть 7 дней(неделя)
         const dayDeadLine = timeDeadLine.getDate()<10?'0'+timeDeadLine.getDate():timeDeadLine.getDate();
         const monthDeadLine = timeDeadLine.getMonth()+1<10?'0'+(timeDeadLine.getMonth()+1):timeDeadLine.getMonth()+1;
         const yearDeadLine = timeDeadLine.getFullYear()<10?'0'+timeDeadLine.getFullYear():timeDeadLine.getFullYear();
         const componentTime = createElement('p',{classList:'component__time',textContent:`${dayDeadLine}.${monthDeadLine}.${yearDeadLine}`});
         componentFooter.insertAdjacentElement('beforeend',componentTime);
         //Создаем настоящее время и будем её сравнивать с deadline времени каждую секунду через интервал
         setInterval(()=>{
             const time = new Date();
             time.setDate(time.getDate()+1)//Добавляем день, чтоб было 6 дней свободного времени до красной тудушки.И когда остается один день,тудушка красная.
             if(time>=timeDeadLine){component.classList.add('component__deadline')}},1000);
         //Закончили set интервал
         bodyElement.classList.remove('lock');
         if(value.place === 'progress'){
            function moveToProgressLocaleStorage(event){
                progressMain.append(component);
                component.classList.add('component__progress');
                arrow.style.display = 'none';
                //Преобразуем кнопу EDIT в BACK
                componentEdit.textContent = 'BACK';
                componentEdit.removeEventListener('click',editHelpModalWindow)
                // Создаем функцию для переноса обратно в колонку в TODO
                function moveToTodo(event){
                    //Работа с localeStorage
                    const saveMoveToTodo = JSON.parse(localStorage.getItem(key));
                    saveMoveToTodo.place = 'Todo';
                    localStorage.setItem(key,JSON.stringify(saveMoveToTodo));
                    todoMain.append(event.target.closest('.component'));
                    componentEdit.addEventListener('click',editHelpModalWindow);
                    componentDelete.addEventListener('click',deleteComponent);
                    componentEdit.textContent = 'EDIT';
                    componentDelete.textContent = 'DELETE';
                    arrow.style.display = 'flex';
                    component.classList.remove('component__progress');
                    checkCountComponents()
                }
                componentEdit.addEventListener('click',moveToTodo)
                //Преобразуем delete в complite
                componentDelete.textContent = 'COMPLITE';
                componentDelete.removeEventListener('click',deleteComponent);
                //Создаем функцию для переноса в колонку DONE
                function moveToDone(event){
                    //Работа с localeStorage
                    const saveMoveToDone = JSON.parse(localStorage.getItem(key));
                    saveMoveToDone.place = 'Done';
                    localStorage.setItem(key,JSON.stringify(saveMoveToDone));
                    doneMain.append(event.target.closest('.component'));
                    component.classList.add('component__done');
                    componentDelete.removeEventListener('click',moveToDone);
                    componentDelete.textContent = 'DELETE';
                    componentDelete.addEventListener('click',deleteComponent);
                    componentEdit.style.display = 'none';
                    checkCountComponents();
                }
                componentDelete.addEventListener('click',moveToDone);
                checkCountComponents();
            }
            moveToProgressLocaleStorage();
         }else if(value.place === 'Done'){
            function moveToDoneLocaleStorage(event){
                progressMain.append(component);
                component.classList.add('component__progress');
                arrow.style.display = 'none';
                //Преобразуем кнопу EDIT в BACK
                componentEdit.textContent = 'BACK';
                componentEdit.removeEventListener('click',editHelpModalWindow);
                // Создаем функцию для переноса обратно в колонку в TODO
                function moveToTodo(event){
                    //Работа с localeStorage
                    const saveMoveToTodo = JSON.parse(localStorage.getItem(key));
                    saveMoveToTodo.place = 'Todo';
                    localStorage.setItem(key,JSON.stringify(saveMoveToTodo));
                    todoMain.append(event.target.closest('.component'));
                    componentEdit.addEventListener('click',editHelpModalWindow);
                    componentDelete.addEventListener('click',deleteComponent);
                    componentEdit.textContent = 'EDIT';
                    componentDelete.textContent = 'DELETE';
                    arrow.style.display = 'flex';
                    component.classList.remove('component__progress');
                    checkCountComponents();
                }
                componentEdit.addEventListener('click',moveToTodo);
                //Преобразуем delete в complite
                componentDelete.textContent = 'COMPLITE';
                componentDelete.removeEventListener('click',deleteComponent);
                //Создаем функцию для переноса в колонку DONE
                function moveToDone(event){
                    //Работа с localeStorage
                    const saveMoveToDone = JSON.parse(localStorage.getItem(key));
                    saveMoveToDone.place = 'Done';
                    localStorage.setItem(key,JSON.stringify(saveMoveToDone));
                    doneMain.append(event.target.closest('.component'));
                    component.classList.add('component__done');
                    componentDelete.removeEventListener('click',moveToDone);
                    componentDelete.textContent = 'DELETE';
                    componentDelete.addEventListener('click',deleteComponent);
                    componentEdit.style.display = 'none';
                    checkCountComponents();
                }
                componentDelete.addEventListener('click',moveToDone);
                doneMain.append(component);
                component.classList.add('component__done');
                componentDelete.removeEventListener('click',moveToDone);
                componentDelete.textContent = 'DELETE';
                componentDelete.addEventListener('click',deleteComponent);
                componentEdit.style.display = 'none';
                checkCountComponents(); 
        }
            moveToDoneLocaleStorage();
        }
        checkCountComponents();
    }
}