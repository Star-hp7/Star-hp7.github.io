const characters = {
  harry:{name:"Harry Potter",image:"images/harry.png",analysis:["團體中的行動核心","Gryffindor","外在衝動、內在義氣勇氣","你可以看齊：勇於做對的選擇"]},
  hermione:{name:"Hermione Granger",image:"images/hermione.png",analysis:["團體中的智囊 / 領導者","Gryffindor / Ravenclaw","外在理性、內在責任焦慮","你可以看齊：不因出身限制自己"]},
  ron:{name:"Ron Weasley",image:"images/ron.png",analysis:["團體氣氛製造者","Gryffindor","外在隨性、內在自我懷疑","你可以看齊：即使不自信仍選擇陪伴"]},
  draco:{name:"Draco Malfoy",image:"images/draco.png",analysis:["防禦型角色","Slytherin","外在尖銳、內在恐懼","你可以看齊：承認脆弱"]},
  luna:{name:"Luna Lovegood",image:"images/luna.png",analysis:["價值提醒者","Ravenclaw","外在怪異、內在穩定","你可以看齊：忠於自己"]},
  fredgeorge:{name:"Fred & George",image:"images/fredgeorge.png",analysis:["團體士氣核心","Gryffindor","外在胡鬧、內在溫柔","你可以看齊：用幽默承接世界"]},
  snape:{name:"Severus Snape",image:"images/snape.png",analysis:["幕後守護者","Slytherin","外在冷漠、內在深情","你可以看齊：選擇比表現重要"]},
  hagrid:{name:"Hagrid",image:"images/hagrid.png",analysis:["團體守護者","Gryffindor","外在巨大、內在溫柔","你可以看齊：用行動照顧他人"]},
  dumbledore:{name:"Dumbledore",image:"images/dumbledore.png",analysis:["智慧領導","Gryffindor","外在慈祥、內在深謀","你可以看齊：用智慧而非控制"]},
  voldemort:{name:"Voldemort",image:"images/voldemort.png",analysis:["極端對照角色","Slytherin","外在魅力、內在空洞","你可以看齊：理解權力的代價"]},
  sirius:{name:"Sirius Black",image:"images/sirius.png",analysis:["自由靈魂","Gryffindor","外在瀟灑、內在忠誠","你可以看齊：不被體制磨掉靈魂"]},
  ginny:{name:"Ginny Weasley",image:"images/ginny.png",analysis:["行動者","Gryffindor","外在勇敢、敢愛敢恨","你可以看齊：勇於表達"]},
};

// =======================
// 測驗頁 quiz.html 才跑
// =======================
const quizForm = document.getElementById("quizForm");
const submitBtn = document.getElementById("submitBtn");

if (quizForm && submitBtn) {
  submitBtn.addEventListener("click", () => {
    const formData = new FormData(quizForm);
    const scores = {};

    for (let value of formData.values()) {
      scores[value] = (scores[value] || 0) + 1;
    }

    if (Object.keys(scores).length === 0) {
      alert("你至少選一題啦，不要測空氣");
      return;
    }

    let resultKey = Object.keys(scores)
      .reduce((a, b) => scores[a] > scores[b] ? a : b);

    localStorage.setItem("hpResult", resultKey);
    window.location.href = "result.html";
  });
}

// =======================
// 結果頁 result.html 才跑
// =======================
const resultContainer = document.getElementById("characterResult");

if (resultContainer) {
  const key = localStorage.getItem("hpResult");
  const c = characters[key];

  resultContainer.innerHTML = c ? `
    <h2>${c.name}</h2>
    <img src="${c.image}" style="max-width:300px;border-radius:16px;">
    <ul>${c.analysis.map(i => `<li>${i}</li>`).join("")}</ul>
  ` : "<p>沒有結果，你可能把世界線搞壞了。</p>";
}
