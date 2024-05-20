export default function isLoggedUser() {
  return !!localStorage.getItem('token');
}
