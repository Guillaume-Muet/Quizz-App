document.addEventListener('DOMContentLoaded', () => {

    const API_TOKEN = 'cJSEwJXhV9hw88e62Sk6B89tlpBt13K5jV2o5BjT';
    let difficulty = null; 
    let category = null; 
    let API_URL = `https://quizapi.io/api/v1/questions?apiKey=${API_TOKEN}&difficulty=${difficulty}&category=${category}`; 
    let questions = []; 

    let btn = document.querySelector('button');
    let counter = 0;
    let good_answers = 0;
    var true_answer = null;

    btn.addEventListener('click', () => {

        if(counter == 0) {
            let difficulty_choice = document.querySelectorAll('#difficulty');
            let category_choice = document.querySelectorAll('#category');
        
            for(let i = 0; i < difficulty_choice.length; i++) {
                if(difficulty_choice[i].checked) {
                    difficulty = difficulty_choice[i].nextElementSibling.textContent;
                }
            }
            for(let i = 0; i < category_choice.length; i++) {
                if(category_choice[i].checked) {
                    category = category_choice[i].nextElementSibling.textContent;
                }
            }
        }

        if(difficulty !== null && category !== null) {
            API_URL = `https://quizapi.io/api/v1/questions?apiKey=${API_TOKEN}&difficulty=${difficulty}&category=${category}`;

            fetch(API_URL)
                .then(result => result.json())
                .then(data => {

                    questions = data;

                    //console.log(questions);
                    let nbrQuestions = questions.length;

                    let h1 = document.querySelector('h1');
                    if(counter !== nbrQuestions + 1) {
                        var question = questions[counter].question;
                    } else {
                        console.log('Fin du jeu..');
                        document.querySelector('#score').style.display = 'block';
                        btn.disabled = true;
                        btn.style.cursor = 'not-allowed';
                        btn.style.background = 'grey';
                        let content = document.querySelector('.content');
                        content.style.textAlign = 'center';
                        content.style.fontSize = '35px';
                        content.innerHTML = '<p> Quiz terminé.. </p>';
                        let h1 = document.querySelector('h1');
                        h1.innerHTML = '';
                    }
                    let answers = questions[counter].answers;
                    let multiple_correct_answers = questions[counter].multiple_correct_answers;
                    let correct_answers = questions[counter].correct_answers;
                    for(var answer of Object.getOwnPropertyNames(correct_answers)) {
                        if(correct_answers[answer] === 'true') {
                            //console.log(answer);
                            var correct_answer = answer.substring(0, 8);
                        }
                    }
                     
                    for(answ of Object.getOwnPropertyNames(answers)) {
                        if(answ === correct_answer) {
                            true_answer = answers[answ]; 
                        }
                    }  

                    let content = document.querySelector('.content');
                    content.innerHTML = '';
                    content.style.display = 'block';
                    h1.textContent = question;

                    if(multiple_correct_answers === 'true') {
                        for(var answer of Object.getOwnPropertyNames(answers)) {
                            if(answers[answer] !== null && answers[answer] !== '') {
                                content.innerHTML += `<div class="answer">
                                                        <input type="checkbox" id="answer" name="answer">
                                                        <label for="answer">${answers[answer]}</label>
                                                      </div>`;
                            } 
                        }
                        content.innerHTML += `<p style="margin-left:20px;font-weight:bold">Plusieurs réponses possibles</p>`    
                    } else {
                        for(var answer of Object.getOwnPropertyNames(answers)) {
                            if(answers[answer] !== null && answers[answer] !== '') {
                                content.innerHTML += `<div class="answer">
                                                        <input type="radio" id="answer" name="answer">
                                                        <label for="answer">${answers[answer]}</label>
                                                      </div>`;
                            } 
                        }
                        content.innerHTML += `<p style="margin-left:20px;font-weight:bold">Une seule réponse possible</p>`;
                    }
                });
            counter += 1;
        }

        if(counter > 1) {
            let responses = document.querySelectorAll('input');
            for(let i = 0; i < responses.length; i++) {
                if(responses[i].checked) {
                    if(responses[i].nextElementSibling.textContent === true_answer) {
                        console.log('Bonne réponse.'); 
                        good_answers += 1;  
                    } else {
                        console.log('Mauvaise réponse.');
                        if(good_answers > 0) {
                            good_answers -= 1;
                        } else {
                            good_answers = 0;
                        }
                    }
                }
            }
        }
        let score = document.querySelector('#score');
        score.textContent = `Score : ${good_answers}`;
    }); 

});
    