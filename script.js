

document.addEventListener("DOMContentLoaded", () => {


let Api_url = "https://opentdb.com/api.php?amount=1";

let btn = document.querySelector("#search")
let ul = document.querySelector("#ul")
let score = document.getElementById("score") // for score =0
let total = document.getElementById("total")// for total = 10 
let check = document.querySelector("#check");





let correctAnswer;
let userScore  =  questionsAsked = 0; 
let totalQuestions = 10;

// Disable the check button initially
check.disabled = true;



async function getaxios(){
    try{
        let res = await axios.get(Api_url)
         console.log(res.data.results)
         return res.data.results; // Return the question
     
     }catch(err){
        console.log(err)
     }
}


btn.addEventListener("click" , async  function(){

    if(questionsAsked >= totalQuestions){
        alert("Quiz completed! Click 'Check Score' to see your final score.");
      return;
    }
    await displayQuestion();
    check.disabled = false; // Enable the check button once a question is displayed
  });

 async function displayQuestion() {

    // Await the result of the getaxios function
    let result =  await  getaxios();

    let p = document.querySelector("#category")
    p.innerHTML =  result[0].category;

    let quetion = document.querySelector("#question");
    quetion.innerHTML = `<i class="fa-brands fa-quora"></i>  ${result[0].question}`;


    // for option
    correctAnswer = result[0].correct_answer
    let incorrect = result[0].incorrect_answers
    console.log(incorrect)
    console.log(correctAnswer)

    let opt =  incorrect
    opt.splice(Math.floor(Math.random()*(incorrect.length + 1)), 0 , correctAnswer) // for random option generated

    ul.innerHTML = `${opt.map((option)=> 
        `<a href="#" class="list-group-item list-group-item-action option">${option}</a>`
    ).join('')}`

    console.log(opt)
    optionSelect()
    // questionsAsked++
    
};

function optionSelect (){
    let select = document.querySelectorAll(".option")
    select.forEach(e => {
        e.addEventListener("click", async()=>{

            console.log(e.textContent)
        //    check.disabled = false;
            if( e.textContent == correctAnswer){
                console.log("Correct answer selected");
                userScore++ 
                alert("correct answer")
                questionsAsked++;
                if (questionsAsked < totalQuestions) {
                    await displayQuestion(); // Fetch and display the next question
                  } else {
                    alert("You have completed the quiz!");
                    btn.disabled = true; // Disable the start button when quiz is completed
                  }

        
            }else{
                console.log("Incorrect answer selected");
                 alert("Incorrect answer! Try again.");      }
        })
    });

}

check.addEventListener("click", () => {
    score.innerHTML = `<b>${userScore}</b>`;
    total.innerHTML = `<b>${totalQuestions}</b>` ;

    console.log("Score checked");
  });

});






    //   fetch(Api_url)
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((data) => {
    //       console.log(data.results[0]);
    //       console.log(data.results[0].correct_answer);
    //       console.log(data.results[0].incorrect_answers[1]);

    //     })
    //     .catch((err) => {
    //       console.log("error");
        // });

        // async function get(){
        //     try{
        //         let res = await fetch(Api_url)
        //         let response =  await res.json();
        //         console.log(response)
        //         console.log(response.results)

        //     }catch(err){
        //         console.log(err)    
        //     }
        // }


       