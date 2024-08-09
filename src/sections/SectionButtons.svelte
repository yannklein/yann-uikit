<script>
  import ComponentWrapper from './utils/ComponentWrapper.svelte';
  import ButtonPush from './buttons/ButtonPush.svelte';
  import { buttons } from '../stores.js';
  const components = { ButtonPush };

  const componizeString = name => `Button${name[0].toUpperCase()}${name.substring(1)}`
  
</script>

<div id="buttons-section" class="page-section">
  <h2>❐ Buttons</h2>
  <p>Buttons with creative CSS</p>
  <div class="buttons">
    {#each Object.keys($buttons) as buttonName}
    <ComponentWrapper type="buttons" comp={buttonName}><svelte:component this={ components[componizeString(buttonName)] } /></ComponentWrapper>
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
  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 24px;
  }

  /* Medium tablets and smaller */
  @media (max-width: 1100px) {
    .buttons {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  /* Mobile phones (portrait) adn smaller */
  @media (max-width: 576px) {
    .buttons {
      grid-template-columns: 1fr1fr;
    }
  }
</style>