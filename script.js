const students = {
  zhang: {
    id: "2023230208",
    avatar: "张",
    name: "张晨曦",
    className: "计算机 2302",
    defaultScenario: "academic",
    tags: "学业压力 出勤波动 实验报告积压",
    meta: "计算机 2302 · 近期出勤波动 · 实验报告积压",
    goal: "了解近期学习和生活状态，协助学生拆解补交任务，明确一周内可执行的恢复计划。",
    info: ["连续两周作业延迟", "任课老师、班导师", "学业压力、睡眠不规律", "需拆分补交任务"],
    history: [
      ["2026-06-01", "学业状态跟进", "任课老师反馈学生数据结构实验报告未提交，近两周课堂参与度下降。"],
      ["2026-05-20", "职业方向沟通", "学生表示对专业方向有犹豫，担心自己基础不够，建议班导师补充项目路径建议。"]
    ],
    prepare: [
      "开场先说明谈话目的为支持和了解，降低学生对“被批评”的防御感。",
      "围绕数据结构实验报告、缺勤和睡眠三个事实澄清压力链条。",
      "把补交任务拆成今晚列提纲、明晚完成核心代码、周五提交初稿三个节点。"
    ],
    live: [
      "学生已经表达“越拖越不敢上课”，建议老师先共情回避感，再把问题收窄到一个可完成任务。",
      "可以现场和学生确认实验报告的最低提交要求，避免目标过大导致继续拖延。",
      "学生提到睡眠受影响，建议谈话后安排一周内短复盘，观察作息是否恢复。"
    ]
  },
  chen: {
    id: "2022220106",
    avatar: "陈",
    name: "陈嘉宁",
    className: "英语 2201",
    defaultScenario: "career",
    tags: "就业规划 简历未完成 方向犹豫",
    meta: "英语 2201 · 就业规划犹豫 · 简历未完成",
    goal: "帮助学生澄清求职方向，形成一份可执行的简历完善和岗位探索计划。",
    info: ["实习投递停滞", "就业指导中心、专业导师", "方向不清晰、表达焦虑", "建议补充项目经历"],
    history: [["2026-05-28", "就业意向沟通", "学生对考研和就业摇摆，尚未形成明确选择。"]],
    prepare: ["先澄清学生更看重稳定性、成长性还是专业匹配。", "用两个岗位样例帮助学生比较。", "约定三天内完成简历经历补充。"],
    live: ["当学生表达迷茫时，把问题转成偏好排序。", "现场记录两个可投递岗位。", "将考研与就业拆成并行信息收集任务。"]
  },
  lin: {
    id: "2024240311",
    avatar: "林",
    name: "林一航",
    className: "机械 2403",
    defaultScenario: "dorm",
    tags: "新生适应 宿舍关系 人际沟通",
    meta: "机械 2403 · 新生适应 · 宿舍关系紧张",
    goal: "了解学生入学适应情况，缓解宿舍沟通压力，建立稳定的校园支持网络。",
    info: ["宿舍反馈一般", "班委、宿管、心理中心", "适应压力、人际沟通", "建议建立支持清单"],
    history: [["2026-05-30", "生活适应访谈", "学生表示与室友作息不同，沟通时容易回避。"]],
    prepare: ["从生活节奏和宿舍作息切入。", "引导学生描述具体场景。", "约定一次低压力沟通尝试。"],
    live: ["先确认学生希望被怎样支持。", "把宿舍沟通建议具体到一句话和一个时间点。", "记录可求助对象。"]
  }
};

