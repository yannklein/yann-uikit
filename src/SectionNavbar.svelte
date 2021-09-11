<script>
  import ComponentWrapper from "./ComponentWrapper.svelte";
  import NavbarVanilla from "./navbars/NavbarVanilla.svelte";
</script>

<div id="navbar-section" class="page-section">
  <h2>❐ Navbars</h2>
  <p>Vanilla CSS navbar with minimal JS and no bootstrap</p>
  <ComponentWrapper type="navbars" comp="vanilla"><NavbarVanilla /></ComponentWrapper>
</div>

<style>
  .page-section {
    margin-bottom: 56px;
  }
  h2 {
    margin-bottom: 8px;
  }
  p {
    margin-bottom: 16px;
  }
</style>