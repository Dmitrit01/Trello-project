import { todoMain,todoAccordionImg,progressMain,progressAccordionImg,doneMain,doneAccordionImg} from "../script.js";
//Функция для гормошки todo
export function moveTodoAccordion(){
    todoMain.classList.toggle('todo__main_close');
    todoAccordionImg.classList.toggle('todo__accordion_return');
}
//Функция для гормошки progress
export function moveProgressAccordion(){
    progressMain.classList.toggle('progress__main_close');
    progressAccordionImg.classList.toggle('progress__accordion_return');
}
//Функция для гормошки done
export function moveDoneAccordion(){
    doneMain.classList.toggle('done__main_close');
    doneAccordionImg.classList.toggle('done__accordion_return');
}