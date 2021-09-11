<script>
	import { cards } from '../../data/data.js';
  import CardCode from "./CodePopup.svelte";
  import { writable } from 'svelte/store';
  import Icon from 'fa-svelte'
  import { faCode } from '@fortawesome/free-solid-svg-icons/faCode'
  
  export let cardType;

  const codeShown = writable(false);
  let tapped = false;
  const toggleCard = () => tapped = !tapped;
  const showCode = (newStatus) => (codeShown.set(newStatus))
</script>

<div class="card-container">
  <h3 on:click={() => showCode(true)}><Icon icon={faCode}/></h3>
  <slot></slot>
</div>
{#if $codeShown}
  <CardCode {showCode} code={cards[cardType]}/>
{/if}

<style>
  .card-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  h3 {
    display: flex;
    align-items: center;
    width: fit-content;
    background-color: #F4F2F0;
    border-radius: 4px;;
    padding: 4px 8px;
    margin: 4px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
    cursor: pointer;
  }
</style>