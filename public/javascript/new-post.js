// when button for new post is clicked, redirect to new-post page
async function newPostHandler () {
  // send to dashboard's new-post route which redirects to new-post page
  document.location.replace('/dashboard/new-post')
}

document.querySelector('#new-post-btn').addEventListener('click', newPostHandler)