const scenarioTemplates = {
  academic: {
    label: "学业预警",
    hint: "适用于缺勤、作业积压、考试预警等学业风险场景。",
    goal: "了解近期学习和生活状态，协助学生拆解当前积压任务，明确一周内可执行的学业恢复计划。",
    prepare: (student) => [
      `开场先说明谈话目的为支持和了解，降低${student.name}对“被批评”的防御感。`,
      "围绕缺勤、作业积压、睡眠作息三个事实澄清压力链条。",
      "把本周任务拆成可执行节点，并约定一个可检查的提交物。"
    ],
    live: [
      "学生已表达回避或拖延压力，建议老师先共情，再把问题收窄到一个可完成任务。",
      "可现场确认最低完成标准，避免目标过大导致继续拖延。",
      "谈话结束前同步生成复盘节点，跟进作息、出勤和任务完成情况。"
    ],
    followUp: [
      "刚识别到学生愿意先处理一个具体任务，建议立即固化为今晚或明晚前可交付的约定。",
      "学生担心教师评价，建议辅导员承担一次沟通桥接，帮助学生恢复行动感。",
      "谈话结束前生成跟进事项：阶段性提交、出勤恢复、一周后复盘。"
    ],
    summary: (student) => `本次谈话确认${student.name}的主要困扰与学业任务积压、回避压力和作息紊乱有关。已约定由辅导员协助确认补交窗口，学生在两天内提交现有材料或任务提纲，并在一周后复盘出勤、作息和任务完成情况。`,
    tasks: [
      ["确认课程补交或补救窗口", "联系任课老师确认补交要求，并同步给学生形成明确行动边界。", "2026-06-10"],
      ["一周后复盘出勤和任务进度", "复盘出勤、作息和阶段性任务完成情况，必要时联动班导师。", "2026-06-15"]
    ]
  },
  mental: {
    label: "心理关怀",
    hint: "适用于情绪低落、睡眠异常、焦虑压力、人际退缩等关怀场景。",
    goal: "了解学生近期情绪、睡眠与支持系统情况，识别是否需要进一步转介，并形成低压力的陪伴式跟进计划。",
    prepare: (student) => [
      `先向${student.name}说明谈话以关怀和陪伴为主，避免直接追问或贴标签。`,
      "优先询问睡眠、饮食、情绪波动、学习生活影响和可求助对象。",
      "如出现持续失眠、明显风险表达或功能受损，建议及时联动心理中心。"
    ],
    live: [
      "学生表达压力时，建议老师先复述其感受，暂缓给方案。",
      "可询问最近一周是否有能让学生稍微放松的人或事，帮助建立支持资源。",
      "若学生出现明显风险线索，应结束泛化建议，进入学校心理危机处置流程。"
    ],
    followUp: [
      "刚识别到学生情绪负担较重，建议将谈话重点转为稳定支持和风险确认。",
      "可以约定一个很小的日常恢复动作，例如固定起床时间或一次同伴联系。",
      "谈后任务应包括短周期关怀回访，必要时协同心理中心。"
    ],
    summary: (student) => `本次谈话重点了解${student.name}近期情绪、睡眠和支持系统。学生存在一定压力表现，已约定短周期关怀回访，并根据后续状态判断是否联动心理中心或班导师。`,
    tasks: [
      ["三日内完成关怀回访", "以非评价方式了解睡眠、情绪和学习生活恢复情况。", "2026-06-11"],
      ["评估是否联动心理中心", "如持续失眠、明显焦虑或风险表达，应按学校流程及时协同。", "2026-06-12"]
    ]
  },
  career: {
    label: "就业规划",
    hint: "适用于简历未完善、方向犹豫、考研就业摇摆、投递停滞等场景。",
    goal: "帮助学生澄清升学或就业偏好，确定两个可探索方向，并形成简历完善和岗位调研计划。",
    prepare: (student) => [
      `先了解${student.name}更看重稳定性、成长性、专业匹配还是地域选择。`,
      "用两个真实岗位或升学路径样例帮助学生做偏好比较。",
      "把谈话结果落到简历修改、岗位调研、导师咨询三个具体动作。"
    ],
    live: [
      "当学生表达迷茫时，把问题转成偏好排序，而不是要求马上做最终决定。",
      "建议现场记录两个可探索岗位或方向，降低后续行动门槛。",
      "将考研与就业拆成并行信息收集任务，避免单一选择造成焦虑。"
    ],
    followUp: [
      "刚识别到学生尚未形成明确选择，建议用偏好排序替代二选一判断。",
      "谈话中可让学生说出一个愿意先了解的岗位，作为后续任务入口。",
      "谈后生成简历反馈和岗位调研任务，便于下次谈话复盘。"
    ],
    summary: (student) => `本次谈话围绕${student.name}升学与就业选择进行澄清。已初步确认两个可探索方向，并约定完善简历、收集岗位信息、预约专业导师或就业中心反馈。`,
    tasks: [
      ["完善简历项目经历", "补充课程项目、实习经历或社团活动中的可量化表达。", "2026-06-10"],
      ["完成两个岗位方向调研", "整理岗位职责、能力要求和投递渠道，作为下次谈话材料。", "2026-06-14"]
    ]
  },
  finance: {
    label: "资助帮扶",
    hint: "适用于家庭经济困难、勤工助学、学业稳定与资源支持协同场景。",
    goal: "了解学生经济压力对学习生活的影响，确认可用资助资源，并形成兼顾学业稳定的帮扶计划。",
    prepare: (student) => [
      `先保护${student.name}的隐私感受，说明谈话仅用于匹配支持资源。`,
      "核实资助、勤工助学、临时困难补助等资源是否已覆盖。",
      "同步关注经济压力是否影响上课、作息、社交和情绪状态。"
    ],
    live: [
      "学生提到经济压力时，建议老师先确认事实和需求，不急于评价家庭情况。",
      "可把帮扶拆成资源申请、勤工岗位、学习稳定三个方向。",
      "谈后应建立资源办理进度跟踪，避免学生独自处理材料。"
    ],
    followUp: [
      "刚识别到学生需要资源支持，建议现场确认最急迫的困难点。",
      "可以同步列出已享受和待申请资源，减少信息遗漏。",
      "谈后任务应包含材料协助和学业稳定复盘。"
    ],
    summary: (student) => `本次谈话了解${student.name}经济压力及其对学习生活的影响。已确认可申请或可跟进的资助资源，并约定由辅导员协助核对材料、跟进办理进度和学习稳定情况。`,
    tasks: [
      ["核对资助申请材料", "协助学生梳理证明材料和办理节点，减少反复补材料。", "2026-06-10"],
      ["跟进勤工助学或临时补助", "确认资源匹配情况，并观察学生学习生活是否稳定。", "2026-06-13"]
    ]
  },
  dorm: {
    label: "宿舍关系",
    hint: "适用于宿舍矛盾、作息冲突、新生适应、人际沟通回避等场景。",
    goal: "了解学生宿舍互动和适应状态，帮助学生形成一次低压力沟通尝试，并明确可求助资源。",
    prepare: (student) => [
      `先请${student.name}描述一个具体宿舍场景，避免直接判断谁对谁错。`,
      "区分作息冲突、沟通方式、卫生习惯和情绪积累等不同问题。",
      "约定一句可执行的沟通表达和一个合适的沟通时间点。"
    ],
    live: [
      "学生描述宿舍矛盾时，建议老师把问题具体化到场景、时间和行为。",
      "可帮助学生准备一句低冲突表达，避免扩大矛盾。",
      "必要时联动班委、宿管或班导师，但先确认学生能接受的支持方式。"
    ],
    followUp: [
      "刚识别到学生存在沟通回避，建议把目标设为一次低压力表达，而不是一次性解决矛盾。",
      "可以现场演练一句表达，例如“我希望我们能约个时间一起调整作息规则”。",
      "谈后任务应跟进沟通尝试结果，必要时联动宿舍管理资源。"
    ],
    summary: (student) => `本次谈话了解${student.name}宿舍关系和新生适应情况。已明确一次低压力沟通尝试，并约定由辅导员跟进沟通结果，必要时协同班委、宿管或班导师。`,
    tasks: [
      ["跟进一次宿舍沟通尝试", "确认学生是否完成沟通，记录对方反馈和后续困难。", "2026-06-11"],
      ["必要时联动宿舍支持资源", "根据学生意愿协同班委、宿管或班导师介入。", "2026-06-14"]
    ]
  }
};

