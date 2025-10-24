document.getElementById('task1').addEventListener('submit', function(event){
    event.preventDefault();
    let input = document.getElementById('reverseString').value;
    let reversed = ""
    for(let i = input.length - 1; i >= 0; i--){
        reversed += input[i]
    }
    document.getElementById('task1Output').innerText = 'Reversed string: ' + reversed;
})

document.getElementById('task2').addEventListener('submit', function(event){
    event.preventDefault();
    let numInput = document.getElementById('palinNum').value;
    let strNum = numInput.toString();
    let i = 0;
    let j = strNum.length - 1;
    let isPalin = true;
    while( i < j){
        if(strNum[i] !== strNum[j]){
            isPalin = false;
        }
        i++;
        j--;
    }
    document.getElementById('task2Output').innerText = numInput + (isPalin? ' is a palindrome.' : ' is not a palindrome.');
})

document.getElementById('task3').addEventListener('submit', function(event){
    event.preventDefault();
    const subtotal = parseFloat(document.getElementById('subtotal').value);
    const tip = parseFloat(document.getElementById('tip').value) / 100;
    let total = subtotal + subtotal * tip
    document.getElementById('task3Output').innerText = 'Bill total: $' + total.toFixed(2)
})