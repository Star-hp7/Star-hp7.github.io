const quizForm = document.getElementById('quizForm');
const submitBtn = document.getElementById('submitBtn');
const resultContainer = document.getElementById('characterResult');

const characters = {
  harry:{name:"Harry Potter",image:"images/harry.png",analysis:["團體中的行動核心","Gryffindor學院","外在衝動、內在義氣勇氣","你可以看齊：勇於做「對的選擇」"]},
  hermione:{name:"Hermione Granger",image:"images/hermione.png",analysis:["團體中的智囊 / 領導者","Gryffindor (偏Ravenclaw)","外在理性、內在焦慮型責任感","你可以看齊：不因出身或眼光限制自己"]},
  ron:{name:"Ron Weasley",image:"images/ron.png",analysis:["團體中的情緒緩衝 / 搞笑者","Gryffindor","外在隨性、內在自我懷疑","你可以看齊：即使不自信仍陪伴他人"]},
  draco:{name:"Draco Malfoy",image:"images/draco.png",analysis:["防禦型 / 衝突製造者","Slytherin","外在傲慢、內在脆弱恐懼","你可以看齊：承認恐懼不等於弱點"]},
  luna:{name:"Luna Lovegood",image:"images/luna.png",analysis:["觀點提供者 / 價值提醒者","Ravenclaw","外在怪異、內在自我認同高","你可以看齊：不急於被理解或否定自己"]},
  fredgeorge:{name:"Fred & George",image:"images/fredgeorge.png",analysis:["壓力釋放 / 士氣維持者","Gryffindor","外在胡鬧、內在高度同理","你可以看齊：用幽默緩解壓力與氛圍"]},
  snape:{name:"Severus Snape",image:"images/snape.png",analysis:["幕後守護者","Slytherin","外在冷漠、內在忠誠深情","你可以看齊：愛不需被看見但選擇很重要"]},
  hagrid:{name:"Hagrid",image:"images/hagrid.png",analysis:["暖男 / 團體護衛","Gryffindor","外在高大溫暖、內在情感細膩","你可以看齊：關心他人且實際付出"]},
  dumbledore:{name:"Dumbledore",image:"images/dumbledore.png",analysis:["智慧指引 / 領導核心","Gryffindor","外在和藹、內在深思熟慮","你可以看齊：學習預見與智慧引導"]},
  voldemort:{name:"Voldemort",image:"images/voldemort.png",analysis:["對立 / 高風險角色","Slytherin","外在魅力、內在極端自我","你可以看齊：理解極端心態的後果"]},
  sirius:{name:"Sirius Black",image:"images/sirius.png",analysis:["自由精神 / 靈魂伴侶","Gryffindor","外在瀟灑、內在忠誠","你可以看齊：保持自由精神且忠於自己"]},
  ginny:{name:"Ginny Weasley",image:"images/ginny.png",analysis:["行動者 / 團體動力","Gryffindor","外在勇敢、敢愛敢恨","你可以看齊：勇於表達與行動"]}
};

submitBtn.addEventListener('click', () => {
  const formData = new FormData(quizForm);
  const scores = {};

  for (let value of formData.values()) {
    if (!scores[value]) scores[value] = 0;
    scores[value]++;
  }

  if (Object.keys(scores).length === 0) {
    alert("你至少要選幾題吧，別這麼叛逆");
    return;
  }

  let maxScore = 0;
  let resultKey = null;

  for (let key in scores) {
    if (scores[key] > maxScore) {
      maxScore = scores[key];
      resultKey = key;
    }
  }

  // 🔥 把結果存起來
  localStorage.setItem("hpResult", resultKey);

  // 🔥 跳到結果頁
  window.location.href = "result.html";
});

// 只有在 result.html 才會執行
if (resultContainer) {
  const resultKey = localStorage.getItem("hpResult");
  const character = characters[resultKey];

  if (!character) {
    resultContainer.innerHTML = "<p>找不到結果，你是不是亂來。</p>";
  } else {
    resultContainer.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" style="max-width:300px;border-radius:16px;">
      <ul>
        ${character.analysis.map(a => `<li>${a}</li>`).join("")}
      </ul>
    `;
  }
}
