<script>
  import Icon from 'fa-svelte'
  import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit'
  import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
  import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV'

  let isActive = false;
  const toggleActive = () => isActive = !isActive;
</script>

<div class="item-drawer" class:active={isActive}>
  <div class="item-drawer-content">
    <h2>The drawer item</h2>
  </div>
  <div class="item-drawer-button" on:click={toggleActive}>
    <Icon icon={faEllipsisV}/>
  </div>
  <div class="item-drawer-settings">
    <a href="#edit"><Icon icon={faEdit}/></a>
    <a href="#remove"><Icon icon={faTrash}/></a>
  </div>
</div>

<style>
  .item-drawer {
    /*fixed*/
    display: flex;
    align-items: center;
    min-width: 100%;
    /*customizable*/
    height: 120px;
    border-radius: 16px;
    box-shadow: 0 0 16px rgba(0,0,0,0.3);
  }

  .item-drawer h2 {
    /*customizable*/
    margin: 0;
  }

  .item-drawer-content {
    /*fixed*/
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    /*customizable*/
    background-color: rgb(250,250,250);
    padding-left: 32px;
  }

  .item-drawer-settings {
    /*fixed*/
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    overflow: hidden;
    white-space: nowrap;
    width: 0px;
    height: 100%;
    /*customizable*/
    transition: 0.3s ease-out;
    background-color: rgb(240,240,240);
    border-radius: 0 16px 16px 0;
    font-size: 40px;
  }

  .item-drawer-button {
    /*fixed*/
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
    /*customizable*/
    background-color: #a4beff;
    border-radius: 0 16px 16px 0;
    width: 40px;
    font-size: 40px;
  }

  .item-drawer-settings a {
    /*customizable*/
    color: rgb(40,40,40);
  }

  .item-drawer.active .item-drawer-settings {
    /*customizable*/
    width: 180px;
  }

  .item-drawer.active .item-drawer-button {
    /*fixed*/
    border-radius: 0;
  }
</style>