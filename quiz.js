const characters = {
  harry:{
    name:"Harry Potter",
    house:"Gryffindor",
    houseImage:"images/gryffindor.png",
    image:"images/harry.png",
    analysis:{
      role:"團體中的行動核心",
      personality:"衝動但重情重義",
      inside:"即使害怕仍選擇站出來",
      learnTitle:"在恐懼中仍選擇行動",
      learnContent:"你可以學習在不安時仍勇敢踏出一步。"
    }
  },
  hermione:{
    name:"Hermione Granger",
    house:"Gryffindor",
    houseImage:"images/gryffindor.png",
    image:"images/hermione.png",
    analysis:{
      role:"智囊型角色",
      personality:"理性、努力",
      inside:"對自己要求極高",
      learnTitle:"相信自己的價值",
      learnContent:"不要因為背景而低估自己。"
    }
  },
  draco:{
    name:"Draco Malfoy",
    house:"Slytherin",
    houseImage:"images/slytherin.png",
    image:"images/draco.png",
    analysis:{
      role:"防禦型 / 衝突者",
      personality:"外表強硬",
      inside:"其實充滿不安",
      learnTitle:"承認恐懼不是弱點",
      learnContent:"面對內心比攻擊他人更重要。"
    }
  }
};

// ===== 測驗頁 =====
const quizForm = document.getElementById("quizForm");
const submitBtn = document.getElementById("submitBtn");

if (quizForm && submitBtn) {
  submitBtn.addEventListener("click", () => {
    const formData = new FormData(quizForm);
    const scores = {};

    for (let v of formData.values()) {
      scores[v] = (scores[v] || 0) + 1;
    }

    if (Object.keys(scores).length === 0) {
      alert("至少選一題啦 🙃");
      return;
    }

    const resultKey = Object.keys(scores)
      .reduce((a,b)=> scores[a]>scores[b]?a:b);

    localStorage.setItem("hpResult", resultKey);
    window.location.href = "result.html";
  });
}

// ===== 結果頁 =====
const resultDiv = document.getElementById("characterResult");
if (resultDiv) {
  const key = localStorage.getItem("hpResult");
  const c = characters[key];

  resultDiv.innerHTML = c ? `
    <img src="${c.houseImage}" class="house-img">
    <h2>${c.name}</h2>
    <img src="${c.image}" class="char-img">

    <p><strong>團體角色：</strong>${c.analysis.role}</p>
    <p><strong>外在性格：</strong>${c.analysis.personality}</p>
    <p><strong>內在狀態：</strong>${c.analysis.inside}</p>

    <h3>你可以向他學習：</h3>
    <p>➜ ${c.analysis.learnTitle}</p>
    <p>${c.analysis.learnContent}</p>
  ` : "<p>沒有結果</p>";
}

