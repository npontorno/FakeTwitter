//
// Axios Functions
//
export async function index()
{
    const result = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
    })

    return result.data;
};

export async function like(id)
{
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id + '/like',
        withCredentials: true,
    })

    location.reload();
    return;
};

export async function unlike(id)
{
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id + '/unlike',
        withCredentials: true,
    })

    location.reload();
    return;
};

export async function reply(id, body)
{
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "reply",
          "parent": id,
          "body": body,
        },
      });

    location.reload();
    return;
};

export async function retweet(id, tweet, body)
{
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "retweet",
          "parent": id,
          "body": "\"" + tweet.body + "\" - " + body,
        },
      });

    location.reload();
    return;
};

export async function tweet(body)
{
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          body: body,
        },
      });

    location.reload();
    return;
};

export async function edit(id, body)
{
    const result = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id,
        withCredentials: true,
        data: {
          body: body,
        },
      });

    location.reload();
    return;
};

export async function destroy(id)
{
    const result = await axios({
        method: 'delete',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id,
        withCredentials: true,
      });

      location.reload();
      return;
};

//
// Template for loading each tweet/retweet
//
export const renderTweet = function(tweet)
{
    let format =
        `<div id = "${tweet.id}" class = "obj">

        <p class = "author">Posted by ${tweet.author}
        </p>

        <p class = "body">${tweet.body}
        </p>

        <p class = "likeCount" >Likes: ${tweet.likeCount}
        </p>

        <p class = "replyCount" >Replies: ${tweet.replyCount}
        </p>

        <p class = "retweetCount">Retweets: ${tweet.retweetCount}
        </p>

        <p class = "isLiked">My Like: ${tweet.isLiked}
        </p>

        <span>
            <button id = "toggleLike" type = "button" class = "toggleLike">
                Like/Unlike
            </button>
        </span>

        <span>
            <button id = "reply" type = "button" class = "reply">
                Reply
            </button>
        </span>

        <span>
            <button id = "retweet" type = "button" class = "retweet">
                Retweet
            </button>
        </span>`;
        
    if (tweet.replyCount > 0)
    {
        format +=
        `<span>
            <button id = "viewReplies" type = "button" class = "viewReplies">
                View Replies
            </button>
        </span>`
    }

    if (tweet.isMine == true)
    {
        format +=
            `<span>
                <button id = "edit" type = "button" class = "edit">
                    Edit
                </button>
            </span>
            
            <span>
                <button id = "delete" type = "button" class = "delete">
                    Delete
                </button>
            </span>`;
    }

    format += `</div>`; 
    return format;
};

//
// Button Press Handlers
//
export const handleLikeButtonPress = function(event, tweetData)
{  
    let tweet = tweetData.filter(x => x.id == event.id)[0];

    handleCancelButtonPress();

    if (tweet.isLiked == false)
    {
        like(tweet.id);
    }

    else
    {
        unlike(tweet.id);
    }

    return;
};

export const handleReplyButtonPress = function(event, tweetData)
{  
    const $root = $("#root");
    let tweet = tweetData.filter(x => x.id == event.id)[0];

    handleCancelButtonPress();

    let renderReplyBox = 
    `<div id = "replyBox" class = "${tweet.id}">
    <span>
    <textarea id = "replyTextArea" rows="3" cols="30">Enter your reply to ` + tweet.author.slice(0, -3) + `'s tweet here.</textarea>
    <button id = "postReplyButton" type="button">Post Reply</button>
    <button class = "cancel" type="button">Cancel</button>
    </span>
    </div>`;

    $root.append(renderReplyBox);
    return;
};

export const handlePostReplyButtonPress = function(event, tweetData)
{
    let tweet = tweetData.filter(x => x.id == event.className)[0];
    let body = document.getElementById("replyTextArea").value;

    handleCancelButtonPress();

    reply(tweet.id, body);
    $("#replyBox").remove();
    return;
}

export const handleRetweetButtonPress = function(event, tweetData)
{
    const $root = $("#root");
    let tweet = tweetData.filter(x => x.id == event.id)[0];

    handleCancelButtonPress();

    let renderRetweetBox = 
    `<div id = "retweetBox" class = "${tweet.id}">
    <span>
    <textarea id = "retweetTextArea" rows="3" cols="30">Add retweet text to ` + tweet.author.slice(0, -3) + `'s tweet here.</textarea>
    <button id = "postRetweetButton" type="button">Post Retweet</button>
    <button class = "cancel" type="button">Cancel</button>
    </span>
    </div>`;

    $root.append(renderRetweetBox);
    return;
}

