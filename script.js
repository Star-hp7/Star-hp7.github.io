const artists = {
    sabrina: { name: "Sabrina Carpenter", desc: "你充滿自信、俏皮且時尚。你喜歡輕快、帶點幽默感的流行樂，最適合聽《Espresso》！" },
    olivia: { name: "Olivia Rodrigo", desc: "你情感豐富且真實。你不怕展現自己的脆弱或憤怒，最適合聽《GUTS》專輯。" },
    gracie: { name: "Gracie Abrams", desc: "你心思細膩、內斂。你喜歡在安靜的深夜獨自思考，最適合聽她細碎動人的情歌。" },
    billie: { name: "Billie Eilish", desc: "你獨一無二，擁有強烈的個人風格。你喜歡探索深層的情感，最適合聽《HIT ME HARD AND SOFT》。" },
    taylor: { name: "Taylor Swift", desc: "你是個天生的說故事者，重視友情與回憶。你的生活就像一場華麗的時代巡迴演唱會！" },
    justin: { name: "Justin Bieber", desc: "你熱愛節奏、充滿律動感。你是一個感性與節奏感兼具的人，最適合聽他的流行金曲。" },
    ed: { name: "Ed Sheeran", desc: "你純樸、溫暖且深情。你不需要華麗的外表，簡單的吉他聲就能打動你的心。" },
    shawn: { name: "Shawn Mendes", desc: "你陽光、真誠且熱情。你擁有溫柔的力量，適合聽那些充滿能量的流行民謠。" }
};

document.getElementById("submitBtn").addEventListener("click", () => {
    const form = document.getElementById("quizForm");
    const formData = new FormData(form);
    const scores = {};
    let count = 0;

    for (let value of formData.values()) {
        count++;
        value.split(",").forEach(tag => {
            scores[tag] = (scores[tag] || 0) + 1;
        });
    }

    if (count < 7) {
        alert("請回答完所有問題喔！");
        return;
    }

    // 找出最高分
    const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    // 切換顯示結果
    document.getElementById("quiz-page").classList.add("hidden");
    document.getElementById("result-page").classList.remove("hidden");
    document.getElementById("artist-name").innerText = artists[winner].name;
    document.getElementById("artist-desc").innerText = artists[winner].desc;
});
