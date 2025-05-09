import { DEFAULT_MARKER_IMAGE } from '@/constants/mapDefaults';

export function createMarkerWithOverlay(map, position, addressText) {
    const markerImage = new window.kakao.maps.MarkerImage(
        DEFAULT_MARKER_IMAGE.src,
        new window.kakao.maps.Size(
            DEFAULT_MARKER_IMAGE.size.width,
            DEFAULT_MARKER_IMAGE.size.height
        )
    );

    const marker = new window.kakao.maps.Marker({
        position,
        image: markerImage,
    });

  const overlayContent = `
    <div class="custom-overlay">
      ${addressText}
      <button class="close-btn">X</button>
    </div>
  `;

  const overlay = new window.kakao.maps.CustomOverlay({
    map,
    position,
    content: overlayContent,
    yAnchor: 2,
  });

  marker.setMap(map);
  overlay.setMap(map);

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-btn')) {
      overlay.setMap(null);
    }
  });

  window.kakao.maps.event.addListener(marker, 'click', () => {
    overlay.setMap(map);
    return overlay;
  })
//
}
