const HOT_TOPICS = [
  {
    category: "model",
    date: "2026-03-01",
    title: "新一代多模态模型发布：文本、图像、语音统一理解",
    summary: "支持实时语音对话与图像推理，重点提升复杂任务分解与长上下文能力。",
    link: "https://example.com/multimodal-model",
  },
  {
    category: "tool",
    date: "2026-02-27",
    title: "开源 AI Agent 框架更新：支持并行工具调用",
    summary: "新增任务编排面板，显著提升自动化工作流效率，适用于研发与运营场景。",
    link: "https://example.com/agent-framework",
  },
  {
    category: "industry",
    date: "2026-02-25",
    title: "AI 在医疗影像中的应用进入规模化试点",
    summary: "多家三甲医院试点智能阅片系统，提升筛查速度并降低误诊率。",
    link: "https://example.com/ai-healthcare",
  },
  {
    category: "learn",
    date: "2026-02-22",
    title: "热门课程：从零搭建企业级 RAG 知识库",
    summary: "覆盖数据清洗、向量检索、重排序与评估指标，附完整实践项目。",
    link: "https://example.com/rag-course",
  },
  {
    category: "tool",
    date: "2026-02-20",
    title: "AI 设计助手上线：一键生成品牌视觉方案",
    summary: "支持风格迁移与自动排版，面向市场与品牌团队快速出稿。",
    link: "https://example.com/design-assistant",
  },
  {
    category: "industry",
    date: "2026-02-18",
    title: "制造业引入视觉质检大模型：良率提升明显",
    summary: "结合边缘计算与视觉识别，帮助工厂缩短异常检测时间。",
    link: "https://example.com/vision-inspection",
  },
];

const categoryText = {
  all: "全部",
  model: "模型更新",
  tool: "工具发布",
  industry: "行业应用",
  learn: "学习资源",
};

const cardsElement = document.getElementById("cards");
const searchInput = document.getElementById("searchInput");
const chips = Array.from(document.querySelectorAll(".chip"));
let activeCategory = "all";

function renderCards() {
  const query = searchInput.value.trim().toLowerCase();

  const list = HOT_TOPICS.filter((item) => {
    const byCategory = activeCategory === "all" || item.category === activeCategory;
    const byQuery =
      query.length === 0 ||
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query);
    return byCategory && byQuery;
  });

  cardsElement.innerHTML = "";

  if (list.length === 0) {
    cardsElement.innerHTML = `<p>没有匹配结果，请尝试其他关键词。</p>`;
    return;
  }

  const template = document.getElementById("cardTemplate");

  list.forEach((item) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector(".tag").textContent = categoryText[item.category];
    card.querySelector("time").textContent = item.date;
    card.querySelector("h2").textContent = item.title;
    card.querySelector("p").textContent = item.summary;
    card.querySelector(".link").href = item.link;
    cardsElement.appendChild(card);
  });
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeCategory = chip.dataset.category;
    chips.forEach((node) => node.classList.toggle("active", node === chip));
    renderCards();
  });
});

searchInput.addEventListener("input", renderCards);

renderCards();
