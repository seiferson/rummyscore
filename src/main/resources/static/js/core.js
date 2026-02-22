

function getHeaderFragment() {
    const parentMenu = document.createElement("div");
    parentMenu.classList.add("ui", "top", "attached", "menu");

    const iconItem = document.createElement("div");
    iconItem.classList.add("ui", "item");

    const iconLink = document.createElement("a");
    iconLink.classList.add("ui", "header");
    iconLink.href = "/";

    const appIcon = document.createElement("i");
    appIcon.classList.add("mountain", "icon");

    const rightMenu = document.createElement("div");
    rightMenu.classList.add("right", "menu");

    const userItem = document.createElement("div");
    userItem.classList.add("ui", "item");
    userItem.id = "login-avatar-elem";

    parentMenu.appendChild(iconItem);
    parentMenu.appendChild(rightMenu);
    iconItem.appendChild(iconLink);
    iconLink.appendChild(appIcon);
    rightMenu.appendChild(userItem);

    return parentMenu;
}

function getFooterFragment() {
    const segment = document.createElement("div");
    segment.classList.add("ui", "basic", "segment");

    const divider = document.createElement("div");
    divider.classList.add("ui", "horizontal", "divider");

    const dividerIcon = document.createElement("i");
    dividerIcon.classList.add("mountain", "icon");

    const container = document.createElement("div");
    container.classList.add("ui", "container");

    const column = document.createElement("div");
    column.classList.add("ten", "wide", "column");

    const labels = document.createElement("div");
    labels.classList.add("ui", "labels");

    const githubLink = document.createElement("a")
    githubLink.classList.add("ui", "label");
    githubLink.href = "https://github.com/seiferson/rummyscore";

    const githubIcon = document.createElement("i");
    githubIcon.classList.add("github", "icon");

    const githubText = document.createTextNode(" github");

    segment.appendChild(divider);
    segment.appendChild(container);
    divider.appendChild(dividerIcon);
    container.appendChild(column);
    column.appendChild(labels);
    labels.appendChild(githubLink);
    githubLink.appendChild(githubIcon);
    githubLink.appendChild(githubText);

    return segment;
}

function getIndexHeader() {
    const segment = document.createElement("div");
    segment.classList.add("ui", "segment");

    const iconHeader = document.createElement("h2");
    iconHeader.classList.add("ui", "center", "aligned", "icon", "header");

    const icon = document.createElement("i");
    icon.classList.add("circular", "mountain", "icon");

    const headerText = document.createTextNode("rummyscore");

    segment.appendChild(iconHeader);
    iconHeader.appendChild(icon);
    iconHeader.appendChild(headerText);
    return segment;
}

function drawPage() {
    const app = document.getElementById("app-elem");
    const container = document.createElement("div");
    const headerFragment = getHeaderFragment();
    const footerFragment = getFooterFragment();

    container.classList.add("ui", "container");
    container.id = "container-elem";
    app.appendChild(headerFragment);
    app.appendChild(container);
    app.appendChild(document.createElement("br"));
    app.appendChild(document.createElement("br"));
    app.appendChild(footerFragment);
}

function drawIndex() {
    const container = document.getElementById("container-elem");
    const indexHeader = getIndexHeader();

    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
    container.appendChild(indexHeader);
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));

}

/*
"<div class=\"ui top attached menu\">\n" +
"    <div class=\"ui item\">\n" +
"      <a class=\"ui header\" href=\"/\"><i class=\"mountain icon\"></i></a>\n" +
"    </div>\n" +
"    <div class=\"right menu\">\n" +
"      <div class=\"ui item\" id=\"menu-avatar-elem\">\n" +
"        <a href=\"/oauth2/authorization/google\"><i class=\"google icon\"></i> login</a>\n" +
"      </div>\n" +
"    </div>\n" +
"  </div>" */