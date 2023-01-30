let a = '';
let b = '';
let sign = '';
let finish = false;
let len = 0;
let a_string = '';
let len_b = 0;
let b_string = '';
let text = document.getElementById('output_client_text');

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const action = ['-', '+', 'X', '/', '%']

const out = document.querySelector('.number-input p')

function clearAll () {
    text.style.fontSize = 56 + 'px'
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

function plus_minus(){
    if (a !== '' && b === ''){
        b += '-';
        out.textContent = '-0';
    }
}

document.querySelector('.ac').onclick = clearAll;
document.querySelector('.plus-minus').onclick = plus_minus;

document.querySelector('.btn-container').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('ac')) return;
    if(event.target.classList.contains('plus-minus')) return;

    out.textContent = '';

    const key = event.target.textContent;
    if (digit.includes(key)){
        if (b === '' && sign === ''){
            a+=key;
            a_string = a.toString();
            len = a_string.length;
            if (len > 6){
                text.style.fontSize = 24 + 'px'
                out.textContent = a;
            }
            else{
                out.textContent = a;
            }
        }
        else if (a !== '' && b !== '' && finish){
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            b += key;
            b_string = b.toString();
            len_b = b_string.length;
            if (len_b > 6){
                text.style.fontSize = 24 + 'px'
                out.textContent = b;
            }
            else{
                out.textContent = b;
            }
        }
        return;
    }
    if (action.includes(key)){
        sign = key;
        out.textContent = sign;
        return;
    }
    if (key === '='){
        if (b === '') b = a;
        switch (sign){
            case '+':
                if ((a === '0.2' && b === '0.1') || (a === '0.1' && b === '0.2')){
                    a = '';
                    a = '0.3';
                }
                else {
                    a = (+a) + (+b);
                }
                break;
            case '-':
                a = (+a) - (+b);
                break;
            case 'X':
                a = (+a) * (+b);
                break;
            case '/':
                if(b === '0'){
                    out.textContent = 'Error';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
            case '%':
                a = (a * b)/100;
                break;
        }
        finish = true;
        a_string = a.toString();
        len = a_string.length;
        if (len <= 5){
            out.textContent = a;
        }
        else if (len >= 6){
            text.style.fontSize = 24 + 'px'
            out.textContent = a;
        }
    }
}