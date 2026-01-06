// =======================
// 角色資料（只放你目前真的有分析內容的）
// =======================
const characters = {
  harry: {
    name: "Harry Potter",
    house: "Gryffindor",
    houseImage: "images/gryffindor.png",
    image: "images/harry.png",
    analysis: {
      role: "團體中的行動核心",
      personality: "外在衝動、不太在乎規則，但對朋友極度重情重義。",
      inside: "在關鍵時刻，即使內心害怕，仍選擇站到最前面承擔風險。",
      learnTitle: "在恐懼中仍選擇行動",
      learnContent: "勇氣不是不害怕，而是在害怕時仍願意做正確的事。"
    }
  },

  hermione: {
    name: "Hermione Granger",
    house: "Gryffindor",
    houseImage: "images/gryffindor.png",
    image: "images/hermione.png",
    analysis: {
      role: "團體中的智囊與領導者",
      personality: "外在理性冷靜，對自己要求極高。",
      inside: "內心承擔龐大的責任感，害怕失誤卻仍不斷前進。",
      learnTitle: "不因出身限制自己",
      learnContent: "努力與智慧能打破任何標籤。"
    }
  },

  ron: {
    name: "Ron Weasley",
    house: "Gryffindor",
    houseImage: "images/gryffindor.png",
    image: "images/ron.png",
    analysis: {
      role: "團體中的情緒緩衝者",
      personality: "外在隨性幽默，看似不在乎。",
      inside: "其實內心容易自我懷疑，但仍選擇陪伴朋友。",
      learnTitle: "即使不自信仍選擇陪伴",
      learnContent: "重要的不是完美，而是願意留下來。"
    }
  },

  luna: {
    name: "Luna Lovegood",
    house: "Ravenclaw",
    houseImage: "images/ravenclaw.png",
    image: "images/luna.png",
    analysis: {
      role: "價值觀提醒者",
      personality: "外在獨特、不被理解。",
      inside: "內心穩定，對自我有高度認同。",
      learnTitle: "忠於自己",
      learnContent: "不急著被世界理解。"
    }
  },

  hagrid: {
    name: "Rubeus Hagrid",
    house: "Hufflepuff",
    houseImage: "images/hufflepuff.png",
    image: "images/hagrid.png",
    analysis: {
      role: "團體中的守護者",
      personality: "外在溫暖、重感情。",
      inside: "害怕傷害他人，卻願意為朋友承擔一切。",
      learnTitle: "溫柔也是一種力量",
      learnContent: "真正的強大，是選擇善良。"
    }
  }
};

// =======================
// 測驗頁邏輯
// =======================
const quizForm = document.getElementById("quizForm");
const submitBtn = document.getElementById("submitBtn");

if (quizForm && submitBtn) {
  submitBtn.addEventListener("click", () => {
    const formData = new FormData(quizForm);

    const characterScores = {};
    const houseScores = {};

    for (let value of formData.values()) {
      const keys = value.split(",");

      keys.forEach(key => {
        key = key.trim();

        // 如果是角色
        if (characters[key]) {
          characterScores[key] = (characterScores[key] || 0) + 1;
        }

        // 如果是學院
        if (["gryffindor", "ravenclaw", "hufflepuff", "slytherin"].includes(key)) {
          houseScores[key] = (houseScores[key] || 0) + 1;
        }
      });
    }

    if (Object.keys(characterScores).length === 0) {
      alert("至少選一題啦 🙃");
      return;
    }

    // 找最高分角色
    const resultCharacter = Object.keys(characterScores)
      .reduce((a, b) => characterScores[a] > characterScores[b] ? a : b);

    // 找最高分學院（可能沒有，就備用角色學院）
    let resultHouse = null;
    if (Object.keys(houseScores).length > 0) {
      resultHouse = Object.keys(houseScores)
        .reduce((a, b) => houseScores[a] > houseScores[b] ? a : b);
    }

    localStorage.setItem("hpCharacter", resultCharacter);
    localStorage.setItem("hpHouse", resultHouse);

    window.location.href = "result.html";
  });
}

// =======================
// 結果頁邏輯
// =======================
const resultContainer = document.getElementById("characterResult");

if (resultContainer) {
  const characterKey = localStorage.getItem("hpCharacter");
  const houseKey = localStorage.getItem("hpHouse");

  const c = characters[characterKey];

  if (!c) {
    resultContainer.innerHTML = "<p>沒有結果，世界線出問題。</p>";
  } else {
    const houseImage = houseKey
      ? `images/${houseKey}.png`
      : c.houseImage;

    const houseName = houseKey
      ? houseKey.charAt(0).toUpperCase() + houseKey.slice(1)
      : c.house;

    resultContainer.innerHTML = `
      <img src="${houseImage}" style="max-width:200px;margin-bottom:20px;">
      <h2>${c.name}</h2>
      <p><strong>House：</strong>${houseName}</p>

      <img src="${c.image}" style="max-width:300px;border-radius:16px;margin:20px 0;">

      <div class="card"><strong>團體角色</strong><p>${c.analysis.role}</p></div>
      <div class="card"><strong>外在表現</strong><p>${c.analysis.personality}</p></div>
      <div class="card"><strong>內在狀態</strong><p>${c.analysis.inside}</p></div>

      <div class="card highlight">
        <strong>👉 你可以向他看齊的地方：${c.analysis.learnTitle}</strong>
        <p>${c.analysis.learnContent}</p>
      </div>
    `;
  }
}
