const characters = {
  harry: {
    name: "Harry Potter",
    house: "Gryffindor",
    analysis: "你傾向在關鍵時刻挺身而出，即使害怕也願意承擔風險。你重視正義與友情，行動常快於思考，但你的初心很純粹。"
  },
  hermione: {
    name: "Hermione Granger",
    house: "Gryffindor",
    analysis: "你理性、努力，遇到問題會先思考再行動。你相信知識能帶來改變，也願意為正確的事承擔責任。"
  },
  ron: {
    name: "Ron Weasley",
    house: "Gryffindor",
    analysis: "你重視友情，善於用幽默化解緊張。雖然有時不自信，但你總是在朋友最需要時留下來。"
  },
  ginny: {
    name: "Ginny Weasley",
    house: "Gryffindor",
    analysis: "你勇敢而真誠，情感強烈但不軟弱。你願意為愛與信念奮力一搏。"
  },
  draco: {
    name: "Draco Malfoy",
    house: "Slytherin",
    analysis: "你有強烈的自我意識與防衛心，重視地位與尊嚴。你習慣精密計算，其實內心比外表脆弱。"
  },
  luna: {
    name: "Luna Lovegood",
    house: "Ravenclaw",
    analysis: "你忠於自我、不迎合主流。你用獨特視角看世界，即使不被理解，也依然堅定。"
  },
  hagrid: {
    name: "Rubeus Hagrid",
    house: "Hufflepuff",
    analysis: "你溫暖善良，總是想保護他人。你相信每個人都值得被善待。"
  },
  fredgeorge: {
    name: "Fred & George Weasley",
    house: "Gryffindor",
    analysis: "你用幽默對抗壓力，讓身邊的人感到輕鬆。你看似玩世不恭，其實非常重情義。"
  },
  sirius: {
    name: "Sirius Black",
    house: "Gryffindor",
    analysis: "你追求自由，不喜歡被規則束縛。你重視情感，為在乎的人可以不顧一切。"
  },
  snape: {
    name: "Severus Snape",
    house: "Slytherin",
    analysis: "你情感深沉、極度忠誠。你不輕易表露真心，但一旦承諾，就會默默承擔到底。"
  },
  dumbledore: {
    name: "Albus Dumbledore",
    house: "Gryffindor",
    analysis: "你重視智慧與長遠布局，擅長觀察人性。你知道力量的危險，因此選擇節制。"
  },
  voldemort: {
    name: "Lord Voldemort",
    house: "Slytherin",
    analysis: "你極度追求掌控與力量，害怕失去。你渴望不被忽視，但選擇了極端的方式。"
  }
};

const submitBtn = document.getElementById("submitBtn");
const quizForm = document.getElementById("quizForm");

submitBtn.addEventListener("click", () => {
  const formData = new FormData(quizForm);
  const scores = {};

  for (let value of formData.values()) {
    value.split(",").forEach(key => {
      scores[key] = (scores[key] || 0) + 1;
    });
  }

  const resultKey = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  localStorage.setItem("hpResult", resultKey);
  window.location.href = "result.html";
});
