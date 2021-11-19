
let url = document.currentScript.getAttribute('url');

fetch(`https://micro.blog/conversation.js?url=${url}&format=jsonfeed`)
  .then(response => response.json())
  .then(data => {
    loadResponse(data);
  });
  
function loadResponse(response) {
  let output = document.getElementById("conversation-output");
  if (response.title == "Conversation") {      
    let posts = response.items.map(entry => loadEntry(entry));
    posts.forEach(post => output.appendChild(post));
  } else {
    output.remove();
  }
}

function loadEntry(entry) {
  let date = new Date(entry.date_published);
  let post = document.createElement("DIV");
  post.setAttribute("class", "microblog_post");
  post.innerHTML = `
<div class="microblog_user">
  <img class="microblog_avatar" 
       src="${entry.author.avatar}" 
       width="20" height="20" style="max-width: 20px;" />
  <span class="microblog_fullname">${entry.author.name}</span>
</div>
<div class="microblog_text">${entry.content_html}</div>
<div class="microblog_time">
  <a href="${entry.url}>${date.toDateString()}</a>
</div>`;
 return post
}
