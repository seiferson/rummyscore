const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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

function checkAuthAndLoadPage() {
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
    container.appendChild(indexHeader);
    container.appendChild(document.createElement("br"));
    container.appendChild(indexContent);

    checkAuthAndLoadPage();
}

function loadIndexData(userData) {
    if(userData !== null) {
        const hostButtonPlaceholder = document.getElementById("host-placeholder-elem");

        const hostButton = document.createElement("button");
        hostButton.classList.add("ui", "basic", "right", "floated", "icon", "button");
        hostButton.id = "host-button-elem";

        const buttonIcon = document.createElement("i");
        buttonIcon.classList.add("plus", "icon");

        hostButton.appendChild(buttonIcon);
        hostButtonPlaceholder.appendChild(hostButton);

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
    }

    loadEventFeedData();
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
            feed.innerHTML = "";

            data.content.forEach(eventData => {
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
                eventId.href = "/matches/" + eventData.id;

                const eventMeta = document.createElement("div");
                eventMeta.classList.add("meta");

                const metaSpan = document.createElement("span");

                const userIcon = document.createElement("i");
                userIcon.classList.add("user", "icon");

                event.appendChild(eventLabel);
                eventLabel.appendChild(eventLabelImage);
                event.appendChild(eventContent);
                eventContent.appendChild(eventContentDate);
                eventContent.appendChild(eventSummary);
                eventSummary.appendChild(eventHost);
                eventSummary.appendChild(document.createTextNode(" is hosting "));
                eventSummary.appendChild(eventId);
                eventId.appendChild(document.createTextNode("#" + eventData.id.substring(0, 5)))
                eventHost.appendChild(document.createTextNode("@" + eventData.host.nickname));
                eventContentDate.appendChild(document.createTextNode(formattedEventDate));
                eventContent.appendChild(eventMeta);
                eventMeta.appendChild(metaSpan);
                metaSpan.appendChild(userIcon);
                metaSpan.appendChild(document.createTextNode(" " + eventData.scores.length));

                feed.appendChild(event);
            });

            if(data.content.length === 0) {
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

function drawMatch() {
    const container = document.getElementById("container-elem");
    const matchHeader = getMatchHeader();
    const matchContent = getMatchContent();

    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
    container.appendChild(matchHeader);
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
    container.appendChild(matchContent);

    checkAuthAndLoadPage();
}

function getMatchHeader() {
    const pageHeader = document.createElement("h1");
    pageHeader.classList.add("ui", "header");

    const headerSpan = document.createElement("span");
    headerSpan.id = "page-header-elem";

    const subHeaderSpan = document.createElement("span");
    subHeaderSpan.classList.add("sub", "header");
    subHeaderSpan.id = "page-subheader-elem";

    pageHeader.appendChild(headerSpan);
    pageHeader.appendChild(subHeaderSpan);

    return pageHeader;
}

function getMatchContent() {
    const grid = document.createElement("div");
    grid.classList.add("ui", "stackable", "grid");

    const row = document.createElement("div");
    row.classList.add("row");

    const enterScoreColumn = document.createElement("div");
    enterScoreColumn.classList.add("five", "wide", "column");
    enterScoreColumn.id = "enter-score-elem";

    const displayScoresColumn = document.createElement("div");
    displayScoresColumn.classList.add("eleven", "wide", "column");

    const scoreboardHeader = document.createElement("h4");
    scoreboardHeader.classList.add("ui", "center", "aligned", "icon", "header");

    const scoreboardHeaderIcon = document.createElement("i");
    scoreboardHeaderIcon.classList.add("circular", "dice", "icon");

    const joinButtonPlaceholder = document.createElement("div");
    joinButtonPlaceholder.id = "join-placeholder-elem";

    const scoreboardTable = document.createElement("table");
    scoreboardTable.classList.add("ui", "very", "basic", "celled", "fluid", "unstackable", "compact", "table");

    const scoreboardTableHeader = document.createElement("thead");
    const scoreboardTableHeaderRow = document.createElement("tr");
    const scoreboardTableUser = document.createElement("th");

    const scoreboardTableBody = document.createElement("tbody");
    scoreboardTableBody.id = "scores-elem";

    grid.appendChild(row);
    row.appendChild(enterScoreColumn);
    row.appendChild(displayScoresColumn);
    displayScoresColumn.appendChild(scoreboardHeader);
    scoreboardHeader.appendChild(scoreboardHeaderIcon);
    scoreboardHeader.appendChild(document.createTextNode(" scoreboard"));
    displayScoresColumn.appendChild(joinButtonPlaceholder);
    displayScoresColumn.appendChild(document.createElement("br"));
    displayScoresColumn.appendChild(document.createElement("br"));
    displayScoresColumn.appendChild(scoreboardTable);
    scoreboardTable.appendChild(scoreboardTableHeader);
    scoreboardTable.appendChild(scoreboardTableBody);
    scoreboardTableHeader.appendChild(scoreboardTableHeaderRow);
    scoreboardTableUser.appendChild(document.createTextNode("player"));
    scoreboardTableHeaderRow.appendChild(scoreboardTableUser);

    for (let i = 1; i < 8; i++) {
        const roundHeader = document.createElement("th");
        roundHeader.classList.add("center", "aligned");
        roundHeader.appendChild(document.createTextNode("r" + i));
        scoreboardTableHeaderRow.appendChild(roundHeader);
    }

    return grid;
}

function getContractSets(round) {
    if(round === 1) {
        return 2;
    } else if(round === 2) {
        return 1;
    } else if(round === 3) {
        return 0;
    } else if(round === 4) {
        return 3;
    } else if(round === 5) {
        return 2;
    } else if(round === 6) {
        return 1;
    } else if(round === 7) {
        return 0;
    }
}

function getContractRuns(round) {
    if(round === 1) {
        return 0;
    } else if(round === 2) {
        return 1;
    } else if(round === 3) {
        return 2;
    } else if(round === 4) {
        return 0;
    } else if(round === 5) {
        return 1;
    } else if(round === 6) {
        return 2;
    } else if(round === 7) {
        return 3;
    }
}

function getNumberText(number) {
    if(number === 1) {
        return "one";
    } else if(number === 2) {
        return "two";
    } else {
        return "three";
    }
}

function getPlayerCompletion(scores, currentRound){
    let total = 0;
    scores.forEach(score => {
        if(score[`round${currentRound}Score`] !== null) {
            total += 1;
        }
    });

    return total;
}

function loadMatchData(userData) {
    const url = window.location.pathname;
    const matchId = url.split("/").at(-1);

    fetch('/api/v1/matches/' + matchId)
        .then(response => {
            if (!response.ok) {
                throw new Error('[ERROR] rummyscore::match.html::fetch::/api/v1/matches/' + matchId + '::get ' + response.statusText);
            }
            return response.json();
        })
        .then(matchData => {
            const pageHeaderPlaceholder = document.getElementById("page-header-elem");

            const pageHeaderIcon = document.createElement("i");
            pageHeaderIcon.classList.add("dice", "three", "icon");
            pageHeaderPlaceholder.appendChild(pageHeaderIcon);
            pageHeaderPlaceholder.appendChild(document.createTextNode("#" + matchId.substring(0,5)));

            const pageSubheaderPlaceholder = document.getElementById("page-subheader-elem");

            const userIcon = document.createElement("i");
            userIcon.classList.add("user", "icon");

            const userLink = document.createElement("a");
            userLink.href = "/players/" + matchData.host.nickname;

            const calendarIcon = document.createElement("i");
            calendarIcon.classList.add("calendar", "alternate", "outline", "icon")
            pageSubheaderPlaceholder.appendChild(userIcon);
            pageSubheaderPlaceholder.appendChild(userLink);
            userLink.appendChild(document.createTextNode("@" + matchData.host.nickname));
            pageSubheaderPlaceholder.appendChild(calendarIcon);
            pageSubheaderPlaceholder.appendChild(document.createTextNode(formatDate(matchData.startDate)));

            renderMatchScores(matchData);

            if(userData !== null) {
                const hasPlayerJoinedMatch = matchData.scores.some(score => score.player.nickname === userData.nickname);
                if (!hasPlayerJoinedMatch) {
                    const joinButtonPlaceholder = document.getElementById("join-placeholder-elem");
                    const joinButton = document.createElement("button");
                    joinButton.classList.add("ui", "basic", "right", "floated", "icon", "button");
                    joinButton.id = "join-game-elem";

                    const joinIcon = document.createElement("i");
                    joinIcon.classList.add("sign", "in", "alternate", "icon");

                    joinButton.appendChild(joinIcon);
                    joinButtonPlaceholder.appendChild(joinButton);

                    const joinRequest = {"matchId": matchId};

                    joinButton.addEventListener("click", function () {
                        fetch("/api/v1/scores", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(joinRequest)
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('[ERROR] rummyscore::match.html::fetch::/api/v1/scores::post ' + response.statusText);
                                }
                                return response.json();
                            })
                            .then(scoreData => {
                                loadMatchScores(matchId);
                                document.getElementById("join-game-elem").remove();
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        });
                } else if(matchData.endDate === null) {
                    const playerCount = matchData.scores.length;
                    const enterScorePlaceholder = document.getElementById("enter-score-elem");

                    const card = document.createElement("div");
                    card.classList.add("ui", "centered", "card");

                    const cardContent = document.createElement("div");
                    cardContent.classList.add("content");

                    const contentHeader = document.createElement("div");
                    contentHeader.classList.add("header");

                    const headerIcon = document.createElement("i");
                    headerIcon.classList.add("dice", "icon");

                    const contentMeta = document.createElement("div");
                    contentMeta.classList.add("meta");

                    const metaSpan = document.createElement("span");

                    const playerCountIcon = document.createElement("i");
                    playerCountIcon.classList.add("circle", "check", "outline", "icon");

                    const sets = getContractSets(matchData.currentRound);
                    const setsLabel = document.createElement("div");
                    setsLabel.classList.add("ui", "label");

                    const setsIcon = document.createElement("i");
                    setsIcon.classList.add("dice", getNumberText(sets), "icon");

                    const runs = getContractRuns(matchData.currentRound);
                    const runsLabel = document.createElement("div");
                    runsLabel.classList.add("ui", "label");

                    const runsIcon = document.createElement("i");
                    runsIcon.classList.add("dice", getNumberText(runs), "icon");

                    const p = document.createElement("p");
                    const form = document.createElement("form");
                    form.classList.add("ui", "form");

                    const field = document.createElement("div");
                    field.classList.add("fluid", "field");

                    const fieldLabel = document.createElement("label");
                    const fieldInput = document.createElement("input");
                    fieldInput.type = "text";
                    fieldInput.name = "score";
                    fieldInput.placeholder = "123";

                    const submitButton = document.createElement("button");
                    submitButton.classList.add("ui", "right", "floated", "basic", "icon", "button");

                    const submitIcon = document.createElement("i");
                    submitIcon.classList.add("arrow", "alternate", "circle", "up", "outline", "icon");

                    enterScorePlaceholder.appendChild(card);
                    card.appendChild(cardContent);
                    cardContent.appendChild(contentHeader);
                    contentHeader.appendChild(headerIcon);
                    contentHeader.appendChild(document.createTextNode(" round " + matchData.currentRound));
                    cardContent.appendChild(contentMeta);
                    contentMeta.appendChild(metaSpan);
                    metaSpan.appendChild(playerCountIcon);
                    metaSpan.appendChild(
                        document.createTextNode(
                            getPlayerCompletion(matchData.scores, matchData.currentRound) + "/" + playerCount
                        )
                    );
                    cardContent.appendChild(document.createElement("br"));

                    if(sets > 0) {
                        setsLabel.appendChild(setsIcon);
                        setsLabel.appendChild(document.createTextNode(" A♥ A♦ A♣"));
                        cardContent.appendChild(setsLabel);
                    }

                    if(runs > 0) {
                        runsLabel.appendChild(runsIcon);
                        runsLabel.appendChild(document.createTextNode(" 8♥ 9♥ 10♥ J♥"));
                        cardContent.appendChild(runsLabel);
                    }

                    cardContent.appendChild(document.createElement("br"));
                    cardContent.appendChild(document.createElement("br"));
                    cardContent.appendChild(p);
                    p.appendChild(form);
                    form.appendChild(field);
                    fieldLabel.appendChild(document.createTextNode("your score"));
                    field.appendChild(fieldLabel);
                    field.appendChild(fieldInput);
                    submitButton.appendChild(submitIcon);
                    form.appendChild(submitButton);
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function renderMatchScores(matchData) {
    const scoreboardTableBody = document.getElementById("scores-elem");
    scoreboardTableBody.innerHTML = "";
    matchData.scores.forEach(score => {
        const scoreRow = document.createElement("tr");

        const scorePlayer = document.createElement("td");
        const scorePlayerLink = document.createElement("a");
        scorePlayerLink.href = "/players/" + score.player.nickname;
        scorePlayerLink.appendChild(document.createTextNode("@" + score.player.nickname));
        scorePlayer.appendChild(scorePlayerLink);
        scoreRow.appendChild(scorePlayer);

        for (let i = 1; i <= 7; i++) {
            const roundTd = document.createElement("td");
            roundTd.classList.add("center", "aligned");
            roundTd.appendChild(getScoreContent(score[`round${i}Score`]));
            scoreRow.appendChild(roundTd);
        }

        scoreboardTableBody.appendChild(scoreRow);
    });
}

function loadMatchScores(matchId) {
    fetch('/api/v1/matches/' + matchId)
        .then(response => {
            if (!response.ok) {
                throw new Error('[ERROR] rummyscore::match.html::fetch::/api/v1/matches/' + matchId + '::get ' + response.statusText);
            }
            return response.json();
        })
        .then(matchData => {
            renderMatchScores(matchData);
        })
        .catch(error => {
            console.log(error);
        });
}

function getScoreContent(score) {
    const trophyIcon = document.createElement("i");
    trophyIcon.classList.add("trophy", "icon");

    const empty = document.createTextNode("-");
    const data = document.createTextNode(score);

    return score === null ? empty : score === 0 ? trophyIcon : data;
}

function formatDate(date) {
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