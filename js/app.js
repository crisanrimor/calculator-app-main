document.addEventListener('DOMContentLoaded', () => {
    setTheme(localStorage.getItem('themeColor') || 1);
});

const setTheme = theme => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('themeColor', theme);
}

document.querySelector('.calc__switch').addEventListener('click', () => {
    let theme = localStorage.getItem('themeColor');
    if(theme < 3){
        theme++;
    }else{
        theme = 1;
    }
    setTheme(theme);
});

let operation = '0';
let number = '';

document.querySelector('.calc__buttons').addEventListener('click', e => {
    const screen = document.querySelector('.calc__result');
    const equals = document.querySelector('.calc__button--result');

    if((e.target.classList.contains('calc__button')) && (!e.target.classList.contains('calc__button--func') && !e.target.classList.contains('calc__button--result'))){
        if(operation == '0'){
            if( !(e.target.value === '/' || e.target.value === '+' || e.target.value === '-' || e.target.value === '*' || e.target.value === '0')){
                if(e.target.value === '.'){
                    operation += e.target.value;
                }else{
                    operation = '';
                    operation += e.target.value;
                }
            }
        }else{
            if( !((e.target.value === '/' || e.target.value === '+' || e.target.value === '-' || e.target.value === '.' || e.target.value === '*') 
            && (operation.endsWith('/') || operation.endsWith('+') || operation.endsWith('-') || operation.endsWith('.') || operation.endsWith('*')))){
                if( !(number[number.length - 1].includes('.') && e.target.value === '.') ){
                    operation += e.target.value;    
                }                
            }
        }

        number = operation.split(/[+\-*\/]/);
    }

    if(operation.endsWith('/') || operation.endsWith('+') || operation.endsWith('-') || operation.endsWith('.') || operation.endsWith('*')){
        equals.disabled = true;
    }else{
        equals.disabled = false;
    }

    if(e.target.classList.contains('del')){
        operation = operation.slice(0, -1);  

        if(operation.length === 0){
            operation = '0';
        } 
    }

    if(e.target.classList.contains('reset')){
        operation = '0';
    }

    if(e.target.classList.contains('calc__button--result')){
        operation = eval(operation);
    }

    operation = "" + operation;
    screen.textContent = operation
    
    if(operation === 'Infinity' || operation === 'NaN' || operation === '-Infinity'){
        operation = '0';
    }

    e.stopPropagation();
})


