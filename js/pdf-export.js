/* =====================================
   PDF EXPORT
===================================== */

function exportPDF(){

    if(typeof window.jspdf === "undefined"){

        alert(
            "PDF kütüphanesi yüklenemedi."
        );

        return;
    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    const totalScore =
        document.getElementById(
            "totalScore"
        )?.textContent || "";

    const profileTitle =
        document.getElementById(
            "profileTitle"
        )?.textContent || "";

    const aiAnalysis =
        document.getElementById(
            "aiAnalysis"
        )?.innerText || "";

    const freeComment =
        document.getElementById(
            "freeComment"
        )?.value || "";

    const today =
        new Date().toLocaleString(
            "tr-TR"
        );

    let y = 20;

    /* ==========================
       Başlık
    ========================== */

    doc.setFontSize(18);

    doc.text(
        "Ailemizi Daha Iyi Anliyoruz",
        20,
        y
    );

    y += 10;

    doc.setFontSize(10);

    doc.text(
        "Rapor Tarihi: " + today,
        20,
        y
    );

    y += 15;

    /* ==========================
       Genel Sonuç
    ========================== */

    doc.setFontSize(14);

    doc.text(
        "Genel Sonuc",
        20,
        y
    );

    y += 10;

    doc.setFontSize(12);

    doc.text(
        "Genel Puan: " + totalScore,
        20,
        y
    );

    y += 8;

    doc.text(
        "Profil: " + profileTitle,
        20,
        y
    );

    y += 15;

    /* ==========================
       Kategori Sonuçları
    ========================== */

    doc.setFontSize(14);

    doc.text(
        "Kategori Sonuclari",
        20,
        y
    );

    y += 10;

    const scoreCards =
        document.querySelectorAll(
            ".scoreItem"
        );

    scoreCards.forEach(card => {

        const title =
            card.querySelector("h4")
            ?.innerText || "";

        const value =
            card.querySelector(
                ".scoreValue"
            )?.innerText || "";

        doc.setFontSize(11);

        doc.text(
            `${title}: ${value}`,
            20,
            y
        );

        y += 7;

        if(y > 260){

            doc.addPage();

            y = 20;

        }

    });

    y += 8;

    /* ==========================
       AI Analizi
    ========================== */

    doc.setFontSize(14);

    doc.text(
        "Yapay Zeka Analizi",
        20,
        y
    );

    y += 10;

    doc.setFontSize(10);

    const aiLines =
        doc.splitTextToSize(
            aiAnalysis,
            170
        );

    doc.text(
        aiLines,
        20,
        y
    );

    y += aiLines.length * 5 + 10;

    /* ==========================
       Kullanıcı Notları
    ========================== */

    if(freeComment.trim()){

        if(y > 230){

            doc.addPage();

            y = 20;

        }

        doc.setFontSize(14);

        doc.text(
            "Ek Notlar",
            20,
            y
        );

        y += 10;

        doc.setFontSize(10);

        const commentLines =
            doc.splitTextToSize(
                freeComment,
                170
            );

        doc.text(
            commentLines,
            20,
            y
        );

        y +=
            commentLines.length * 5;

    }

    /* ==========================
       Alt Bilgi
    ========================== */

    if(y > 250){

        doc.addPage();

        y = 20;

    }

    y += 15;

    doc.setFontSize(9);

    doc.text(
        "Bu rapor Ailemizi Daha Iyi Anliyoruz platformu tarafindan olusturulmustur.",
        20,
        y
    );

    /* ==========================
       Dosya Adı
    ========================== */

    const fileName =

        "AileDegerlendirmeRaporu_" +

        new Date()
            .toISOString()
            .substring(0,10) +

        ".pdf";

    doc.save(fileName);

}