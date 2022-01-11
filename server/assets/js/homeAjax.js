// {
//   // method to submit the form data for new post using Ajax
//   let createPost = function () {
//     let newPostForm = $("#new-post-form");
//     newPostForm.submit(function (e) {
//       e.preventDefault();

//       $.ajax({
//         type: "post",
//         url: "/posts/create",
//         data: newPostForm.serialize(), //converts form data into json
//         success: function (data) {
//           console.log(data);
//           let newPost = newPostDom(data.data.post);
//           $("#post-list-container").prepend(newPost);
//         },
//         error: function (error) {
//           console.log("error", error.responseText);
//         },
//       });
//     });
//   };

//   let newPostDom = function (post) {
//     return $(` <div class="card p-3 mb-2" style="margin-top: 40px">
//     <div class="d-flex justify-content-between">
//       <div class="d-flex flex-row align-items-center">
//         <div class="icon">
//           <%if(${post.user.avatar}){%>
//           <img src="${post.user.avatar}" alt="${post.user.name}" />
//           <%}else{%>
//           <i class="fas fa-user-circle"></i>
//           <%}%>
//         </div>
//         <div class="ms-2 c-details">
//           <h6 class="mb-0">${post.user.name}</h6>
//           <span
//             >${post.createdAt.toString().substr(15, 6)},
//             ${post.createdAt.toString().substr(0, 15)}
//           </span>
//         </div>
//       </div>
      
//     </div>
//     <div class="mt-3">
//       <h3 class="heading"><p class="card-text">${post.content}</p></h3>
//       <div class="mt-3">
//         <a
//           href="/likes/toogle/?id=${post.id}&type=Post"
//           method="POST"
//           style="text-decoration: none"
//         >
//           <i class="far fa-heart"> </i>
//           <% if(${post.likes.length>0}){%>
  
//           <strong
//             style="
//               font-size: 20px;
//               margin-right: 20px;
//               margin-left: -25px;
//               margin-top: -20px;
//               color: coral;
//             "
//           >
//           ${post.likes.length}</strong
//           >
//           <%}%>
//         </a>
//         <a
//           data-bs-toggle="collapse"
//           href="#collapse${post._id}"
//           role="button"
//           aria-expanded="false"
//           aria-controls="collapse${post._id}"
//           ><i class="far fa-comment"></i
//         ></a>
//         <% if(post.comment.length>0){}
  
//         <strong
//           style="
//             font-size: 20px;
//             margin-right: 20px;
//             margin-left: -25px;
//             margin-top: -20px;
//             color: coral;
//           "
//         >
//           ${post.comment.length}</strong
//         >
//         <%}%>
//       </div>
//       <div class="mt-3">
//         <div class="collapse" id="collapse${post._id}">
//           <form action="/comment/create" method="POST">
//             <div
//               class="
//                 d-flex
//                 justify-content-center
//                 flex-row
//                 align-items-center
//                 make-comment
//               "
//             >
              
//               <input
//                 type="text"
//                 name="content"
//                 placeholder="Add comments..."
//                 required
//               />
//               <button type="submit" class="btn btn-danger">Comment</button>
//             </div>
//             <!-- we need post id on which comment is done -->
//             <input type="hidden" name="post" value="${post.id}" />
//           </form>
//           <div class="post-comments-list-container" style="margin-left: -19px">
//             <%if(${post.comment.length>0}){%>
//             <h5 style="margin-left: 20px; color: #e44d3a">Comments</h5>
//             <%}%> <% for (comment of post.comment){%>
//             <!-- include comment -->
//             <%-include('_comment')%> <%} %>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
  
//           `);
//   };
//   createPost();
// }