export const handlePostRetweetButtonPress = function(event, tweetData)
{
    let tweet = tweetData.filter(x => x.id == event.className)[0];
    let body = document.getElementById("retweetTextArea").value;

    handleCancelButtonPress();

    retweet(tweet.id, tweet, body);
    $("#retweetBox").remove();
    return;
}

export const handlePostTweetButtonPress = function()
{
    let body = document.getElementById("postTextArea").value;

    handleCancelButtonPress();

    tweet(body);
    return;
}

export const handleCancelButtonPress = function()
{
    $("#retweetBox").remove();
    $("#replyBox").remove();
    $("#editBox").remove();
    $("#viewRepliesBox").remove();
    return;
}

export const handleEditButtonPress = function(event, tweetData)
{
    const $root = $("#root");
    let tweet = tweetData.filter(x => x.id == event.id)[0];

    handleCancelButtonPress();

    let renderEditBox = 
    `<div id = "editBox" class = "${tweet.id}">
    <span>
    <textarea id = "editTextArea" rows="3" cols="30">` + tweet.body + `</textarea>
    <button id = "postEditButton" type="button">Update Post</button>
    <button class = "cancel" type="button">Cancel</button>
    </span>
    </div>`;

    $root.append(renderEditBox);
    return;
}

export const handlePostEditButtonPress = function(event, tweetData)
{
    let tweet = tweetData.filter(x => x.id == event.className)[0];
    let body = document.getElementById("editTextArea").value;

    handleCancelButtonPress();

    edit(tweet.id, body);
    $("#editBox").remove();
    return;
}

export const handleDeleteButtonPress = function(event, tweetData)
{
    let tweet = tweetData.filter(x => x.id == event.id)[0];

    handleCancelButtonPress();
    
    destroy(tweet.id);
    return;
}

export const handleViewRepliesPress = function(event, tweetData)
{
    const $root = $("#root");
    let tweet = tweetData.filter(x => x.id == event.id)[0];

    handleCancelButtonPress();

    let renderViewRepliesBox = 
    `<div id = "viewRepliesBox" class = "${tweet.id}">
    <span>
    (Functionality In Progress)
    <button class = "cancel" type="button">Cancel</button>
    </span>
    </div>`;

    $root.append(renderViewRepliesBox);
    return;
}

//
// Appends each selected tweet into the DOM
//
export const loadTweetsIntoDOM = function(tweets) {
    let tweet = "";
    const $root = $("#root");

    tweets.forEach(x => {tweet += renderTweet(x)});
    $root.html(tweet);
};

//
// Main function to be executed upon page loading
//
$(async function()
{
    let tweetData = await index();
    loadTweetsIntoDOM(tweetData);

    $(document).on("click", ".toggleLike", function()
    {
        handleLikeButtonPress(this.parentNode.parentNode, tweetData);
    })

    $(document).on("click", ".reply", function()
    {
        handleReplyButtonPress(this.parentNode.parentNode, tweetData);
    })

    $(document).on("click", "#postReplyButton", function()
    {
        handlePostReplyButtonPress(this.parentNode.parentNode, tweetData);
    })

    $(document).on("click", ".retweet", function()
    {
        handleRetweetButtonPress(this.parentNode.parentNode, tweetData);
    })

    $(document).on("click", "#postRetweetButton", function()
    {
        handlePostRetweetButtonPress(this.parentNode.parentNode, tweetData);
    })   
    
    $(document).on("click", "#postTweetButton", function()
    {
        handlePostTweetButtonPress();
    })   

    $(document).on("click", ".cancel", function()
    {
        handleCancelButtonPress();
    })

    $(document).on("click", ".edit", function()
    {
        handleEditButtonPress(this.parentNode.parentNode, tweetData);
    })   

    $(document).on("click", "#postEditButton", function()
    {
        handlePostEditButtonPress(this.parentNode.parentNode, tweetData);
    })   

    $(document).on("click", ".delete", function()
    {
        handleDeleteButtonPress(this.parentNode.parentNode, tweetData);
    }) 
    
    $(document).on("click", ".viewReplies", function()
    {
        handleViewRepliesPress(this.parentNode.parentNode, tweetData);
    })   
});