const pageState = document.querySelector("#pageState");
const menuTabs = document.querySelectorAll(".menu-tab");
const viewPanels = document.querySelectorAll(".view-panel");
const studentList = document.querySelector("#studentList");
const studentSearch = document.querySelector("#studentSearch");
const matchCount = document.querySelector("#matchCount");
const avatar = document.querySelector("#avatar");
const studentName = document.querySelector("#studentName");
const studentMeta = document.querySelector("#studentMeta");
const scenarioTabs = document.querySelector("#scenarioTabs");
const scenarioHint = document.querySelector("#scenarioHint");
const infoGrid = document.querySelector("#infoGrid");
const goalInput = document.querySelector("#goalInput");
const history = document.querySelector("#history");
const prepareBtn = document.querySelector("#prepareBtn");
const prepareLoading = document.querySelector("#prepareLoading");
const prepareResult = document.querySelector("#prepareResult");
const prepareAdvice = document.querySelector("#prepareAdvice");
const adviceHint = document.querySelector("#adviceHint");
const adviceStatus = document.querySelector("#adviceStatus");
const startTalkBtn = document.querySelector("#startTalkBtn");
const talkSection = document.querySelector("#talkSection");
const recordControl = document.querySelector("#recordControl");
const recordBtn = document.querySelector("#recordBtn");
const recordStatus = document.querySelector("#recordStatus");
const timer = document.querySelector("#timer");
const transcript = document.querySelector("#transcript");
const liveResult = document.querySelector("#liveResult");
const liveAdvice = document.querySelector("#liveAdvice");
const liveStatus = document.querySelector("#liveStatus");
const archiveBtn = document.querySelector("#archiveBtn");
const taskList = document.querySelector("#taskList");
const openTaskCount = document.querySelector("#openTaskCount");
const dueTaskCount = document.querySelector("#dueTaskCount");
const doneTaskCount = document.querySelector("#doneTaskCount");
const stickyStart = document.querySelector("#stickyStart");
const stickyStartBtn = document.querySelector("#stickyStartBtn");
let activeView = "talkView";

