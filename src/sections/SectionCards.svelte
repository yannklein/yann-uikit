<script>
  import ComponentWrapper from './utils/ComponentWrapper.svelte';
  import CardHello from './cards/CardHello.svelte';
  import CardIdentity from './cards/CardIdentity.svelte';
  import CardPick from './cards/CardPick.svelte';
  import CardSkills from './cards/CardSkills.svelte';
  import CardDiapo from './cards/CardDiapo.svelte';
  import CardNeumorph from './cards/CardNeumorph.svelte';
  import CardStack from './cards/CardStack.svelte';  
  import CardVinyl from './cards/CardVinyl.svelte';
  import { cards } from '../stores.js';

  const componizeString = cardName => `Card${cardName[0].toUpperCase()}${cardName.substring(1)}`
</script>

<div id="cards-section" class="page-section">
  <h2>❐ Cards</h2>
  <p>Cards to be used in grids</p>
  <div class="cards">
    {#each Object.keys($cards) as cardName}
      <ComponentWrapper type="cards" comp={cardName}><svelte:component this="{ eval(componizeString(cardName)) }" /></ComponentWrapper>
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
  /*Card grid */
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 48px;
  }
  /* Medium tablets and smaller */
  @media (max-width: 1100px) {
    .cards {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* Mobile phones (portrait) adn smaller */
  @media (max-width: 576px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }
</style>