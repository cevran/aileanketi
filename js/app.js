/* =====================================
   APP.JS
   Ana uygulama başlangıcı
===================================== */

/* =====================================
   GLOBAL AYARLAR
===================================== */

const APP_INFO = {

    name : "Ailemizi Daha İyi Anlıyoruz",

    version : "1.0.0",

    author : "Cuneyt Evran"

};

/* =====================================
   UYGULAMA BAŞLAT
===================================== */

function initializeApp(){

    console.log(
        `${APP_INFO.name} v${APP_INFO.version}`
    );

    loadHistorySection();

    attachGlobalEvents();

    checkDependencies();

}

/* =====================================
   BAĞIMLILIK KONTROLÜ
===================================== */

function checkDependencies(){

    const missing = [];

    if(typeof loadSurvey !== "function"){

        missing.push(
            "survey-loader.js"
        );

    }

    if(typeof calculateSurvey !== "function"){

        missing.push(
            "scoring.js"
        );

    }

    if(typeof generateAIReport !== "function"){

        missing.push(
            "ai-report.js"
        );

    }

    if(typeof saveResult !== "function"){

        missing.push(
            "storage.js"
        );

    }

    if(typeof exportPDF !== "function"){

        missing.push(
            "pdf-export.js"
        );

    }

    if(missing.length > 0){

        console.error(
            "Eksik modüller:",
            missing
        );

        alert(
            "Bazı JavaScript dosyaları yüklenemedi.\n\n" +
            missing.join("\n")
        );

    }

}

/* =====================================
   GEÇMİŞİ YÜKLE
===================================== */

function loadHistorySection(){

    if(
        typeof renderHistory ===
        "function"
    ){

        renderHistory();

    }

}

/* =====================================
   OLAYLARI BAĞLA
===================================== */

function attachGlobalEvents(){

    window.addEventListener(

        "beforeunload",

        function(){

            console.log(
                "Oturum kapatılıyor..."
            );

        }

    );

}

/* =====================================
   ANKET ADI
===================================== */

function getSurveyDisplayName(type){

    switch(type){

        case "father":

            return "👨 Baba Değerlendirme";

        case "mother":

            return "👩 Anne Değerlendirme";

        case "child":

            return "🧒 Çocuk Değerlendirme";

        default:

            return "Değerlendirme";

    }

}

/* =====================================
   TARİH FORMATLA
===================================== */

function formatDate(date){

    try{

        return new Date(date)
            .toLocaleString("tr-TR");

    }
    catch(error){

        return date;

    }

}

/* =====================================
   SAYFA BAŞINA DÖN
===================================== */

function scrollTopPage(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* =====================================
   ALT KISMA GİT
===================================== */

function scrollBottomPage(){

    window.scrollTo({

        top:document.body.scrollHeight,

        behavior:"smooth"

    });

}

/* =====================================
   YÜKLENME DURUMU
===================================== */

function showLoading(text = "Yükleniyor..."){

    let loader =
        document.getElementById(
            "globalLoader"
        );

    if(!loader){

        loader =
            document.createElement("div");

        loader.id =
            "globalLoader";

        loader.innerHTML = `
            <div style="
                position:fixed;
                inset:0;
                background:rgba(0,0,0,.45);
                display:flex;
                justify-content:center;
                align-items:center;
                z-index:9999;
                color:white;
                font-size:24px;
            ">
                ${text}
            </div>
        `;

        document.body.appendChild(
            loader
        );

    }

}

/* =====================================
   LOADER KAPAT
===================================== */

function hideLoading(){

    const loader =
        document.getElementById(
            "globalLoader"
        );

    if(loader){

        loader.remove();

    }

}

/* =====================================
   SON RAPORU GETİR
===================================== */

function openLastResult(){

    if(
        typeof getLastResult !==
        "function"
    ){

        return;

    }

    const result =
        getLastResult();

    if(!result){

        alert(
            "Kayıtlı sonuç bulunamadı."
        );

        return;

    }

    if(
        typeof renderResult ===
        "function"
    ){

        renderResult(result);

    }

}

/* =====================================
   GELİŞTİRİCİ BİLGİSİ
===================================== */

console.log(
`
========================================
${APP_INFO.name}
Version : ${APP_INFO.version}
========================================
`
);

/* =====================================
   BAŞLAT
===================================== */

document.addEventListener(

    "DOMContentLoaded",

    function(){

        initializeApp();

    }

);