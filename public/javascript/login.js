async function signupFormHandler (event) {
  event.preventDefault()

  const username = document.querySelector('#username-signup').value.trim()
  const password = document.querySelector('#password-signup').value.trim()

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    // check the response status
    if (response.ok) {
      // console.log('success')
      document.location.replace('/dashboard')
    } else {
      alert(response.statusText)
    }
  }
}

async function loginFormHandler (event) {
  event.preventDefault()

  const username = document.querySelector('#username-login').value.trim()
  const password = document.querySelector('#password-login').value.trim()

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      // to see the response in DevTools > Network > Headers you need to comment out the redirect
      document.location.replace('/dashboard')
      // console.log('success')
    } else {
      alert(response.statusText)
    }
  }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)
document.querySelector('.login-form').addEventListener('submit', loginFormHandler)
