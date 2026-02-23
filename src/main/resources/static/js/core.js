

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
    fetch('/api/v1/authx/getuserinfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('[ERROR] rummyscore::match.html::fetch::/api/v1/authx/getuserinfo::get ' + response.statusText);
            }
            return response.json();
        })
        .then(userData => {
            const loginAvatar = document.getElementById('login-avatar-elem');

            const userAvatarLink = document.createElement("a");
            userAvatarLink.href = "/players/" + userData.nickname;

            const userAvatarImg = document.createElement("img");
            userAvatarImg.classList.add("ui", "avatar", "image");
            userAvatarImg.src = userData.avatar;

            const userNickname = document.createTextNode("@" + userData.nickname);

            loginAvatar.appendChild(userAvatarLink);
            userAvatarLink.appendChild(userAvatarImg);
            userAvatarLink.appendChild(userNickname);

            loadPageElements(userData);
        })
        .catch(error => {
            const loginLink = document.createElement("a");
            loginLink.href="/oauth2/authorization/google";

            const googleIcon = document.createElement("i");
            googleIcon.classList.add("google", "icon");

            const loginLinkText = document.createTextNode(" login");

            const loginAvatar = document.getElementById('login-avatar-elem');

            loginAvatar.appendChild(loginLink);
            loginLink.appendChild(googleIcon);
            loginLink.appendChild(loginLinkText);

            loadPageElements(null);
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

function loadIndexdata(userData) {
    if(userData != null) {
        const hostButtonHolder = document.getElementById("host-placeholder-elem");

        const hostButton = document.createElement("button");
        hostButton.classList.add("ui", "basic", "right", "floated", "icon", "button");
        hostButton.id = "host-button-elem";

        const buttonIcon = document.createElement("i");
        buttonIcon.classList.add("plus", "icon");

        hostButton.appendChild(buttonIcon);

        hostButton
            .addEventListener("click", function () {
                fetch("/api/v1/matches", {method: "POST"})
                .then(response => {
                    if (!response.ok) {
                        throw new Error('[ERROR] rummyscore::match.html::fetch::/api/v1/matches::post ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    loadEventFeedData();
                })
                .catch(error => {
                    console.log(error);
                });
        });

    } else {
        loadEventFeedData();
    }
}

function loadEventFeedData() {
    fetch('/api/v1/matches?page=0')
        .then(response => {
            if (!response.ok) {
                throw new Error('[ERROR] rummyscore::index.html::fetch::/api/v1/matches::get ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const feed = document.getElementById("feed-elem");

            data.content.forEach(function(eventData) {
                const formattedEventDate = formatDate(eventData.startDate);

                const event = document.createElement("div");
                event.classList.add("event");

                const eventLabel = document.createElement("div");
                eventLabel.classList.add("label");

                const eventLabelImage = document.createElement("img");
                eventLabelImage.src = eventData.host.avatar;
                eventLabelImage.alt = "user avatar";

                const eventContent = document.createElement("div");
                eventContent.classList.add("content");

                const eventContentDate = document.createElement("div");
                eventContentDate.classList.add("date");

                const eventSummary = document.createElement("div");
                eventSummary.classList.add("summary");

                const eventHost = document.createElement("a");
                eventHost.href = "/players/" + eventData.host.nickname;
                eventHost.classList.add("user");

                const eventId = document.createElement("a");
                eventId.href = "/matches/" + event.id;

                const eventMeta = document.createElement("div");
                eventMeta.classList.add("meta");

                const metaSpan = document.createElement("span");

                const userIcon = document.createElement("i");
                userIcon.classList.add("user", "icon");

                event.appendChild(eventLabel);
                eventLabel.appendChild(eventLabelImage);
                event.appendChild(eventContent);
                eventContent.appendChild(eventContentDate);
                eventContentDate.appendChild(document.createTextNode(formattedEventDate));
                eventContent.appendChild(eventSummary);
                eventSummary.appendChild(eventHost);
                eventSummary.appendChild(document.createTextNode(" is hosting "));
                eventSummary.appendChild(eventId);
                eventId.appendChild(document.createTextNode("#" + event.id.substring(0, 5)))
                eventHost.appendChild(document.createTextNode("@" + event.host.nickname));
                eventContentDate.appendChild(document.createTextNode(formattedEventDate));
                eventContent.appendChild(eventMeta);
                eventMeta.appendChild(metaSpan);
                metaSpan.appendChild(userIcon);
                metaSpan.appendChild(document.createTextNode(" " + eventData.scores.length));
            });

            if(data.scores.length === 0) {
                document.getElementById("feed-elem").innerHTML = "<div class=\"event\">" +
                    "<div class=\"label\">" +
                    "<img src=\"https://api.dicebear.com/9.x/notionists-neutral/svg?seed=doom\" alt=\"user avatar\">" +
                    "</div>" +
                    "<div class=\"content\">" +
                    "<div class=\"date\">" + formatDate(new Date()) + "</div>" +
                    "<div class=\"summary\">" +
                    "no events" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function formatDate(date) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateObj = new Date(date);

    return dateObj.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
        timeZone: userTimeZone
    });
}