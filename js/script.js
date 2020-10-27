'use strict'

let select = document.querySelectorAll('select'),
    input = document.querySelectorAll('input'),
    html;


const currency = () => {
    fetch(`https://api.exchangeratesapi.io/latest`)
        .then(data => data.json())
        .then(data => {
            const arrKeys = Object.keys(data.rates);
            const rates = data.rates;
            arrKeys.map(item => {
                return html += `<option value="${item}">${item}</option>`
            })
            for (let i = 0; i < select.length; i++) {
                select[i].innerHTML = html;
            };

            function convert (a, b) {
                input[a].value = input[b].value * rates[select[a].value] / rates[select[b].value];
            }

            input[0].addEventListener('keyup', () => convert(1, 0));

            input[1].addEventListener('keyup', () => convert(0, 1));

            select[0].addEventListener('change', () => convert(1, 0));

            select[1].addEventListener('change', () => convert(0, 1));

        })
        .catch(() =>  alert('Something went wrong'))

}

currency();



