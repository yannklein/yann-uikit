<div class="button-push">
  <a href="https://yannklein.dev/">PUSH</a>
</div>

<style>
  .button-push {
    margin: 16px;
    align-self: center;
    transform: translate(-4px, -4px);
    transition: 0.3s;
  }
  .button-push:hover {
    transform: translate(0px, 0px);
  }
  .button-push:active {
    transform: translate(4px, 4px);
  }
  .button-push a {
    background-color: #ca6a43;
    color: #7ebdc2;
    font-size: 24px;
    padding: 8px 24px;
    border-radius: 8px;
    border: 4px solid #7ebdc2;
    position: relative;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
  }
  .button-push a:after {
    content: '';
    z-index: -1;
    background-color: #7ebdc2;
    border-radius: 8px;
    border: 4px solid #ca6a43;
    position: absolute;
    top: 8px;
    left: 8px;
    width: 100%;
    height: 100%;
    transition: 0.3s;
  }
  .button-push:hover a:after {
    top: 4px;
    left: 4px;
  }
  .button-push:active a:after {
    top: 0px;
    left: 0px;
  }
</style>
