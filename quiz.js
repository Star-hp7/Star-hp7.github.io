// 將資料放在最外面，確保全域可存取
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
  // 加入學院選項的基礎分析，避免出錯
  gryffindor: { name: "Gryffindor 學院", analysis: "你擁有獅子般的勇氣與膽量！" },
  ravenclaw: { name: "Ravenclaw 學院", analysis: "你的智慧與睿智讓你出類拔萃。" },
  hufflepuff: { name: "Hufflepuff 學院", analysis: "正直、忠誠且勤奮是你的座右銘。" },
  slytherin: { name: "Slytherin 學院", analysis: "野心勃勃且精明，你總能達成目標。" }
};

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitBtn");
  const quizForm = document.getElementById("quizForm");

  // 只有在有按鈕的頁面（quiz.html）才執行這段
  if (submitBtn && quizForm) {
    submitBtn.addEventListener("click", () => {
      const formData = new FormData(quizForm);
      const scores = {};
      let questionCount = 0;

      for (let value of formData.values()) {
        questionCount++;
        value.split(",").forEach(key => {
          scores[key] = (scores[key] || 0) + 1;
        });
      }

      // 檢查是否所有題目都做了（總共 10 題）
      if (questionCount < 10) {
        alert("還有題目沒寫完喔！請填滿 10 個問題 🙃");
        return;
      }

      const resultKey = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

      localStorage.setItem("hpResult", resultKey);
      window.location.href = "result.html";
    });
  }

  // 如果是在結果頁面
  const resultDiv = document.getElementById("result");
  if (resultDiv) {
    const key = localStorage.getItem("hpResult");
    if (!key || !characters[key]) {
      resultDiv.innerHTML = "<h2>結果讀取失敗，快回去重測一次！</h2><a href='quiz.html' class='start-btn'>返回測試</a>";
    } else {
      resultDiv.innerHTML = `
        <h1>你的測驗結果</h1>
        <div class="result-card">
          <h2 class="character-name">${characters[key].name}</h2>
          <p class="analysis">${characters[key].analysis}</p>
        </div>
        <a href="quiz.html" class="start-btn">再測一次</a>
      `;
    }
  }
});
