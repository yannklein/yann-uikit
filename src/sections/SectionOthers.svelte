<script>
  import ComponentWrapper from './utils/ComponentWrapper.svelte';
  import OtherDoubleRange from './others/OtherSliderRange.svelte';
  import { others } from '../stores.js';
  import OtherSliderRange from './others/OtherSliderRange.svelte';
  const components = { OtherSliderRange };

  const componizeString = name => `Other${name[0].toUpperCase()}${name.substring(1)}`
</script>

<div id="others-section" class="page-section">
  <h2>❐ Others</h2>
  <p>Others to be used in grids</p>
  <div class="others">
    {#each Object.keys($others) as otherName}
      <ComponentWrapper type="others" comp={otherName}><svelte:component this={components[componizeString(otherName)] } /></ComponentWrapper>
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
  /*Other grid */
  .others {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 48px;
  }
  /* Medium tablets and smaller */
  @media (max-width: 1100px) {
    .others {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* Mobile phones (portrait) adn smaller */
  @media (max-width: 576px) {
    .others {
      grid-template-columns: 1fr;
    }
  }
</style>