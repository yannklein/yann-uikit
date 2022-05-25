<script>
  import ComponentWrapper from './utils/ComponentWrapper.svelte';
  import Item3d from './items/Item3d.svelte';
  import ItemDrawer from './items/ItemDrawer.svelte';
  import ItemFlip from './items/ItemFlip.svelte';
  import { items } from '../stores.js';
  const components = { Item3d, ItemDrawer, ItemFlip };

  const componizeString = name => `Item${name[0].toUpperCase()}${name.substring(1)}`
</script>

<div id="items-section" class="page-section">
  <h2>❐ Item Cards</h2>
  <p>Items with some simple animations</p>
  <div class="items">
    {#each Object.keys($items) as itemName}
    <ComponentWrapper type="items" comp={itemName}><svelte:component this={ components[componizeString(itemName)] } /></ComponentWrapper>
    {/each}
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