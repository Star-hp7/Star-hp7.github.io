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
  voldemort: { name: "Voldemort", analysis: "追求掌控與力量，害怕失去。" }
};

document.addEventListener("DOMContentLoaded", () => {

  const submitBtn = document.getElementById("submitBtn");
  const quizForm = document.getElementById("quizForm");

  if (submitBtn && quizForm) {
    submitBtn.addEventListener("click", () => {
      const formData = new FormData(quizForm);
      const scores = {};

      for (let value of formData.values()) {
        value.split(",").forEach(key => {
          scores[key] = (scores[key] || 0) + 1;
        });
      }

      if (Object.keys(scores).length === 0) {
        alert("至少選一題啦 🙃");
        return;
      }

      const resultKey = Object.keys(scores)
        .reduce((a, b) => scores[a] > scores[b] ? a : b);

      localStorage.setItem("hpResult", resultKey);
      window.location.href = "result.html";
    });
  }

});
