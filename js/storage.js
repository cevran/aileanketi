/* =====================================
   STORAGE ENGINE
===================================== */

const STORAGE_KEY =
    "ailePlatformuResults";

/* =====================================
   SONUÇ KAYDET
===================================== */

function saveResult(result){

    let history =
        getHistory();

    history.unshift(result);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history)
    );

    renderHistory();

}

/* =====================================
   TÜM GEÇMİŞİ GETİR
===================================== */

function getHistory(){

    const data =
        localStorage.getItem(
            STORAGE_KEY
        );

    if(!data){
        return [];
    }

    try{

        return JSON.parse(data);

    }
    catch(error){

        console.error(error);

        return [];

    }

}

/* =====================================
   GEÇMİŞ LİSTELE
===================================== */

function renderHistory(){

    const container =
        document.getElementById(
            "historyContainer"
        );

    if(!container){
        return;
    }

    const history =
        getHistory();

    if(history.length === 0){

        container.innerHTML = `
            <div class="historyItem">
                Henüz kayıtlı sonuç bulunmuyor.
            </div>
        `;

        return;
    }

    let html = "";

    history.forEach((item,index)=>{

        html += `

        <div class="historyItem">

            <h4>
                ${getSurveyName(
                    item.surveyType
                )}
            </h4>

            <p>
                <strong>Puan:</strong>
                %${item.percent}
            </p>

            <p>
                <strong>Profil:</strong>
                ${item.profile}
            </p>

            <p>
                <strong>Tarih:</strong>
                ${item.createdAt}
            </p>

            <button
                class="btnSecondary"
                onclick="showHistoryDetail(${index})">

                Detayları Gör

            </button>

        </div>

        `;

    });

    container.innerHTML = html;

}

/* =====================================
   DETAY GÖSTER
===================================== */

function showHistoryDetail(index){

    const history =
        getHistory();

    const result =
        history[index];

    if(!result){
        return;
    }

    let categoryText = "";

    for(
        const category
        in result.categoryScores
    ){

        categoryText +=

            `${category}: %${result.categoryScores[category]}\n`;

    }

    alert(

        `Anket: ${getSurveyName(result.surveyType)}

Puan: %${result.percent}

Profil:
${result.profile}

Tarih:
${result.createdAt}

Kategori Sonuçları:

${categoryText}`

    );

}

/* =====================================
   GEÇMİŞİ TEMİZLE
===================================== */

function clearHistory(){

    const confirmDelete =
        confirm(
            "Tüm geçmiş sonuçlar silinsin mi?"
        );

    if(!confirmDelete){
        return;
    }

    localStorage.removeItem(
        STORAGE_KEY
    );

    renderHistory();

}

/* =====================================
   SON KAYIT
===================================== */

function getLastResult(){

    const history =
        getHistory();

    if(history.length === 0){

        return null;

    }

    return history[0];

}

/* =====================================
   ANKET ADI
===================================== */

function getSurveyName(type){

    switch(type){

        case "father":
            return "👨 Baba Değerlendirmesi";

        case "mother":
            return "👩 Anne Değerlendirmesi";

        case "child":
            return "🧒 Çocuk Değerlendirmesi";

        default:
            return "Anket";

    }

}

/* =====================================
   SAYFA AÇILIŞI
===================================== */

document.addEventListener(

    "DOMContentLoaded",

    function(){

        renderHistory();

    }

);