// 按钮配置列表
const button_configs = [
  {
    command: "bold",
    icon: "fa-bold",
  },
  {
    command: "italic",
    icon: "fa-italic",
  },
  {
    command: "underline",
    icon: "fa-underline",
  },
  {
    command: "strikeThrough",
    icon: "fa-strikethrough",
  },

  {
    command: "subscript",
    icon: "fa-subscript",
  },
  {
    command: "superscript",
    icon: "fa-superscript",
  },
  {
    command: "insertOrderedList",
    icon: "fa-list-ol",
  },
  {
    command: "insertUnorderedList",
    icon: "fa-list-ul",
  },
  {
    command: "justifyLeft",
    icon: "fa-align-left",
  },
  {
    command: "justifyCenter",
    icon: "fa-align-center",
  },
  {
    command: "justifyRight",
    icon: "fa-align-right",
  },
  {
    command: "justifyFull",
    icon: "fa-align-justify",
  },
  {
    command: "outdent",
    icon: "fa-outdent",
  },
  {
    command: "indent",
    icon: "fa-indent",
  },
  {
    command: "createLink",
    icon: "fa-link",
  },
  {
    command: "unlink",
    icon: "fa-unlink",
  },
  {
    command: "redo",
    icon: "fa-repeat",
  },
  {
    command: "undo",
    icon: "fa-undo",
  },
];

// 文字
const fontname_configs = [
  {
    value: "Arial",
    label: "Arial",
  },
  {
    value: "黑体",
    label: "黑体",
  },
  {
    value: "仿宋",
    label: "仿宋",
  },
];

// 文字
const fontsize_configs = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "7",
    label: "7",
  },
];

// 标题
const head_configs = [
  {
    value: "H1",
    label: "H1",
  },
  {
    value: "H2",
    label: "H2",
  },
  {
    value: "H3",
    label: "H3",
  },
];

const color_configs = [
  {
    command: "foreColor",
    text: "字体颜色",
    id: "front-color",
  },
  {
    command: "backColor",
    text: "背景颜色",
    id: "front-color",
  },
];

function createButtons() {
  let fragment = document.createDocumentFragment();

  for (let button_config of button_configs) {
    let button = document.createElement("button");
    button.classList.add("option__button");
    // button.dataset.command = button_config.command;

    let icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add(button_config.icon);

    button.addEventListener("click", function (e) {
      //   button.classList.toggle("option__button--active");
      if (button_config.command == "createLink") {
        let url = prompt("enter a url");
        if (!/http/i.test(url)) {
          url = "http://" + url;
        }
        modifyContent(button_config.command, url);
      } else {
        modifyContent(button_config.command);
      }
    });

    button.appendChild(icon);

    fragment.appendChild(button);
  }

  document.querySelector("#options").appendChild(fragment);
}

function createSelect(conmand, configs) {
  let select = document.createElement("select");
  select.classList.add("option__select");
  for (const config of configs) {
    let option = document.createElement("option");
    option.setAttribute("value", config.value);
    option.innerText = config.label;
    select.appendChild(option);
  }

  select.addEventListener("change", function () {
    modifyContent(conmand, select.value);
  });

  document.querySelector("#options").appendChild(select);
}

function createColors() {
  let fragment = document.createDocumentFragment();

  for (const config of color_configs) {
    let wrapper = document.createElement("div");
    wrapper.classList.add("option__color__wrapper");

    let label = document.createElement("label");
    label.setAttribute("for", config.id);
    label.innerText = config.text;
    wrapper.appendChild(label);

    let input = document.createElement("input");
    input.setAttribute("id", config.id);
    input.setAttribute("type", "color");
    input.classList.add("option__color__input");

    wrapper.appendChild(input);

    input.addEventListener("change", function () {
      modifyContent(config.command, input.value);
    });

    fragment.appendChild(wrapper);
  }

  document.querySelector("#options").appendChild(fragment);
}

function modifyContent(command, value) {
  console.log("modifyContent", command, value);
  document.execCommand(command, false, value);
}

function createOptionBox(selector) {
  let option_box = document.createElement("div");
  option_box.classList.add("options");
  option_box.id = "options";

  document.querySelector(selector).appendChild(option_box);
}

function createContentBox(selector) {
  let content_box = document.createElement("div");
  content_box.classList.add("content");
  content_box.setAttribute("id", "content");
  content_box.setAttribute("contenteditable", "true");

  document.querySelector(selector).appendChild(content_box);
}

// 部分标签不能创建html文本，eg：span
// function insertHtml(html) {
//   document.execCommand("insertHTML", true, html);
// }

// node: {name, props, text, children}
function insertUserName() {
  let fragment = document.createDocumentFragment();

  // 创建一个@标签
  let span = document.createElement("span");
  span.classList.add("user-link");
  span.setAttribute("data-user-id", "user-01");
  span.innerText = "吃个大西瓜";
  span.setAttribute("contenteditable", "false");
  fragment.appendChild(span);

  // 创建一个空标签隔开
  let blank_span = document.createElement("span");
  fragment.appendChild(blank_span);

  // 尾部加入一个空格
  blank_span.insertAdjacentHTML("afterend", "&nbsp;");
  // range.surroundContents(el);

  insertHTMLNode(fragment)
}

/**
 * 在光标处插入html节点
 * @param {*} node 
 */
function insertHTMLNode(node) {
  // 如果有选中的内容，就替换掉
  var selection = window.getSelection();
  var range = selection.getRangeAt(0);
  //   console.log(range);

  // 删除原有内容
  range.deleteContents();

  range.insertNode(node);

  //  移动光标到下一个输入点
  selection.collapseToEnd();
}

function createAtSomeBody() {
  let button = document.createElement("button");
  button.classList.add("option__button");
  button.innerText = "@";
  // button.dataset.command = button_config.command;

  button.addEventListener("click", function (e) {
    insertUserName();
  });

  document.querySelector("#options").appendChild(button);
}

/** 初始化编辑器 */
function initailizer(selector) {
  modifyContent("defaultParagraphSeparator", "p");

  createOptionBox(selector);
  createContentBox(selector);

  createButtons();
  createAtSomeBody();
  createSelect("fontSize", fontsize_configs);
  createSelect("fontName", fontname_configs);
  createSelect("heading", head_configs);

  createColors();
}

window.onload = function () {
  initailizer("#container");
};
