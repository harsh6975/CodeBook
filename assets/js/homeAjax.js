{
  // method to submit the form data for new post using Ajax
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(), //converts form data into json
        success: function (data) {
          console.log(data);
          let newPost = newPostDom(data.data.post);
          $("#post-list-container").prepend(newPost);
        },
        error: function (error) {
          console.log("error", error.responseText);
        },
      });
    });
  };

  let newPostDom = function (post) {
    return $(` <div class="post" id="post-${post.id}">
                  <div class="top" 
                  style="display: flex; justify-content: left;
                  align-items: center;">
                  <h3>${post.user.name}</h3>
                  <a class="delete-post-button" href="/posts/destroy/?id=${post.id}" 
                  style="margin-left: 20px;">Delete</i>
                  </a>
    
               </div>

               <div>${post.content}</div>
                 <div class="comment">
                   <form action="/comment/create" method="POST">
                    <input
                     type="text"
                     name="content"
                     placeholder="Add comments..."
                     required
                   />
                   <input type="hidden" name="post" value="${post.id}" />
                   <input type="submit" value="Add Comment" />
                 </form>
               </div>
                <!-- comment container -->
               <div class="post-comments-list">
                 <ul id="post-comments-${post._id}">
                 </ul>
               </div> 
             </div>
          `);
  };
  createPost();
}
