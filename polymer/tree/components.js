class TreeItem extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
<style>
    .tree {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .text {
        height: 24px;
        line-height: 24px;
        vertical-align: middle;
        padding: 0 0 0 32px;
        list-style-type: none;
        font-weight: bold;
        background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACDUlEQVRIS2NkoDFgpLH5DPSzoKGhgenYsWMi2Hz09+9fxr17974kx7dgH4AMl5WR6WZjZ3fCZgg7O/vH48ePT+zv719PqiVgCxwcHHgCAwP3yMnJmR89ehTDDCcnZwZxMdEPR48dW/DmzZuvhCyRkpLakJGRcQakDm5BaGjortDQUMuXLzFDQlJSikFISJDh7du3DH/+/IWa/5/h/3/sVq1bu+bomrVrXQ4cOPADxYKsrCxLbFogBkFMQxiK24IZ06cf3bR5k/uuXbu+jlqANRIoDqIvX74wTNh4iOHxu09YLXh0/9bHL08ezT22dl4xPA4cnN2OOTg76zIyEsjcLGwM/YcfMGwS82T4x8SKM8VqHui8JHV3jxvMgoArrm3rfnEKEC46/v9n+CSmRSgrMJhuyjyowPDWGWygi4ODzRn33oMfJIyYCOokQgHL768MmssiF14+sDkBYoGLi+EF45J9b1TcBYjQT1AJ5+enDGqroiounjjUCbbAzcFB47x6/K7XBgmyBHUToYD/1eX/uruzvI4cObID5gO56+JuO55alGoSoZ+gEpGbq18Z3JjlsmfPnsuwSBZ5yG+8675DjyFB3UQokD9Sc0Xj1SG3nYcPP4elGkZlK5+Ov2LaLkToJ6iE5dW1HXeOba6Gl6YgBqhOOHDggBBB3UQoOHDgwFtY6Ug43RNhID4lQ98CAOgNBwq57yJdAAAAAElFTkSuQmCC') no-repeat left center;
    }
</style>
<ul class="tree">
    <li class="text">
        <slot>Unnamed tree node</slot>
    </li>
    <li>
        <ul>
            <slot name="items"/>
        </ul>
    </li>
</ul>
      `;
  }

  static get is() {
    return 'tree-item'
  }

  static from(data) {
    if (data.hasOwnProperty('items')) {
      return this.create(data['id'], data['name'], data['items']);
    } else {
      return LeafItem.create(data['id'], data['name']);
    }
  }

  static create(id, text = 'Unnamed tree node', items) {
    let tree = document.createElement(TreeItem.is);
    tree.id = id;
    tree.appendChild(document.createTextNode(text));
    for (let node of items) {
      let itemsTree = this.from(node);
      itemsTree.slot = 'items';
      tree.appendChild(itemsTree);
    }
    return tree
  }

}

class LeafItem extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
<style>
    li {
        height: 24px;
        line-height: 24px;
        vertical-align: middle;
        padding: 0 0 0 32px;
        list-style-type: none;
        background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACQUlEQVRIS2NkIBH4+vpyYdPy588flu3bt39Cl2MkxXxzn+jdYoyfVJmYmH6j62NhYfn+6vnzJYePHetCliPaAlP/xI1v1Xx8Z7jyMqqqqmF1V1Njw43nL1547tix4wFMAVEWmPombnpskefz4x8L4yqLFwxqatgtqK2puff06VOnffv2PSTaApjhL4QMGAVeX2FYbfUSpwU11dWkWWAakLjpsWmeD8hwhn8MDCAL1tq+YlBTV8caRFWVlcRbADL8kVm+z0tBfbDhYAveXGFYa/+aQR2HBZUVFcRZYOKfsOWxeaHXS0E9uOEgC/je3WDY7PSKQRVHHJSXlRG2wNAvftk77fCIt3xqjAz/IS4H4f//mRjs/p5mmJZkzsDBwYE1iMpKS/Fb4ObmJsspIHYuPCZeBG4CyBIGBgY2FmYGIy0lBm4urPkMrKakpJigBYpSUlJ7u7q7FUnJgDC1pUVF9x7jS6Zubm5gC3p6esmyoLiwgDgLevv6yLKgKD+fGAtk9vb3k2dBQV4uYQtkZGT29vX3k+WD/Ly8e48fP8ZdVIDiAGTBhAkTybKgIDfn3gNiLJg4cRJZFuTnZBO2QF5enmwf5GaBfPAAfxCBLCDXB7k52ffuPyDCgsmTp5AVRNlZmcRZMGXKVLIsyMrMwG+Bi4uLkqqq6vaJkyZhr7IIlB9ZmZk3njx5gr/KtLe3LxUTE4v+/fs37lINi0WsrKzfXrx4sfDw4cP9BCt9Nzc37l+/fv0lpcBjY2Nj3rVr11d0PQBUxz8ofx2eggAAAABJRU5ErkJggg==') no-repeat left center;
    }
</style>
<li>
    <slot>Unnamed leaf</slot>
</li>
      `;
  }

  static get is() {
    return 'leaf-item'
  }

  static create(id, text = 'Unnamed leaf') {
    let leaf = document.createElement(LeafItem.is);
    leaf.id = id;
    leaf.appendChild(document.createTextNode(text));
    return leaf
  }

}