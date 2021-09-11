<script>
  import ComponentWrapper from './ComponentWrapper.svelte';
  import Item3D from './items/Item3D.svelte';
  import ItemDrawer from './items/ItemDrawer.svelte';
  import ItemFlip from './items/ItemFlip.svelte';
</script>

<div id="items-section" class="page-section">
  <h2>❐ Item Cards</h2>
  <p>Items with some simple animations</p>
  <div class="items">
    <ComponentWrapper type="items" comp="drawer"><ItemDrawer/></ComponentWrapper>
    <ComponentWrapper type="items" comp="3d"><Item3D/></ComponentWrapper>
    <ComponentWrapper type="items" comp="flip"><ItemFlip/></ComponentWrapper>
  </div>
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
  .items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
  }

  /* Medium tablets and smaller */
  @media (max-width: 1100px) {
    .items {
      grid-template-columns: 1fr;
    }
  }

  /* Mobile phones (portrait) adn smaller */
  @media (max-width: 576px) {
    .items {
      grid-template-columns: 1fr;
    }
  }
</style>