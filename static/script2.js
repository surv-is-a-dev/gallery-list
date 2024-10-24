(() => {
  /* util code */
  function Dropdown(node, dropdownText) {
    const dropdownId = Math.round(Math.random() * 10000).toString(8);
    node.classList.add('dropdown-content');
    node.classList.add('dropdown-closed');
    node.dataset.dropdownId = dropdownId;
    node.before((() => {
      const arrow = document.createElement('span');
      arrow.classList.add('dropdown-button');
      arrow.dataset.open = '0';
      arrow.dataset.dropdownId = dropdownId;
      arrow.dataset.searchType = node.nodeName;
      arrow.dataset.dropdownName = dropdownText;
      arrow.textContent = `> | ${dropdownText}`;
      arrow.addEventListener('click', function() {
        const open = (arrow.dataset.open = (String(arrow.dataset.open) == '0' ? '1' : '0')) == '1';
        const node = arrow.parentElement.querySelector(`${(
          arrow.dataset.searchType
        )}[data-dropdown-id="${(
          arrow.dataset.dropdownId
        )}"]:not(span.dropdown-button)`);
        node.classList.remove(`dropdown-${open ? 'closed' : 'open'}`);
        node.classList.add(`dropdown-${open ? 'open' : 'closed'}`);
        arrow.textContent = (open ? `v | ${(
          arrow.dataset.dropdownName
        )}` : `> | ${(
          arrow.dataset.dropdownName
        )}`);
      });
      return arrow;
    })());
    node.before(document.createElement('br'));
  }
  /* main code */
  const linked = document.querySelector('div.linked-gallerys');
  const urls = linked.querySelector('pre').textContent.split('\n').map(l => {
    l = l.trim();
    return [l, `${l}${(l.indexOf('?') > -1) ? '&' : '?'}ref=yri`];
  }), holder = linked.querySelector('span.dropdown-holder > span');
  urls.forEach(url => {
    if (
      url[1] === '?ref=yri' ||
      url[0].startsWith('#')
    ) return;
    const lnk = document.createElement('a');
    lnk.href = url[1];
    lnk.target = '_blank';
    lnk.textContent = url[0];
    holder.appendChild(lnk);
    holder.appendChild(document.createElement('br'));
  });
  Dropdown(holder, 'Here is some other extensions / gallerys related sites and pages!');
})();