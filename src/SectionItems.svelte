<script>
  import ComponentWrapper from './ComponentWrapper.svelte';
  import ItemDrawer from './items/ItemDrawer.svelte';
</script>

<div id="items-section" class="page-section">
  <h2>5. Item Cards</h2>
  <div class="items">
    <ComponentWrapper type="items" comp="drawer"><ItemDrawer/></ComponentWrapper>
    <div class="item-drawer">
      <div class="item-drawer-content">
        <h2>The drawer item</h2>
      </div>
      <div class="item-drawer-button">
        <i class="fas fa-ellipsis-v"></i>
      </div>
      <div class="item-drawer-settings">
        <a href="#"><i class="fas fa-edit"></i></a>
        <a href="#"><i class="fas fa-trash"></i></a>
      </div>
      <script>
        document.querySelector(".item-drawer-button")
          .addEventListener("click", (event) => {
            document.querySelector(".item-drawer").classList.toggle("active");
          });
      </script>
    </div>
    <div class="item-3d">
      <div class="item-3d-content">
        <h2>The 3D item</h2>
        <p>An icon that pops up out of the card.</p>
      </div>
      <div class="item-3d-icon">
        <img src="images/youtube.png" alt="">
      </div>
    </div>
    <div class="item-flip">
      <div class="item-flip-inner">
        <div class="item-flip-front">
          <div class="item-flip-content">
            <h2>The flipping item</h2>
            <p>Hover it (or click it on mobile) to display...</p>
          </div>
        </div>
        <div class="item-flip-back">
          <div class="item-flip-content">
            <p>The back of the card!</p>
          </div>
        </div>
      </div>
      <script>
      document.querySelector(".item-flip")
        .addEventListener("click", (event) => {
          event.currentTarget.classList.toggle("flipped");
        });
      </script>
    </div>
  </div>
</div>

<style>
  .items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
  }
</style>