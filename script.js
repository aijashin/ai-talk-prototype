const students = {
  zhang: {
    id: "2023230208",
    avatar: "张",
    name: "张晨曦",
    className: "计算机 2302",
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
    tags: "新生适应 宿舍关系 人际沟通",
    meta: "机械 2403 · 新生适应 · 宿舍关系紧张",
    goal: "了解学生入学适应情况，缓解宿舍沟通压力，建立稳定的校园支持网络。",
    info: ["宿舍反馈一般", "班委、宿管、心理中心", "适应压力、人际沟通", "建议建立支持清单"],
    history: [["2026-05-30", "生活适应访谈", "学生表示与室友作息不同，沟通时容易回避。"]],
    prepare: ["从生活节奏和宿舍作息切入。", "引导学生描述具体场景。", "约定一次低压力沟通尝试。"],
    live: ["先确认学生希望被怎样支持。", "把宿舍沟通建议具体到一句话和一个时间点。", "记录可求助对象。"]
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
const infoGrid = document.querySelector("#infoGrid");
const goalInput = document.querySelector("#goalInput");
const history = document.querySelector("#history");
const prepareBtn = document.querySelector("#prepareBtn");
const prepareLoading = document.querySelector("#prepareLoading");
const prepareResult = document.querySelector("#prepareResult");
const prepareAdvice = document.querySelector("#prepareAdvice");
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
let recording = false;
let talkStarted = false;
let activeTaskId = "";
let seconds = 0;
let timerId;
let lineIndex = 0;
let tasks = [
  { id: "task-1", studentKey: "zhang", title: "联系任课老师确认补交窗口", detail: "确认数据结构实验报告是否可补交，以及最低提交要求。", owner: "李老师", due: "2026-06-04", status: "open" },
  { id: "task-2", studentKey: "zhang", title: "检查实验报告提纲和已有代码", detail: "学生明晚前发送材料，辅导员快速确认是否能进入初稿整理。", owner: "李老师", due: "2026-06-05", status: "open" },
  { id: "task-3", studentKey: "chen", title: "预约就业中心简历反馈", detail: "帮助学生完善项目经历表达，并确定两个可尝试岗位方向。", owner: "李老师", due: "2026-06-06", status: "open" },
  { id: "task-4", studentKey: "lin", title: "跟进宿舍沟通尝试", detail: "确认学生是否完成一次低压力沟通，必要时联动班委或宿管。", owner: "李老师", due: "2026-06-08", status: "done" }
];

const transcriptLines = [
  "<b>李老师：</b>那我们先不把目标定得太大。你觉得今晚能不能先把实验报告的题目、已完成部分和卡住的地方列出来？",
  "<b>张晨曦：</b>这个可以。我其实代码写了一部分，就是报告没有整理，也怕老师觉得我拖太久了。",
  "<b>李老师：</b>我可以帮你先和任课老师确认补交窗口。你这边明晚前把已有代码和报告提纲发我，我们一起看一下。",
  "<b>张晨曦：</b>好。如果能先确认还能补交，我压力会小很多。"
];

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

function renderStudent(key) {
  const item = students[key];
  currentKey = key;
  avatar.textContent = item.avatar;
  studentName.textContent = item.name;
  studentMeta.textContent = item.meta;
  goalInput.value = item.goal;
  infoGrid.innerHTML = ["近期信号", "协同资源", "关注标签", "上次结论"]
    .map((label, index) => `<div><span>${label}</span><strong>${item.info[index]}</strong></div>`)
    .join("");
  history.innerHTML = item.history
    .map(([date, title, body]) => `<article><time>${date}</time><strong>${title}</strong><p>${body}</p></article>`)
    .join("");
  prepareResult.hidden = true;
  liveResult.hidden = true;
  archiveBtn.hidden = true;
  archiveBtn.disabled = false;
  archiveBtn.textContent = "结束谈话并自动归档";
  talkStarted = false;
  activeTaskId = "";
  adviceStatus.className = "tag muted";
  adviceStatus.textContent = "未生成";
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
  transcript.insertAdjacentHTML("beforeend", `<p>${transcriptLines[lineIndex]}</p>`);
  transcript.scrollTop = transcript.scrollHeight;
  lineIndex = (lineIndex + 1) % transcriptLines.length;
  updateLiveAdvice();
}

function getLiveAdviceItems() {
  const count = transcript.querySelectorAll("p").length;
  if (count <= 4) return students[currentKey].live;
  return [
    "刚识别到学生愿意先完成报告提纲，建议立即固化为“明晚前发送已有代码和提纲”的具体约定。",
    "学生担心任课老师评价，建议老师承担一次沟通桥接，帮助学生恢复行动感。",
    "谈话结束前同步生成跟进事项：周五前提交初稿、一周后复盘睡眠和出勤。"
  ];
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
  const generated = [
    ["一周后复盘睡眠、出勤和任务进度", "复盘睡眠、出勤和实验报告提交情况，必要时继续联动班导师。", "2026-06-10"]
  ];
  const newTasks = generated
    .filter(([title]) => !tasks.some((task) => task.studentKey === currentKey && task.title === title))
    .map(([title, detail, due], index) => ({
      id: `archive-${currentKey}-${index + 1}`,
      studentKey: currentKey,
      title,
      detail,
      owner: "李老师",
      due,
      status: "open"
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

prepareBtn.addEventListener("click", () => {
  adviceStatus.className = "tag busy";
  adviceStatus.textContent = "生成中";
  setPageState("生成谈前建议", "busy");
  prepareResult.hidden = true;
  prepareLoading.hidden = false;
  setTimeout(() => {
    prepareAdvice.innerHTML = students[currentKey].prepare.map((item) => `<li>${item}</li>`).join("");
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
  history.insertAdjacentHTML("afterbegin", `
    <article class="new-record">
      <time>${date}</time>
      <strong>本次谈话自动归档</strong>
      <p>本次谈话确认学生缺勤主要与数据结构实验报告积压和回避压力有关。已约定由辅导员协助确认补交窗口，学生明晚前提交已有代码和报告提纲，周五前完成实验报告初稿；一周后复盘睡眠、出勤和任务完成情况。</p>
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
