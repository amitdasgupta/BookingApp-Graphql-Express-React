function isLoggedIn() {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else return false;
}

function logIn(token) {
  localStorage.setItem("token", JSON.stringify(token));
  window.location.reload();
}

function logOut() {
  localStorage.removeItem("token");
  window.location.reload();
}

module.exports = {
  isLoggedIn,
  logIn,
  logOut,
};
