(async (temp, temp2) => {
  /* Util code */
  const gallerys = document.querySelector('div.gallerys');
  const addElement = (parent, type, callback) => (parent.appendChild((callback(
    (type = (type ? document.createElement(type) : parent)), parent
  ), type)), type);
  let _gN = 0;
  const fixGalleryObject = (name, gallery) => {
    if (!gallery.link) throw new Error('Invalid gallery URL!');
    gallery.link += `${(gallery.link.indexOf('?') > -1) ? '&' : '?'}ref=yri`;
    gallery.title ??= name;
    gallery.$thumb = `static/thumbs/${gallery.slug || 'unknown'}.webp?v2`;
    gallery.slug ??= name;
    gallery.description ??= 'A gallery, feel free to check it out!';
    gallery.$name = name;
    return gallery;
  };
  const updateGallery = gallery => {
    const node = document.querySelector(`div.gallery[data-name="${gallery.$name}"]:not(.lazy-gallery)`);
    node.innerHTML = '';
    addElement(node, 'div', thumbContainer => {
      thumbContainer.classList.add('thumbnail-container');
      addElement(thumbContainer, 'img', thumbnail => {
        thumbnail.classList.add('thumbnail');
        thumbnail.loading = 'lazy';
        thumbnail.draggable = false;
        thumbnail.onerror = function() {
          this.src = 'static/thumbs/unknown.webp?v1';
          this.onerror = undefined;
        };
        thumbnail.alt = 'Gallery Thumbnail';
        thumbnail.src = gallery.$thumb;
      });
    });
    addElement(node, 'div', content => {
      content.classList.add('info-container');
      addElement(content, 'span', galleryName => {
        galleryName.classList.add('title');
        galleryName.textContent = gallery.title;
      });
      content.appendChild(document.createElement('br'));
      addElement(content, 'span', description => {
        description.classList.add('description');
        description.textContent = gallery.description;
      });
      content.appendChild(document.createElement('br'));
      addElement(content, 'a', lnk => {
        lnk.classList.add('link');
        lnk.textContent = 'Open Gallery!';
        lnk.href = gallery.link;
        lnk.target = '_blank';
      });
    });
  };
  const addLazyGallery = (galleryName, galleryMeta) => {
    if (_gN === 0) gallerys.innerHTML = '';
    const node = document.createElement('div');
    node.classList.add('gallery', 'lazy-gallery');
    node.dataset.name = galleryName;
    node.dataset.static = galleryMeta;
    const lazyDetector = document.createElement('img');
    lazyDetector.loading = 'lazy';
    node.appendChild(lazyDetector);
    gallerys.appendChild(node);
    lazyDetector.onload = node.loadGallery = (async function() {
      const node = this.parentElement;
      this.remove();
      node.classList.remove('lazy-gallery');
      const res = await fetch(node.dataset.static);
      updateGallery(fixGalleryObject(node.dataset.name, JSON5.parse(await res.text())));
    }).bind(lazyDetector);
    if (_gN++ < 11) node.loadGallery();
    else lazyDetector.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  };
  /* The main code */
  temp = await fetch('gallerys/list.json5');
  temp = JSON5.parse(await temp.text());
  for (const gallery of temp) addLazyGallery(gallery, `gallerys/${gallery}.json5?${Date.now().toString(36)}`);
  return (temp = null, temp2 = null);
})(null, null);
