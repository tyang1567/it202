// Letter/Vowel/Consonant Counter
const fileInput = document.getElementById('inputFile');
const fileStatus = document.getElementById('fileStatus');
const vcOutput = document.getElementById('vcOutput');

fileInput.addEventListener('change', () => {
    vcOutput.textContent = '';
    const file = fileInput.files[0];
    if (!file) {
        fileStatus.textContent = 'No file selected.';
        return;
    }
    if(!file.name.toLowerCase().endsWith('.txt')){
        fileStatus.textContent = 'Please select a .txt file.';
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;

        fetch("http://localhost:3000/api/count", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        })
        .then(res => {
            if (!res.ok) throw new Error('Server error: ${res.status}');
            return res.json();
        })
        .then(data => {
            vcOutput.innerHTML = "Letters: " + data.totalLetters + "<br>" + "Vowels: " + data.vowels + "<br>" + "Consonants: " + data.consonants;
        })
        .catch(err => {
            fileStatus.textContent = "Error: " + err.message;
        });
        };
    reader.readAsText(file);
});


// BMI Calculator
const weight = document.getElementById('weight');
const heightf = document.getElementById('feet');
const heighti = document.getElementById('inches');
const bmiOutput = document.getElementById('bmiOutput');

document.getElementById('bmiButton').addEventListener('click', (e) => {

    let hf = parseInt(heightf.value);
    let hi = parseInt(heighti.value);
    let w = parseInt(weight.value);

    let totalIn = (hf * 12) + hi;
    bmi = (703 * w) / (totalIn * totalIn);

    bmiOutput.innerHTML = 'BMI: ' + bmi.toFixed(2);
});