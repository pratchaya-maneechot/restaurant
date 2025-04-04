import ReactLightbox, { useLightboxState } from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import Box from '@mui/material/Box';

import Iconify from '../iconify';
import StyledLightbox from './styles';
import { LightBoxProps } from './types';

// ----------------------------------------------------------------------

export default function Lightbox({
  slides,
  disabledZoom,
  disabledVideo,
  disabledTotal,
  disabledCaptions,
  disabledSlideshow,
  disabledThumbnails,
  disabledFullscreen,
  onGetCurrentIndex,
  ...other
}: LightBoxProps) {
  const totalItems = slides ? slides.length : 0;

  return (
    <>
      <StyledLightbox />

      <ReactLightbox
        slides={slides}
        animation={{ swipe: 240 }}
        carousel={{ finite: totalItems < 5 }}
        controller={{ closeOnBackdropClick: true }}
        plugins={getPlugins({
          disabledZoom,
          disabledVideo,
          disabledCaptions,
          disabledSlideshow,
          disabledThumbnails,
          disabledFullscreen,
        })}
        on={{
          view: ({ index }: { index: number }) => {
            if (onGetCurrentIndex) {
              onGetCurrentIndex(index);
            }
          },
        }}
        toolbar={{
          buttons: [<DisplayTotal key={0} totalItems={totalItems} disabledTotal={disabledTotal} />, 'close'],
        }}
        render={{
          iconClose: () => <Iconify width={24} icon="carbon:close" />,
          iconZoomIn: () => <Iconify width={24} icon="carbon:zoom-in" />,
          iconZoomOut: () => <Iconify width={24} icon="carbon:zoom-out" />,
          iconSlideshowPlay: () => <Iconify width={24} icon="carbon:play" />,
          iconSlideshowPause: () => <Iconify width={24} icon="carbon:pause" />,
          iconPrev: () => <Iconify width={32} icon="carbon:chevron-left" />,
          iconNext: () => <Iconify width={32} icon="carbon:chevron-right" />,
          iconExitFullscreen: () => <Iconify width={24} icon="carbon:center-to-fit" />,
          iconEnterFullscreen: () => <Iconify width={24} icon="carbon:fit-to-screen" />,
        }}
        {...other}
      />
    </>
  );
}

// ----------------------------------------------------------------------

export function getPlugins({
  disabledZoom,
  disabledVideo,
  disabledCaptions,
  disabledSlideshow,
  disabledThumbnails,
  disabledFullscreen,
}: LightBoxProps) {
  let plugins = [Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom];

  if (disabledThumbnails) {
    plugins = plugins.filter((plugin) => plugin !== Thumbnails);
  }
  if (disabledCaptions) {
    plugins = plugins.filter((plugin) => plugin !== Captions);
  }
  if (disabledFullscreen) {
    plugins = plugins.filter((plugin) => plugin !== Fullscreen);
  }
  if (disabledSlideshow) {
    plugins = plugins.filter((plugin) => plugin !== Slideshow);
  }
  if (disabledZoom) {
    plugins = plugins.filter((plugin) => plugin !== Zoom);
  }
  if (disabledVideo) {
    plugins = plugins.filter((plugin) => plugin !== Video);
  }

  return plugins;
}

// ----------------------------------------------------------------------

type DisplayTotalProps = {
  totalItems: number;
  disabledTotal?: boolean;
};

export function DisplayTotal({ totalItems, disabledTotal }: DisplayTotalProps) {
  const { currentIndex } = useLightboxState();

  if (disabledTotal) {
    return null;
  }

  return (
    <Box
      component="span"
      className="yarl__button"
      sx={{
        typography: 'body2',
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
      }}
    >
      <strong> {currentIndex + 1} </strong> / {totalItems}
    </Box>
  );
}
