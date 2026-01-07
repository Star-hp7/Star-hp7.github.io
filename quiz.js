// 1. 定義角色資料與學院資料
const characters = {
    // 角色特質與學習建議
    harry: { name: "哈利·波特", house: "葛萊分多", analysis: "勇敢、重情義，會在關鍵時刻挺身而出。", learn: "學習如何在巨大的壓力下依然保持良知與道德勇氣。" },
    hermione: { name: "妙麗·格蘭傑", house: "雷文克勞特質/葛萊分多", analysis: "理性努力，重視知識與責任，是團隊的腦袋。", learn: "學習如何將書本知識轉化為解決現實問題的行動力。" },
    ron: { name: "榮恩·衛斯理", house: "葛萊分多", analysis: "幽默溫暖，是朋友間最強大的情緒支柱。", learn: "學習在才華橫溢的朋友身邊，依然找到並肯定自己的價值。" },
    draco: { name: "德拉科·馬份", house: "史萊哲林", analysis: "重視尊嚴與地位，擅長計算與自我保護。", learn: "學習如何在家族期待與內心正義之間做出正確的抉擇。" },
    luna: { name: "露娜·羅古德", house: "雷文克勞", analysis: "忠於自我，擁有獨特且不被動搖的世界觀。", learn: "學習不在意他人的目光，優雅地擁抱自己的獨特性。" },
    snape: { name: "賽佛勒斯·石內卜", house: "史萊哲林", analysis: "情感深沉且極度忠誠，隱忍而強大。", learn: "學習如何保護深愛的事物，即便這需要付出極大的自我犧牲。" },
    
    // 學院特質
    gryffindor: { name: "葛萊分多學院", analysis: "勇氣、膽量、神經和騎士精神。", learn: "英雄主義並非盲目衝動，而是明知恐懼卻仍選擇前行。" },
    ravenclaw: { name: "雷文克勞學院", analysis: "智慧、學識與睿智。", learn: "真正的聰明是保持好奇心，並永遠尊重客觀的事實。" },
    hufflepuff: { name: "赫夫帕夫學院", analysis: "正直、忠誠、勤奮與不畏艱辛。", learn: "平凡中的堅持才是最不平凡的力量，友誼比競爭更重要。" },
    slytherin: { name: "史萊哲林學院", analysis: "雄心、精明與強大的領導力。", learn: "善用資源與謀略來達成目標，並學會保護你所珍視的人。" }
};

document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.getElementById("quizForm");
    const submitBtn = document.getElementById("submitBtn");
    const resultDiv = document.getElementById("result");

    // --- 邏輯 A：處理題目提交 (quiz.html 執行) ---
    if (submitBtn && quizForm) {
        submitBtn.addEventListener("click", () => {
            const formData = new FormData(quizForm);
            const scores = {};
            let count = 0;

            for (let value of formData.values()) {
                count++;
                // 你要求的：一個選項對應多個積分 (如 "harry,gryffindor")
                value.split(",").forEach(key => {
                    const cleanKey = key.trim();
                    scores[cleanKey] = (scores[cleanKey] || 0) + 1;
                });
            }

            if (count < 10) {
                alert("測驗還沒完成喔！請選好所有 10 個題目。");
                return;
            }

            // 分別計算【角色】跟【學院】的高分
            const roleKeys = ["harry", "hermione", "ron", "draco", "luna", "snape"];
            const houseKeys = ["gryffindor", "ravenclaw", "hufflepuff", "slytherin"];

            const topRole = roleKeys.reduce((a, b) => (scores[a] || 0) > (scores[b] || 0) ? a : b);
            const topHouse = houseKeys.reduce((a, b) => (scores[a] || 0) > (scores[b] || 0) ? a : b);

            // 將結果存入 localStorage
            localStorage.setItem("hp_role", topRole);
            localStorage.setItem("hp_house", topHouse);

            // 跳轉到結果頁
            window.location.href = "result.html";
        });
    }

    // --- 邏輯 B：顯示多重結果 (result.html 執行) ---
    if (resultDiv) {
        const roleKey = localStorage.getItem("hp_role");
        const houseKey = localStorage.getItem("hp_house");

        if (roleKey && houseKey && characters[roleKey] && characters[houseKey]) {
            resultDiv.innerHTML = `
                <h1 style="color: #ffd700;">測驗結果報告</h1>
                
                <div class="result-box">
                    <h2 style="color: #4facfe;">✨ 靈魂角色：${characters[roleKey].name}</h2>
                    <p><b>性格分析：</b>${characters[roleKey].analysis}</p>
                    <p style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px;">
                        💡 <b>你可以學習的地方：</b><br>${characters[roleKey].learn}
                    </p>
                </div>

                <div class="result-box" style="margin-top: 20px; border-top: 1px dashed #4facfe; padding-top: 20px;">
                    <h2 style="color: #ffd700;">🏰 所屬學院：${characters[houseKey].name}</h2>
                    <p><b>學院精神：</b>${characters[houseKey].analysis}</p>
                    <p><b>給你的建議：</b>${characters[houseKey].learn}</p>
                </div>

                <a href="quiz.html" class="btn" style="display:inline-block; margin-top:30px; text-decoration:none;">重新測驗</a>
            `;
        } else {
            resultDiv.innerHTML = `<h2>糟糕！找不到測驗紀錄。</h2><a href="quiz.html">點我回首頁</a>`;
        }
    }
});
