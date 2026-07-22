/* =====================================
   AI REPORT ENGINE
===================================== */

function generateAIReport(result){

    let report = "";

    report += buildIntroduction(result);

    report += buildCategoryAnalysis(result);

    report += buildConclusion(result);

    return report;

}

/* =====================================
   GİRİŞ
===================================== */

function buildIntroduction(result){

    let text = `
        <p>
        Bu değerlendirme sonuçları,
        verilen cevaplara göre oluşturulmuştur.
        Amaç yargılamak değil;
        güçlü yönleri ve gelişim fırsatlarını
        daha görünür hale getirmektir.
        </p>
    `;

    return text;

}

/* =====================================
   KATEGORİ ANALİZİ
===================================== */

function buildCategoryAnalysis(result){

    let text = `
        <h4>Kategori Analizi</h4>
        <ul>
    `;

    for(const category in result.categoryScores){

        const score =
            result.categoryScores[category];

        text += `
            <li>
                <strong>${category}</strong> :
                ${buildCategoryComment(
                    category,
                    score,
                    result.surveyType
                )}
            </li>
        `;

    }

    text += "</ul>";

    return text;

}

/* =====================================
   KATEGORİ YORUMU
===================================== */

function buildCategoryComment(
    category,
    score,
    surveyType
){

    if(score >= 90){

        return `
            Bu alan oldukça güçlü görünmektedir.
        `;

    }

    if(score >= 80){

        return `
            Güçlü bir performans sergilenmektedir.
        `;

    }

    if(score >= 70){

        return `
            Genel olarak olumlu olmakla birlikte
            daha da geliştirilebilir.
        `;

    }

    if(score >= 60){

        return `
            Bu alanda gelişim fırsatları bulunmaktadır.
        `;

    }

    return `
        Bu alan özel dikkat gerektirebilir.
    `;

}

/* =====================================
   SONUÇ BÖLÜMÜ
===================================== */

function buildConclusion(result){

    let text = `
        <h4>Genel Değerlendirme</h4>
    `;

    if(result.percent >= 90){

        text += `
            <p>
            Değerlendirme sonuçları oldukça güçlü
            ve dengeli bir profil ortaya koymaktadır.
            Mevcut olumlu davranışların sürdürülmesi
            önerilir.
            </p>
        `;
    }
    else if(result.percent >= 80){

        text += `
            <p>
            Genel tablo güçlü görünmektedir.
            İlişkileri daha da güçlendirecek
            küçük iyileştirmeler yapılabilir.
            </p>
        `;
    }
    else if(result.percent >= 70){

        text += `
            <p>
            Olumlu özellikler dikkat çekmektedir.
            Bununla birlikte bazı alanlarda
            gelişim fırsatları bulunmaktadır.
            </p>
        `;
    }
    else if(result.percent >= 60){

        text += `
            <p>
            İletişim, anlayış ve karşılıklı destek
            konularına daha fazla odaklanılması
            faydalı olabilir.
            </p>
        `;
    }
    else{

        text += `
            <p>
            Sonuçlar belirgin gelişim alanları
            olduğunu göstermektedir.
            Küçük ve sürdürülebilir adımlarla
            ilişkiler önemli ölçüde
            iyileştirilebilir.
            </p>
        `;
    }

    text += buildCustomRecommendations(result);

    return text;

}

/* =====================================
   ÖZEL TAVSİYELER
===================================== */

function buildCustomRecommendations(result){

    const scores =
        result.categoryScores;

    let recommendations = [];

    for(const category in scores){

        const score = scores[category];

        if(score >= 65){
            continue;
        }

        switch(category){

            case "Duygusal Yakınlık":
            recommendations.push(
                "Birlikte kaliteli zaman artırılabilir."
            );
            break;

            case "Empati":
            recommendations.push(
                "Karşı tarafın duygularını anlamaya yönelik daha fazla aktif dinleme uygulanabilir."
            );
            break;

            case "Güvenilirlik":
            recommendations.push(
                "Verilen sözlerin yerine getirilmesi güveni artırabilir."
            );
            break;

            case "Öfke Kontrolü":
            recommendations.push(
                "Zor anlarda sakin iletişim teknikleri faydalı olabilir."
            );
            break;

            case "İletişim":
            recommendations.push(
                "Açık ve yargılamadan iletişim kurulması önerilir."
            );
            break;

            case "Destekleyicilik":
            recommendations.push(
                "Takdir ifadeleri ve teşvik artırılabilir."
            );
            break;

            case "Şefkat":
            recommendations.push(
                "Duygusal yakınlık ve sevgi ifadeleri artırılabilir."
            );
            break;

            case "Destek":
            recommendations.push(
                "Daha fazla teşvik ve moral desteği sağlanabilir."
            );
            break;

            case "Adalet":
            recommendations.push(
                "Kararlarda tutarlılık ve eşit yaklaşım güçlendirilebilir."
            );
            break;

            case "Aile İklimi":
            recommendations.push(
                "Aile bireylerinin birlikte geçirdiği zaman artırılabilir."
            );
            break;

            case "Nezaket":
            recommendations.push(
                "Günlük nezaket davranışları teşvik edilebilir."
            );
            break;

            case "Ev Sorumluluğu":
            recommendations.push(
                "Ev içi sorumluluklar daha düzenli paylaşılabilir."
            );
            break;

            case "Eğitim":
            recommendations.push(
                "Düzenli çalışma ve öğrenme alışkanlıkları desteklenebilir."
            );
            break;

            case "Aile İlişkileri":
            recommendations.push(
                "Aile içi iletişim ve paylaşım artırılabilir."
            );
            break;

            case "Karakter":
            recommendations.push(
                "Dürüstlük, sorumluluk ve yardımseverlik davranışları desteklenebilir."
            );
            break;

            case "Öz Disiplin":
            recommendations.push(
                "Zaman yönetimi ve öz denetim çalışmaları fayda sağlayabilir."
            );
            break;

        }

    }

    if(recommendations.length === 0){

        return `
            <h4>Öneriler</h4>
            <p>
            Belirgin bir gelişim alanı bulunmamaktadır.
            Mevcut olumlu davranışların sürdürülmesi önerilir.
            </p>
        `;

    }

    return `
        <h4>Öneriler</h4>

        <ul>
            ${recommendations
                .map(item => `<li>${item}</li>`)
                .join("")}
        </ul>
    `;

}