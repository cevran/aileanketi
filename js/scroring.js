/* =====================================
   SCORING ENGINE
===================================== */

let radarChart = null;

/* =====================================
   RAPOR OLUŞTUR
===================================== */

function calculateSurvey(){

    const answers = getAnswers();

    if(!answers){
        return;
    }

    const result =
        calculateScores(
            currentQuestions,
            answers
        );

    renderResult(result);

    saveResult(result);

}

/* =====================================
   PUAN HESAPLAMA
===================================== */

function calculateScores(
    questions,
    answers
){

    const categories = {};

    let totalScore = 0;

    questions.forEach((question,index)=>{

        const score = answers[index];

        totalScore += score;

        if(!categories[question.cat]){
            categories[question.cat] = [];
        }

        categories[question.cat].push(score);

    });

    const maxScore =
        questions.length * 5;

    const percent =
        Math.round(
            (totalScore / maxScore) * 100
        );

    const categoryScores = {};

    for(const category in categories){

        const values =
            categories[category];

        const average =
            values.reduce(
                (a,b)=>a+b,
                0
            ) / values.length;

        categoryScores[category] =
            Math.round(
                average * 20
            );

    }

    return {

        surveyType:
            currentSurveyType,

        totalScore,

        maxScore,

        percent,

        categoryScores,

        profile:
            getProfile(percent),

        createdAt:
            new Date().toLocaleString(
                "tr-TR"
            )

    };

}

/* =====================================
   PROFİL BELİRLE
===================================== */

function getProfile(percent){

    if(percent >= 90){

        return "🏆 Rol Model Profil";

    }

    if(percent >= 80){

        return "✅ Çok Güçlü Profil";

    }

    if(percent >= 70){

        return "👍 Güçlü Profil";

    }

    if(percent >= 60){

        return "🌱 Gelişime Açık Profil";

    }

    if(percent >= 50){

        return "⚠️ Destek Gerekiyor";

    }

    return "🚨 Öncelikli Gelişim Alanı";

}

/* =====================================
   SONUÇ EKRANI
===================================== */

function renderResult(result){

    document
        .getElementById("surveyScreen")
        .classList.add("hidden");

    document
        .getElementById("resultScreen")
        .classList.remove("hidden");

    document
        .getElementById("totalScore")
        .textContent =
        "%" + result.percent;

    document
        .getElementById("profileTitle")
        .textContent =
        result.profile;

    renderCategoryCards(result);

    renderRadarChart(result);

    renderLists(result);

    renderAIReport(result);

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

/* =====================================
   KATEGORİ KARTLARI
===================================== */

function renderCategoryCards(result){

    const container =
        document.getElementById(
            "categoryCards"
        );

    const colors = [

        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#e67e22",
        "#e74c3c",
        "#16a085"

    ];

    let html = "";

    let index = 0;

    for(
        const category
        in result.categoryScores
    ){

        html += `

        <div
            class="scoreItem"
            style="background:${colors[index % colors.length]}">

            <h4>
                ${category}
            </h4>

            <div class="scoreValue">
                %${result.categoryScores[category]}
            </div>

        </div>

        `;

        index++;

    }

    container.innerHTML = html;

}

/* =====================================
   RADAR CHART
===================================== */

function renderRadarChart(result){

    const ctx =
        document.getElementById(
            "radarChart"
        );

    if(radarChart){

        radarChart.destroy();

    }

    radarChart =
        new Chart(ctx,{

            type:"radar",

            data:{

                labels:
                    Object.keys(
                        result.categoryScores
                    ),

                datasets:[{

                    label:"Skor",

                    data:
                        Object.values(
                            result.categoryScores
                        ),

                    backgroundColor:
                        "rgba(52,152,219,0.25)",

                    borderColor:
                        "#3498db",

                    borderWidth:3,

                    pointRadius:5

                }]

            },

            options:{

                responsive:true,

                scales:{
                    r:{
                        beginAtZero:true,
                        max:100
                    }
                }

            }

        });

}

/* =====================================
   GÜÇLÜ VE GELİŞİM ALANLARI
===================================== */

function renderLists(result){

    const strengths = [];

    const improvements = [];

    for(
        const category
        in result.categoryScores
    ){

        const score =
            result.categoryScores[category];

        if(score >= 80){

            strengths.push(category);

        }

        if(score < 65){

            improvements.push(category);

        }

    }

    document
        .getElementById("strengthList")
        .innerHTML = strengths.length

        ? strengths.map(item=>
            `<li>${item}</li>`
          ).join("")

        : "<li>Belirgin güçlü alan bulunamadı.</li>";

    document
        .getElementById("improvementList")
        .innerHTML = improvements.length

        ? improvements.map(item=>
            `<li>${item}</li>`
          ).join("")

        : "<li>Belirgin gelişim alanı bulunamadı.</li>";

}

/* =====================================
   AI RAPOR
===================================== */

function renderAIReport(result){

    const target =
        document.getElementById(
            "aiAnalysis"
        );

    if(
        typeof generateAIReport
        === "function"
    ){

        target.innerHTML =
            generateAIReport(result);

    }
    else{

        target.innerHTML = `
            Değerlendirme tamamlandı.
            Yapay zekâ analiz modülü henüz yüklenmedi.
        `;

    }

}