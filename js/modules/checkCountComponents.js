import { todoTopNumber,progressTopNumber,doneTopNumber,todoMain,progressMain,doneMain} from "../script.js"
//Функция для проверки кол-во элементов в каждой колонке
export function checkCountComponents(){
    let  childrenTodo = todoMain.getElementsByClassName('component');
    todoTopNumber.textContent = childrenTodo.length;
    let  childrenProgress = progressMain.getElementsByClassName('component');
    progressTopNumber.textContent = childrenProgress.length;
    let  childrenDone = doneMain.getElementsByClassName('component');
    doneTopNumber.textContent = childrenDone.length;
}