let currentKey = "zhang";
let currentScenario = "academic";
let recording = false;
let talkStarted = false;
let activeTaskId = "";
let seconds = 0;
let timerId;
let lineIndex = 0;
let tasks = [
  { id: "task-1", studentKey: "zhang", title: "联系任课老师确认补交窗口", detail: "确认数据结构实验报告是否可补交，以及最低提交要求。", owner: "李老师", due: "2026-06-04", status: "open", source: "学业预警" },
  { id: "task-2", studentKey: "zhang", title: "检查实验报告提纲和已有代码", detail: "学生明晚前发送材料，辅导员快速确认是否能进入初稿整理。", owner: "李老师", due: "2026-06-05", status: "open", source: "学业预警" },
  { id: "task-3", studentKey: "chen", title: "预约就业中心简历反馈", detail: "帮助学生完善项目经历表达，并确定两个可尝试岗位方向。", owner: "李老师", due: "2026-06-06", status: "open", source: "就业规划" },
  { id: "task-4", studentKey: "lin", title: "跟进宿舍沟通尝试", detail: "确认学生是否完成一次低压力沟通，必要时联动班委或宿管。", owner: "李老师", due: "2026-06-08", status: "done", source: "宿舍关系" }
];

const transcriptLines = [
  "<b>李老师：</b>那我们先不把目标定得太大。你觉得今晚能不能先把实验报告的题目、已完成部分和卡住的地方列出来？",
  "<b>张晨曦：</b>这个可以。我其实代码写了一部分，就是报告没有整理，也怕老师觉得我拖太久了。",
  "<b>李老师：</b>我可以帮你先和任课老师确认补交窗口。你这边明晚前把已有代码和报告提纲发我，我们一起看一下。",
  "<b>张晨曦：</b>好。如果能先确认还能补交，我压力会小很多。"
];

const scenarioTranscriptLines = {
  career: [
    "<b>李老师：</b>那我们先不急着二选一。你愿意先说说你对考研和就业分别担心什么吗？",
    "<b>陈嘉宁：</b>我担心就业没有竞争力，但考研又怕自己坚持不下来，简历也一直没整理。",
    "<b>李老师：</b>我们可以先把两个方向的信息补齐。今天先定两个岗位样例，再预约一次简历反馈。",
    "<b>陈嘉宁：</b>这样我会清楚一点，至少知道下一步要做什么。"
  ],
  dorm: [
    "<b>李老师：</b>你刚才说主要是作息不同，我们先把最困扰你的那个场景说具体一点。",
    "<b>林一航：</b>晚上他们打游戏到很晚，我提醒过一次，但后来就不太敢再说了。",
    "<b>李老师：</b>可以先准备一句比较平和的表达，再选一个大家情绪都稳定的时间沟通。",
    "<b>林一航：</b>如果能先这么说，我感觉压力会小一点。"
  ],
  mental: [
    "<b>李老师：</b>今天我们先不急着解决所有事，我更想了解你最近过得累不累。",
    "<b>学生：</b>最近睡得不太好，白天也没什么精神，有时候不太想和别人说话。",
    "<b>李老师：</b>谢谢你愿意说出来。我们先看看有没有一个你可以接受的支持方式。",
    "<b>学生：</b>我希望先不要让太多人知道，但可以隔几天和您说一下状态。"
  ],
  finance: [
    "<b>李老师：</b>今天主要是看看现有资源能不能更好地支持你，相关信息我们会注意保护。",
    "<b>学生：</b>最近家里压力比较大，我也想找勤工助学，但怕影响上课。",
    "<b>李老师：</b>我们可以一起看适合的岗位和补助材料，同时把学习时间安排稳定下来。",
    "<b>学生：</b>如果有人帮我确认流程，我会安心很多。"
  ]
};

