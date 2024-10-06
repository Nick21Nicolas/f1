const question = document.getElementById('question');                                               
const choices = Array.from(document.getElementsByClassName('choice-text'));                         
const progressText = document.getElementById("questionCounter");                                    
const scoreText = document.getElementById("score");                                                 
const progressBarFull = document.getElementById("progressBarFull");                                 

let currentQuestion = {};                                                                           
let acceptingAnswers = false;                                                                       
let score = 0;                                                                                       
let questionCounter = 0;                                                                           
let availableQuesions = [];                                                                         

let questions = [ 
    {
        question: "Qual piloto é conhecido como O Rei da Chuva?",
        choice1: "Michael Schumacher",
        choice2: "Lewis Hamilton",
        choice3: "Ayrton Senna",
        choice4: "Fernando Alonso",
        answer: 3,
    },
    {
        question:"Lewis Hamilton ganhou quantos campeonatos?",
        choice1: "8",
        choice2: "5",
        choice3: "7",
        choice4: "1",
        answer: 3,
    },
    {


        question: "Qual foi o primeiro piloto a vencer uma corrida na Fórmula 1 com um carro com motor híbrido?",
        choice1: "Sebastian Vettel",
        choice2: "Jenson Button",
        choice3: "Fernando Alonso",
        choice4: "Lewis Hamilton",
        answer: 4,
    },
    {
        question: "Em 2010, Nico Hulkenberg conquistou a sua primeira e até agora única pole position. Mas onde o alemão terminou a corrida?",
        choice1: "1st",
        choice2: "3rd",
        choice3: "8th",
        choice4: "Ele não terminou",
        answer: 3,
    },
    {
        question: "Qual é o circuito mais longo do calendário da F1?",
        choice1: "Slverstone",
        choice2: "Imola",
        choice3: "Suzuka",
        choice4: "Spa (Belgica)",
        answer: 4,
    },
    {
        question: "Qual é a principal característica do circuito de Monaco?",
        choice1: " É o mais longo do calendário",
        choice2: " É uma pista de rua com muitas curvas apertadas",
        choice3: "Tem uma reta longa para ultrapassagens",
        choice4: "É o circuito mais rápido",
        answer: 2,
    },
    {
        question: "Qual é o nome do famoso engenheiro que fundou a equipe McLaren?",
        choice1: "Bruce McLaren",
        choice2: "Enzo Ferrari",
        choice3: "Frank Williams",
        choice4: "Adrian Newey",
        answer: 1,
    },
    {
        question: "Qual é a nacionalidade do piloto Sebastian Vettel?",
        choice1: "Francês",
        choice2: "Alemão",
        choice3: "Austríaco",
        choice4: "Suíço",
        answer: 2,
    },
    {
        question: "O Marina Bay Street Circuit é o circuito de rua do Grande Prêmio de qual país?",
        choice1: "Monaco",
        choice2: "Arábia Saudita",
        choice3: "Singapura",
        choice4: "Baku",
        answer: 3,
    },
    {
        question: "Quantos pontos são atribuídos ao vencedor da corrida de cada Grande Premio?",
        choice1: "Ferias de um mês",
        choice2: "7 palitos de pão com queijo",
        choice3: "10 pontos",
        choice4: "25 pontos",
        answer: 4,
    },
    {
        question: "Quantos Grandes Prêmios vão ser realizados na temporada de 2024 da F1?",
        choice1: "22",
        choice2: "20",
        choice3: "21",
        choice4: "24",
        answer: 4,
    },
    {
        question: "Quantas corridas de 2024 serão cediadas na Itália?",
        choice1: "4",
        choice2: "3",
        choice3: "1",
        choice4: "2",
        answer: 4,
    },
    {
        question: "Qual é o apelido da Ferrari, uma das equipes de corrida de maior sucesso da história da F1?",
        choice1: "O burro dançarino",
        choice2: "O pônei empinado",
        choice3: "O cavalo empinado",
        choice4: "O pãozinho empinado",
        answer: 3,
    },
    {
        question: "Quantas equipes estão na temporada de 2024?",
        choice1: "5",
        choice2: "8",
        choice3: "10",
        choice4: "12",
        answer: 3,
    },
    {
        question: "Quantos pilotos estão na temporada de 2024?",
        choice1: "10",
        choice2: "22",
        choice3: "24",
        choice4: "20",
        answer: 4,
    },
 ];

const CORRECT_SCORE = 1;                                                  
const MAX_QUESTIONS = 15;                                                 

startGame = () => {
    questionCounter = 0;                                                 
    score = 0;                                                           
    availableQuesions = [...questions];                                 
    getNewQuestion();                                                   
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {           
        localStorage.setItem('mostRecentScore', score); 
        return window.location.assign('End.html');                                     
    }
    questionCounter++;                                                                  
    progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;        
    
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);         
    currentQuestion = availableQuesions[questionIndex];                                 
    question.innerText = currentQuestion.question;                                      
    
    choices.forEach((choice) => {                                                       
        const number = choice.dataset['number'];                                        
        choice.innerText = currentQuestion['choice' + number];                          
    });

    availableQuesions.splice(questionIndex, 1);                                         
    acceptingAnswers = true;                                                            
};

choices.forEach((choice) => {                                                       
    choice.addEventListener('click', (e) => {                                      
        if (!acceptingAnswers) return;                                              
        acceptingAnswers = false;                                                  
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";       
        
        if (classToApply === "correct") {
            incrementScore(CORRECT_SCORE);                                        
        }

        selectedChoice.parentElement.classList.add(classToApply);                  

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);             
            getNewQuestion();                                                           
        }, 1000);
    });
});

incrementScore = num => {                                                          
    score += num;                                                                     
    scoreText.innerText = score;
};

startGame();
