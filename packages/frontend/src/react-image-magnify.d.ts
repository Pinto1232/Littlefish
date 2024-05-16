declare module 'react-image-magnify' {
    import { ComponentType } from 'react';
  
    interface SmallImage {
      alt: string;
      isFluidWidth: boolean;
      src: string;
    }
  
    interface LargeImage {
      src: string;
      width: number;
      height: number;
    }
  
    interface ReactImageMagnifyProps {
      smallImage: SmallImage;
      largeImage: LargeImage;
      enlargedImageContainerStyle?: React.CSSProperties;
    }
  
    const ReactImageMagnify: ComponentType<ReactImageMagnifyProps>;
  
    export default ReactImageMagnify;
  }