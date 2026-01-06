// =======================
// 有分析內容的角色（只有這些可以當最終結果）
// =======================
const characters = {
  harry: {
    name: "Harry Potter",
    house: "gryffindor",
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
    house: "gryffindor",
    houseImage: "images/gryffindor.png",
    image: "images/hermione.png",
    analysis: {
      role: "團體中的智囊",
      personality: "理性、嚴謹、對自己要求極高。",
      inside: "害怕犯錯，但仍選擇承擔責任。",
      learnTitle: "知識是力量",
      learnContent: "努力與智慧能突破出身限制。"
    }
  },
  ron: {
    name: "Ron Weasley",
    house: "gryffindor",
    houseImage: "images/gryffindor.png",
    image: "images/ron.png",
    analysis: {
      role: "情緒支持者",
      personality: "幽默、隨性。",
      inside: "其實很容易自我懷疑。",
      learnTitle: "留下來本身就是勇氣",
      learnContent: "你不需要完美才能重要。"
    }
  },
  luna: {
    name: "Luna Lovegood",
    house: "ravenclaw",
    houseImage: "images/ravenclaw.png",
    image: "images/luna.png",
    analysis: {
      role: "價值觀提醒者",
      personality: "獨特、不迎合主流。",
      inside: "對自我非常篤定。",
      learnTitle: "忠於自己",
      learnContent: "你不需要被所有人理解。"
    }
  },
  hagrid: {
    name: "Rubeus Hagrid",
    house: "hufflepuff",
    houseImage: "images/hufflepuff.png",
    image: "images/hagrid.png",
    analysis: {
      role: "守護者",
      personality: "溫暖、善良。",
      inside: "害怕傷害他人。",
      learnTitle: "溫柔是力量",
      learnContent: "選擇善良本身就很強大。"
    }
  }
};

// =======================
// 測驗頁
// =======================
const quizForm = document.getElementById("quizForm");
const submitBtn = document.getElementById("submitBtn");

if (quizForm && submitBtn) {
  submitBtn.addEventListener("click", () => {
    const formData = new FormData(quizForm);

    const rawCharacterScores = {};
    const houseScores = {};

    for (let value of formData.values()) {
      value.split(",").forEach(key => {
        key = key.trim();

        // 記錄所有角色（包含沒寫分析的）
        rawCharacterScores[key] = (rawCharacterScores[key] || 0) + 1;

        // 記錄學院
        if (["gryffindor", "ravenclaw", "hufflepuff", "slytherin"].includes(key)) {
          houseScores[key] = (houseScores[key] || 0) + 1;
        }
      });
    }

    // 只留下「有分析內容的角色」
    const validCharacterScores = {};
    Object.keys(rawCharacterScores).forEach(key => {
      if (characters[key]) {
        validCharacterScores[key] = rawCharacterScores[key];
      }
    });

    let finalCharacterKey = null;

    if (Object.keys(validCharacterScores).length > 0) {
      finalCharacterKey = Object.keys(validCharacterScores)
        .reduce((a, b) =>
          validCharacterScores[a] > validCharacterScores[b] ? a : b
        );
    } else {
      // 沒任何角色 → 用學院兜底
      const topHouse = Object.keys(houseScores)
        .reduce((a, b) => houseScores[a] > houseScores[b] ? a : b);

      const fallbackMap = {
        gryffindor: "harry",
        ravenclaw: "luna",
        hufflepuff: "hagrid",
        slytherin: "harry" // 沒寫 Snape / Draco 時的安全備用
      };

      finalCharacterKey = fallbackMap[topHouse];
    }

    localStorage.setItem("hpCharacter", finalCharacterKey);
    window.location.href = "result.html";
  });
}

// =======================
// 結果頁
// =======================
const resultContainer = document.getElementById("characterResult");

if (resultContainer) {
  const key = localStorage.getItem("hpCharacter");
  const c = characters[key];

  if (!c) {
    resultContainer.innerHTML = "<p>結果異常，但不是你的錯。</p>";
    return;
  }

  resultContainer.innerHTML = `
    <img src="${c.houseImage}" style="max-width:200px;">
    <h2>${c.name}</h2>
    <img src="${c.image}" style="max-width:300px;border-radius:16px;">
    <div class="card"><strong>團體角色</strong><p>${c.analysis.role}</p></div>
    <div class="card"><strong>外在表現</strong><p>${c.analysis.personality}</p></div>
    <div class="card"><strong>內在狀態</strong><p>${c.analysis.inside}</p></div>
    <div class="card highlight">
      <strong>${c.analysis.learnTitle}</strong>
      <p>${c.analysis.learnContent}</p>
    </div>
  `;
}
