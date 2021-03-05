export default function createFooter() {
  const footer = document.querySelector(".footer");

  footer.innerHTML = `<footer class="bg-dark text-center text-white">
  <!-- Grid container -->
  <div class="container p-4 pb-0">
   </div>
  <!-- Grid container -->

  <!-- Copyright -->
  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
  <p class="text-white">© 2021 Copyright:</p>
    <a class="text-white" href="index.html">Moises Magalhaes</a>
  </div>
  <!-- Copyright -->

</footer>`;
}