function getInitialTranscript() {
  const student = students[currentKey];
  if (currentScenario === "academic") {
    return [
      `<b>李老师：</b>${student.name}，今天叫你过来不是批评你，主要是看到你最近几次课出勤不太稳定，想了解一下你现在的状态。`,
      `<b>${student.name}：</b>老师，我知道自己最近确实不太好。主要是任务一直没完成，越拖越不敢去上那门课。`,
      "<b>李老师：</b>我听到的是，问题不是你不想学，而是任务积压以后压力越来越大，对吗？",
      `<b>${student.name}：</b>对。我晚上会一直想这个事，但又不知道从哪里开始，睡得也比较晚，第二天就更起不来。`
    ];
  }
  return scenarioTranscriptLines[currentScenario] || students[currentKey].live.map((item) => `<b>李老师：</b>${item}`);
}

function getNextTranscriptLine() {
  const lines = scenarioTranscriptLines[currentScenario] || transcriptLines;
  return lines[lineIndex % lines.length];
}

function setPageState(text, type = "") {
  pageState.textContent = text;
  pageState.className = `state-pill ${type}`.trim();
}

function switchView(viewId) {
  activeView = viewId;
  menuTabs.forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  viewPanels.forEach((panel) => panel.classList.toggle("active", panel.id === viewId));
  updateStickyStart();
}

function renderScenario(updateGoal = true) {
  const template = scenarioTemplates[currentScenario];
  scenarioTabs.querySelectorAll(".scenario-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.scenario === currentScenario);
  });
  scenarioHint.textContent = template.hint;
  adviceHint.textContent = `当前场景：${template.label}。结合学生详情、谈话目标、历史谈话记录和近期信号，生成谈前建议。`;
  if (updateGoal) goalInput.value = template.goal;
}

function renderStudent(key) {
  const item = students[key];
  clearInterval(timerId);
  currentKey = key;
  currentScenario = item.defaultScenario || "academic";
  avatar.textContent = item.avatar;
  studentName.textContent = item.name;
  studentMeta.textContent = item.meta;
  infoGrid.innerHTML = ["近期信号", "协同资源", "关注标签", "上次结论"]
    .map((label, index) => `<div><span>${label}</span><strong>${item.info[index]}</strong></div>`)
    .join("");
  history.innerHTML = item.history
    .map(([date, title, body]) => `<article><time>${date}</time><strong>${title}</strong><p>${body}</p></article>`)
    .join("");
  prepareResult.hidden = true;
  liveResult.hidden = true;
  recordControl.hidden = true;
  transcript.hidden = true;
  archiveBtn.hidden = true;
  archiveBtn.disabled = false;
  archiveBtn.textContent = "结束谈话并自动归档";
  recordStatus.className = "tag muted";
  recordStatus.textContent = "未开始";
  seconds = 0;
  lineIndex = 0;
  timer.textContent = "00:00";
  transcript.innerHTML = getInitialTranscript().map((line) => `<p>${line}</p>`).join("");
  talkStarted = false;
  recording = false;
  activeTaskId = "";
  adviceStatus.className = "tag muted";
  adviceStatus.textContent = "未生成";
  renderScenario(false);
  goalInput.value = item.goal || scenarioTemplates[currentScenario].goal;
  renderTasks();
  setPageState("已选择谈话对象");
}

function renderStudentList(query = "") {
  const keyword = query.trim().toLowerCase();
  const entries = Object.entries(students).filter(([, item]) => {
    const text = `${item.name} ${item.id} ${item.className} ${item.tags}`.toLowerCase();
    return text.includes(keyword);
  });
  matchCount.textContent = keyword ? `匹配 ${entries.length} 名学生` : "共 186 名学生";
  studentList.innerHTML = entries.map(([key, item]) => `
    <button class="student-option ${key === currentKey ? "active" : ""}" type="button" data-student="${key}">
      <strong>${item.name}</strong>
      <span>${item.className} · ${item.id}</span>
      <small>${item.tags.split(" ").slice(0, 3).join(" · ")}</small>
    </button>
  `).join("");
}

