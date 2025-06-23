import { DEFAULT_MARKER_IMAGE } from '@/constants/mapDefaults';

export function createMarkerWithOverlay(map, position, addressText, setCoords) {
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
    draggable: true,
    map,
  });

  const overlayContainer = document.createElement('div');
  overlayContainer.className = 'custom-overlay';
  overlayContainer.innerHTML = `
    <div>
      ${addressText || '선택한 위치'}
      <button class="close-btn">X</button>
    </div>
  `;

  const overlay = new window.kakao.maps.CustomOverlay({
    position,
    content: overlayContainer,
    yAnchor: 2,
  });

  const geocoder = new window.kakao.maps.services.Geocoder();
  let isFixed = false;

  const updateOverlayText = (latLng) => {
    geocoder.coord2Address(latLng.getLng(), latLng.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        const roadAddress = result[0].road_address?.address_name || result[0].address.address_name;
        overlayContainer.innerHTML = `
          <div>
            ${roadAddress}
            <button class="close-btn">X</button>
          </div>
        `;
      }
    });
  };

  const updateMarkerPosition = (latLng, withOverlay = true) => {
    marker.setPosition(latLng);
    overlay.setPosition(latLng);
    if (withOverlay) {
      overlay.setMap(map);
      updateOverlayText(latLng);
    } else {
      overlay.setMap(null);
    }

    if (typeof setCoords === 'function') {
      setCoords({
        lat: latLng.getLat(),
        lng: latLng.getLng(),
      });
    }
  };

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-btn')) {
      overlay.setMap(null);
      isFixed = false;
    }
  });

  window.kakao.maps.event.addListener(marker, 'click', () => {
    const pos = marker.getPosition();
    updateMarkerPosition(pos, true);
    isFixed = true;
  });

  window.kakao.maps.event.addListener(marker, 'dragend', () => {
    const newPos = marker.getPosition();
    updateMarkerPosition(newPos, false);
    isFixed = false;
  });

  window.kakao.maps.event.addListener(map, 'rightclick', (e) => {
    if (!e.latLng) return;
    updateMarkerPosition(e.latLng, false);
    isFixed = false;
  });

  marker.setMap(map);
  overlay.setMap(map);
}
