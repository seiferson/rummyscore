

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

    const avatarPlaceholder = document.createElement("div");
    avatarPlaceholder.classList.add("ui", "placeholder");

    const placeholderLine = document.createElement("div");
    placeholderLine.classList.add("very", "short", "line");

    parentMenu.appendChild(iconItem);
    parentMenu.appendChild(rightMenu);
    iconItem.appendChild(iconLink);
    iconLink.appendChild(appIcon);
    rightMenu.appendChild(userItem);
    userItem.appendChild(avatarPlaceholder);
    avatarPlaceholder.appendChild(placeholderLine);

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

function getIndexContent() {
    const grid = document.createElement("div");
    grid.classList.add("ui", "stackable", "grid");

    const row = document.createElement("div");
    row.classList.add("row");

    const mainColumn = document.createElement("div");
    mainColumn.classList.add("eleven", "wide", "column");

    const feedHeader = document.createElement("h4");
    feedHeader.classList.add("ui", "center", "aligned", "icon", "header");

    const feedHeaderIcon = document.createElement("i");
    feedHeaderIcon.classList.add("circular", "dice", "four", "icon");

    const feedHeaderSpan = document.createElement("span");
    feedHeaderSpan.classList.add("content");

    const feedHeaderText = document.createTextNode("latest activity");

    const hostPlaceholder = document.createElement("div");
    hostPlaceholder.id = "host-placeholder-elem";

    const segment = document.createElement("div");
    segment.classList.add("ui", "segment");

    const feed = document.createElement("div");
    feed.classList.add("ui", "feed");
    feed.id = "feed-elem";

    grid.appendChild(row);
    row.appendChild(mainColumn);
    mainColumn.appendChild(feedHeader);
    feedHeader.appendChild(feedHeaderIcon);
    feedHeader.appendChild(feedHeaderSpan);
    feedHeaderSpan.appendChild(feedHeaderText);
    mainColumn.appendChild(hostPlaceholder);
    mainColumn.appendChild(document.createElement("br"));
    mainColumn.appendChild(document.createElement("br"));
    mainColumn.appendChild(segment);
    segment.appendChild(feed);
    return grid;
}

function checkAuth() {
    let authFetch =
        fetch('/api/v1/authx/getuserinfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('[ERROR] rummyscore::index.html::fetch::/api/v1/authx/getuserinfo ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const loginAvatar = document.getElementById('login-avatar-elem');
            loginAvatar.innerHTML = "";

            const userAvatarLink = document.createElement("a");
            userAvatarLink.href = "/players/" + data.nickname;

            const userAvatarImg = document.createElement("img");
            userAvatarImg.classList.add("ui", "avatar");
            userAvatarImg.src = data.avatar;

            const userNickname = document.createTextNode("@" + data.nickname);

            loginAvatar.appendChild(userAvatarLink);
            userAvatarLink.appendChild(userAvatarImg);
            userAvatarLink.appendChild(userNickname);
        });
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
    const indexContent = getIndexContent();

    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
    container.appendChild(indexHeader);
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
    container.appendChild(indexContent);
    checkAuth();
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