function renderTasks() {
  const done = tasks.filter((task) => task.status === "done").length;
  openTaskCount.textContent = tasks.length - done;
  dueTaskCount.textContent = tasks.filter((task) => task.status !== "done").length;
  doneTaskCount.textContent = done;
  taskList.innerHTML = tasks.map((task) => {
    const student = students[task.studentKey];
    return `
      <article class="task-item ${task.status === "done" ? "done" : ""}" data-task-id="${task.id}">
        <input type="checkbox" ${task.status === "done" ? "checked" : ""} aria-label="标记任务完成">
        <div>
          <h3>${task.title}</h3>
          <p>${task.detail}</p>
          <div class="task-meta">
            <span class="task-source">来源：${task.source || "谈话归档"}</span>
            <span>学生：${student.name}</span>
            <span>${student.className}</span>
            <span>负责人：${task.owner}</span>
            <span>截止：${task.due}</span>
          </div>
        </div>
        <span class="task-status">${task.status === "done" ? "已完成" : "待完成"}</span>
      </article>
    `;
  }).join("");
}

function formatTime(value) {
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

function addTranscriptLine() {
  transcript.insertAdjacentHTML("beforeend", `<p>${getNextTranscriptLine()}</p>`);
  transcript.scrollTop = transcript.scrollHeight;
  lineIndex = (lineIndex + 1) % transcriptLines.length;
  updateLiveAdvice();
}

function getLiveAdviceItems() {
  const count = transcript.querySelectorAll("p").length;
  if (count <= 4) return scenarioTemplates[currentScenario].live || students[currentKey].live;
  return scenarioTemplates[currentScenario].followUp;
}

function updateLiveAdvice() {
  liveResult.hidden = false;
  liveStatus.textContent = "分析中";
  liveStatus.classList.add("updating");
  setTimeout(() => {
    liveAdvice.innerHTML = getLiveAdviceItems().map((item) => `<li>${item}</li>`).join("");
    liveStatus.textContent = "刚刚根据转写更新";
    liveStatus.classList.remove("updating");
    setPageState("谈中建议已自动更新", "done");
  }, 360);
}

function createArchiveTasks() {
  const template = scenarioTemplates[currentScenario];
  const generated = template.tasks;
  const newTasks = generated
    .filter(([title]) => !tasks.some((task) => task.studentKey === currentKey && task.title === title))
    .map(([title, detail, due], index) => ({
      id: `archive-${currentKey}-${currentScenario}-${Date.now()}-${index + 1}`,
      studentKey: currentKey,
      title,
      detail,
      owner: "李老师",
      due,
      status: "open",
      source: template.label
    }));
  tasks = [...newTasks, ...tasks];
}

function completeActiveTask() {
  if (!activeTaskId) return;
  const task = tasks.find((entry) => entry.id === activeTaskId);
  if (task) task.status = "done";
  activeTaskId = "";
}

menuTabs.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
studentSearch.addEventListener("input", () => renderStudentList(studentSearch.value));
studentList.addEventListener("click", (event) => {
  const button = event.target.closest(".student-option");
  if (!button) return;
  currentKey = button.dataset.student;
  renderStudentList(studentSearch.value);
  renderStudent(currentKey);
});

scenarioTabs.addEventListener("click", (event) => {
  const button = event.target.closest(".scenario-button");
  if (!button) return;
  currentScenario = button.dataset.scenario;
  prepareResult.hidden = true;
  liveResult.hidden = true;
  adviceStatus.className = "tag muted";
  adviceStatus.textContent = "未生成";
  renderScenario();
  if (!talkStarted) {
    lineIndex = 0;
    transcript.innerHTML = getInitialTranscript().map((line) => `<p>${line}</p>`).join("");
  }
  setPageState("已切换谈话场景模板");
});

prepareBtn.addEventListener("click", () => {
  adviceStatus.className = "tag busy";
  adviceStatus.textContent = "生成中";
  setPageState("生成谈前建议", "busy");
  prepareResult.hidden = true;
  prepareLoading.hidden = false;
  setTimeout(() => {
    const adviceItems = scenarioTemplates[currentScenario].prepare(students[currentKey]);
    prepareAdvice.innerHTML = adviceItems.map((item) => `<li>${item}</li>`).join("");
    prepareLoading.hidden = true;
    prepareResult.hidden = false;
    adviceStatus.className = "tag done";
    adviceStatus.textContent = "已生成";
    setPageState("谈前建议已生成", "done");
  }, 850);
});

function startTalk() {
  talkStarted = true;
  recordControl.hidden = false;
  transcript.hidden = false;
  archiveBtn.hidden = false;
  recording = true;
  stickyStart.classList.add("hidden");
  recordBtn.classList.remove("paused");
  recordControl.classList.remove("paused");
  recordStatus.className = "tag busy";
  recordStatus.textContent = "录音中";
  setPageState("谈话进行中", "busy");
  clearInterval(timerId);
  timerId = setInterval(() => {
    seconds += 1;
    timer.textContent = formatTime(seconds);
    if (seconds % 4 === 0) addTranscriptLine();
  }, 1000);
  updateLiveAdvice();
}

startTalkBtn.addEventListener("click", startTalk);

recordBtn.addEventListener("click", () => {
  recording = !recording;
  recordBtn.classList.toggle("paused", !recording);
  recordControl.classList.toggle("paused", !recording);
  recordStatus.className = recording ? "tag busy" : "tag done";
  recordStatus.textContent = recording ? "录音中" : "已暂停";
  updateStickyStart();
  setPageState(recording ? "谈话进行中" : "转写已暂停", recording ? "busy" : "");
  clearInterval(timerId);
  if (recording) {
    timerId = setInterval(() => {
      seconds += 1;
      timer.textContent = formatTime(seconds);
      if (seconds % 4 === 0) addTranscriptLine();
    }, 1000);
  }
});

archiveBtn.addEventListener("click", () => {
  clearInterval(timerId);
  recording = false;
  updateStickyStart();
  recordBtn.classList.add("paused");
  recordControl.classList.add("paused");
  recordStatus.className = "tag done";
  recordStatus.textContent = "已归档";
  const date = new Date().toISOString().slice(0, 10);
  const summary = scenarioTemplates[currentScenario].summary(students[currentKey]);
  history.insertAdjacentHTML("afterbegin", `
    <article class="new-record">
      <time>${date}</time>
      <strong>${scenarioTemplates[currentScenario].label}谈话自动归档</strong>
      <p>${summary}</p>
    </article>
  `);
  completeActiveTask();
  createArchiveTasks();
  renderTasks();
  switchView("taskView");
  archiveBtn.textContent = "已写入历史谈话记录";
  archiveBtn.disabled = true;
  setPageState("已自动归档为历史记录", "done");
});

taskList.addEventListener("change", (event) => {
  if (!(event.target instanceof HTMLInputElement)) return;
  const item = event.target.closest(".task-item");
  const task = tasks.find((entry) => entry.id === item?.dataset.taskId);
  if (!task) return;
  task.status = event.target.checked ? "done" : "open";
  renderTasks();
});

taskList.addEventListener("click", (event) => {
  if (event.target instanceof HTMLInputElement) return;
  const item = event.target.closest(".task-item");
  const task = tasks.find((entry) => entry.id === item?.dataset.taskId);
  if (!task) return;
  currentKey = task.studentKey;
  renderStudentList(studentSearch.value);
  renderStudent(currentKey);
  activeTaskId = task.id;
  switchView("talkView");
  setPageState("已跳转到学生谈话工作台");
});

stickyStartBtn.addEventListener("click", () => {
  switchView("talkView");
  startTalk();
  talkSection.scrollIntoView({ behavior: "smooth", block: "center" });
  talkSection.classList.add("highlight");
  setTimeout(() => talkSection.classList.remove("highlight"), 1400);
});

function updateStickyStart() {
  const rect = talkSection.getBoundingClientRect();
  const talkSectionVisible = rect.top < window.innerHeight - 80 && rect.bottom > 120;
  stickyStart.classList.toggle("hidden", activeView !== "talkView" || talkStarted || talkSectionVisible);
}

window.addEventListener("scroll", updateStickyStart, { passive: true });
window.addEventListener("resize", updateStickyStart);

renderStudentList();
renderStudent(currentKey);
renderTasks();
updateStickyStart();
