// 1. 定義所有可能的結果資料
const characters = {
  harry: { name: "Harry Potter", analysis: "勇敢、重情義，會在關鍵時刻挺身而出。" },
  hermione: { name: "Hermione Granger", analysis: "理性努力，重視知識與責任。" },
  ron: { name: "Ron Weasley", analysis: "幽默溫暖，是朋友間的情緒支柱。" },
  ginny: { name: "Ginny Weasley", analysis: "真誠勇敢，情感強烈。" },
  draco: { name: "Draco Malfoy", analysis: "重視尊嚴與地位，擅長計算與自我保護。" },
  luna: { name: "Luna Lovegood", analysis: "忠於自我，擁有獨特世界觀。" },
  hagrid: { name: "Hagrid", analysis: "善良溫暖，願意保護弱小。" },
  fredgeorge: { name: "Fred & George", analysis: "用幽默對抗壓力，重情義。" },
  sirius: { name: "Sirius Black", analysis: "追求自由，不受規則束縛。" },
  snape: { name: "Severus Snape", analysis: "情感深沉，極度忠誠。" },
  dumbledore: { name: "Albus Dumbledore", analysis: "智慧而謹慎，擅長長遠布局。" },
  voldemort: { name: "Voldemort", analysis: "追求掌控與力量，害怕失去。" },
  gryffindor: { name: "葛萊分多學院", analysis: "你擁有獅子般的勇氣、大膽與騎士精神！" },
  ravenclaw: { name: "雷文克勞學院", analysis: "智慧、好學與睿智是你的代名詞。" },
  hufflepuff: { name: "赫夫帕夫學院", analysis: "正直、忠誠且勤奮工作的你，是最可靠的夥伴。" },
  slytherin: { name: "史萊哲林學院", analysis: "野心勃勃、精明且重視榮譽，你總能達成目標。" }
};

document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quizForm");
  const submitBtn = document.getElementById("submitBtn");
  const resultDiv = document.getElementById("result");

  // --- 頁面邏輯 A：題目卷頁面 (quiz.html) ---
  if (submitBtn && quizForm) {
    submitBtn.addEventListener("click", () => {
      const formData = new FormData(quizForm);
      const scores = {};
      let count = 0;

      // 遍歷所有選中的選項
      for (let value of formData.values()) {
        count++;
        // 核心功能：支援 value="harry,gryffindor" 這種多重權重
        const tags = value.split(","); 
        tags.forEach(tag => {
          const key = tag.trim();
          scores[key] = (scores[key] || 0) + 1;
        });
      }

      if (count < 10) {
        alert("還沒寫完喔！請填滿 10 題再送出 🙃");
        return;
      }

      // 計算得分最高的 Key
      const resultKey = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
      
      // 存入瀏覽器快取並跳轉
      localStorage.setItem("hpResult", resultKey);
      window.location.href = "result.html";
    });
  }

  // --- 頁面邏輯 B：結果頁面 (result.html) ---
  if (resultDiv) {
    const key = localStorage.getItem("hpResult");
    
    if (key && characters[key]) {
      resultDiv.innerHTML = `
        <div class="result-card">
          <h1>測驗結果</h1>
          <h2 style="font-size: 2.5rem; color: #ffd700;">${characters[key].name}</h2>
          <p style="font-size: 1.2rem; line-height: 1.6; margin: 20px 0;">${characters[key].analysis}</p>
          <a href="quiz.html" class="btn">再測一次</a>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `
        <h1>哎呀！</h1>
        <p>找不到測驗資料，請重新測試一次。</p>
        <a href="quiz.html" class="btn">回到首頁</a>
      `;
    }
  }
});
