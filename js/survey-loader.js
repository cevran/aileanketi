/* =====================================
   SURVEY LOADER
===================================== */

let currentSurveyType = "";
let currentQuestions = [];

/* =====================================
   SABİT CEVAPLAR
===================================== */

const ANSWER_OPTIONS = [

    "1 - Hiç Katılmıyorum",
    "2 - Pek Katılmıyorum",
    "3 - Kararsızım",
    "4 - Katılıyorum",
    "5 - Tamamen Katılıyorum"

];

/* =====================================
   ANKET BAŞLIKLARI
===================================== */

const SURVEY_TITLES = {

    father : "👨 Baba Değerlendirme Anketi",

    mother : "👩 Anne Değerlendirme Anketi",

    child  : "🧒 Çocuk Değerlendirme Anketi"

};

/* =====================================
   ANKET YÜKLE
===================================== */

async function loadSurvey(type){

    try{

        currentSurveyType = type;

        const response =
            await fetch(`data/${type}.json`);

        if(!response.ok){

            throw new Error(
                "Anket dosyası yüklenemedi."
            );

        }

        currentQuestions =
            await response.json();

        showSurveyScreen();

        renderSurvey();

    }
    catch(error){

        console.error(error);

        alert(
            "Anket yüklenirken bir hata oluştu."
        );

    }

}

/* =====================================
   EKRAN GEÇİŞİ
===================================== */

function showSurveyScreen(){

    document
        .getElementById("homeScreen")
        .classList.add("hidden");

    document
        .getElementById("resultScreen")
        .classList.add("hidden");

    document
        .getElementById("surveyScreen")
        .classList.remove("hidden");

}

/* =====================================
   ANA SAYFA
===================================== */

function goHome(){

    document
        .getElementById("surveyScreen")
        .classList.add("hidden");

    document
        .getElementById("resultScreen")
        .classList.add("hidden");

    document
        .getElementById("homeScreen")
        .classList.remove("hidden");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

/* =====================================
   ANKET OLUŞTUR
===================================== */

function renderSurvey(){

    const surveyTitle =
        document.getElementById(
            "surveyTitle"
        );

    surveyTitle.textContent =
        SURVEY_TITLES[currentSurveyType];

    const progressInfo =
        document.getElementById(
            "progressInfo"
        );

    progressInfo.innerHTML = `
        <p>
            Toplam
            <strong>
                ${currentQuestions.length}
            </strong>
            soru bulunmaktadır.
        </p>
    `;

    const container =
        document.getElementById(
            "surveyContainer"
        );

    let html = "";

    currentQuestions.forEach((question,index)=>{

        html += `

        <div class="question">

            <h3>

                ${index + 1}.
                ${question.text}

            </h3>

        `;

        ANSWER_OPTIONS.forEach(
            (answer,answerIndex)=>{

            html += `

                <label class="option">

                    <input
                        type="radio"
                        name="q${index}"
                        value="${answerIndex + 1}">

                    <span>
                        ${answer}
                    </span>

                </label>

            `;

        });

        html += `
            </div>
        `;

    });

    container.innerHTML = html;

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

/* =====================================
   CEVAPLARI TOPLA
===================================== */

function getAnswers(){

    const answers = [];

    for(
        let i = 0;
        i < currentQuestions.length;
        i++
    ){

        const selected = document.querySelector(
            `input[name="q${i}"]:checked`
        );

        if(!selected){

            alert(
                `${i+1}. soru cevaplanmadı.`
            );

            return null;

        }

        answers.push(
            parseInt(selected.value)
        );

    }

    return answers;

}

/* =====================================
   TÜM SORULAR CEVAPLANDI MI?
===================================== */

function surveyCompleted(){

    const answers = getAnswers();

    return answers !== null;

}