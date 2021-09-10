<script>
  export let sections;

  // document.querySelector(".sidebar-burger")
  //   .addEventListener("click", () => {
  //     document.querySelector(".sidebar").classList.toggle("show");
  //   })

  const hrefify = title => `#${title.toLowerCase().replace(" ", "-")}`;
</script>

<div class="sidebar-burger"><i class="fas fa-hamburger"></i></div>
<div class="sidebar">
  {#each sections as section}
     <a href={hrefify(section)}>❐ {section}</a>
  {/each}
</div>

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
      opacity: 0;
      visibility: hidden;
      position: fixed;
      height: auto;
      right: 16px;
      top: 64px;
      grid-gap: 12px;
      padding: 12px 0;
      transition: opacity .3s ease-out;
    }

    .sidebar.show {
      opacity: 1;
      visibility: visible;
    }

    .sidebar a {
      background-color: white;
    }
  }

</style>