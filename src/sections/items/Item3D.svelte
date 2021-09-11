<div class="item-3d">
  <div class="item-3d-content">
    <h2>The 3D item</h2>
    <p>An icon that pops up out of the card.</p>
  </div>
  <div class="item-3d-icon">
    <img src="youtube.png" alt="">
  </div>
</div>

<style>
  .item-3d {
  /*fixed*/
  display: flex;
  align-items: center;
  min-width: 100%;
  /*customizable*/
  height: 120px;
  border-radius: 16px;
  box-shadow: 0 0 16px rgba(0,0,0,0.3);
}

.item-3d h2 {
  /*customizable*/
  margin: 0;
}

.item-3d p {
  /*customizable*/
  margin: 0;
}

.item-3d-content {
  /*fixed*/
  flex-grow: 1;
  /*customizable*/
  background-color: rgb(250,250,250);
  padding-left: 32px;
}

.item-3d-icon {
  /*fixed*/
  position: relative;
  /*customizable*/
  width: 200px;
}

.item-3d-icon img {
  /*fixed*/
  position: absolute;
  top: 50%;
  left: 50%;
  /*customizable*/
  transform: translate(-50%, -60%);
  height: 150px;
  width: 150px;
}

/* Mobile phones (portrait) adn smaller */
@media (max-width: 576px) {
  .item-3d-icon img {
    transform: translate(-30%, -50%);
    height: 120px;
    width: 120px;
  }
}
</style>