<script>
  import { writable } from 'svelte/store';
  import ComponentWrapper from './ComponentWrapper.svelte';

  import CardHello from './cards/CardHello.svelte';
  import CardIdentity from './cards/CardIdentity.svelte';
  import CardPick from './cards/CardPick.svelte';
  import CardSkills from './cards/CardSkills.svelte';
  import CardDiapo from './cards/CardDiapo.svelte';
  import CardNeumorph from './cards/CardNeumorph.svelte';
  import CardStack from './cards/CardStack.svelte';
  
	const currentCard = writable(null);

  const idify = title => `${title.toLowerCase().replace(" ", "-")}-section`; 
</script>

<div id="cards-section" class="page-section">
  <h2>❐ Cards</h2>
  <p>Cards to be used in grids</p>
  <div class="cards">
    <ComponentWrapper type="cards" comp="hello"><CardHello /></ComponentWrapper>
    <ComponentWrapper type="cards" comp="pick"><CardPick /></ComponentWrapper>
    <ComponentWrapper type="cards" comp="skills"><CardSkills /></ComponentWrapper>
    <ComponentWrapper type="cards" comp="identity"><CardIdentity /></ComponentWrapper>
    <ComponentWrapper type="cards" comp="diapo"><CardDiapo /></ComponentWrapper>
    <ComponentWrapper type="cards" comp="neumorph"><CardNeumorph /></ComponentWrapper>
    <ComponentWrapper type="cards" comp="stack"><CardStack /></ComponentWrapper>
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