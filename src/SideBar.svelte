<script>
  import Icon from 'fa-svelte'
  import { faHamburger } from '@fortawesome/free-solid-svg-icons/faHamburger'
  
  export let sections;

  let isShown = false;
  const toggleMenu = () => isShown = !isShown;


  const hrefify = title => `#${title.toLowerCase().replace(" ", "-")}-section`;
</script>

<div class="sidebar-burger" on:click={toggleMenu}>
  <Icon icon={faHamburger} />
</div>
{#if isShown}
   <div class="sidebar">
     {#each sections as section}
        <a href={hrefify(section)}>❐ {section}</a>
     {/each}
   </div>
{/if}

<style>
  .sidebar-burger {
    position: fixed;
    top: 16px;
    right: 16px;
    font-size: 48px;
    text-shadow: 0 0 8px rgba(0,0,0,0.2);
    color: white;
    z-index: 50;
    opacity: 0;
    visibility: hidden;
    cursor: pointer;
  }

  .sidebar {
    min-width: 268px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
    padding: 16px;
    padding-right: 0;
    position: sticky;
    top: 0;
    height: 100%;
    z-index: 50;
  }

  .sidebar a {
    color: rgb(40,40,40);
    display: flex;
    padding: 16px 24px;
    align-items: center;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
    border-radius: 4px;
    font-size: 20px;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media (max-width: 576px) {
    .sidebar-burger {
      opacity: 1;
      visibility: visible;
    }
    .sidebar {
      opacity: 1;
      visibility: visible;
      position: fixed;
      height: auto;
      right: 16px;
      top: 64px;
      grid-gap: 12px;
      padding: 12px 0;
      transition: opacity .3s ease-out;
    }

    .sidebar.hidden {
      opacity: 0;
      visibility: hidden;
    }

    .sidebar a {
      background-color: white;
    }
  }

</style>