import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled, { css } from "styled-components";

type Props = {
  image?: string;
  paneSize?: number;
  numOfPanes?: number;
  blurAmount?: number;
  paneJustify?: "start" | "end";
  stretchPercentage?: number;
} & React.HTMLAttributes<HTMLDivElement> &
  PropsWithChildren;

export const FlutedGlass = ({
  image,
  paneSize = 50,
  numOfPanes = 10,
  paneJustify = "start",
  blurAmount,
  stretchPercentage = 0,
  children,
  ...props
}: Props) => {
  const [canvasRef, useCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [imageRef, useImageRef] = useState<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [blurryUrl, setBlurryUrl] = useState<string | null>(null);

  const singlePaneWidth = useMemo(() => {
    return 100 / numOfPanes;
  }, [numOfPanes]);

  const imageBoundingRect = useMemo(() => {
    if (!imageRef || !imageLoaded) return;
    return imageRef.getBoundingClientRect();
  }, [imageRef, imageLoaded]);

  useEffect(() => {
    if (!imageRef || !canvasRef || !imageLoaded || !imageBoundingRect) return;
    const canvas = canvasRef;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.filter = `blur(${blurAmount}px)`;
    ctx.drawImage(
      imageRef,
      0,
      0,
      imageBoundingRect.width,
      imageBoundingRect.height,
    );
    // const dataurl = canvas.toDataURL()
    canvas.toBlob((blob) => {
      if (!blob) return;
      const imageUrl = URL.createObjectURL(blob);
      setBlurryUrl(imageUrl);
    });
  }, [imageLoaded, imageRef, canvasRef, imageBoundingRect, blurAmount]);

  /**
   * Calculate the background position of each pane
   * based on the pane size and the number of panes as well as the justify prop
   */
  const calculatePaneBackgroundPos = useCallback(
    (i: number) => {
      if (paneJustify === "start") {
        return `${(i * singlePaneWidth) / (100 / paneSize)}%`;
      }
      return `${100 - paneSize + (i * singlePaneWidth) / (100 / paneSize)}%`;
    },
    [paneJustify, singlePaneWidth, paneSize],
  );

  /**
   * The width of the background image is the number of panes * 100%
   */
  const backgroundSizeWidth = useMemo(() => {
    return numOfPanes * (100 - stretchPercentage);
  }, [numOfPanes, stretchPercentage]);

  return (
    <Wrapper $side={paneJustify} {...props}>
      {children}
      {image && (
        <StyledImage
          onLoad={() => {
            setImageLoaded(true);
          }}
          ref={useImageRef}
          src={image}
        />
      )}
      {imageLoaded && (
        <>
          <StyledCanvas
            ref={useCanvasRef}
            width={imageBoundingRect?.width}
            height={imageBoundingRect?.height}
          />
          <PanesWrapper $width={paneSize}>
            {blurryUrl &&
              Array(numOfPanes)
                .fill(0)
                .map((_, i) => i)
                .map((i) => (
                  <Pane
                    style={{
                      backgroundImage: `url(${blurryUrl})`,
                      backgroundSize: `${backgroundSizeWidth}% 84%`,
                      backgroundPositionX: calculatePaneBackgroundPos(i),
                    }}
                    key={`pane-${i}`}
                  />
                ))}
          </PanesWrapper>
        </>
      )}
    </Wrapper>
  );
};

const StyledImage = styled.img`
  display: block !important;
`;

const StyledCanvas = styled.canvas`
  display: none;
`;

const PanesWrapper = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}%;
  height: 100%;
  top: 0;
  position: absolute;
  overflow: hidden;
  display: flex;
`;

const Pane = styled.div`
  background-repeat: no-repeat;
  position: relative;
  height: 120%;
  top: -10%;
  background-position-y: center;
  flex: 1 0 auto;
  transform: perspective(100px) rotateY(90deg);
  transition-timing-function: ease-in-out, ease-out;
`;

const Wrapper = styled.div<{
  $side: Props["paneJustify"];
}>`
  display: flex;
  position: relative;
  overflow: hidden;
  justify-content: flex-${({ $side }) => $side};
  width: 100%;
  ${Pane} {
    transform: perspective(200px) rotateY(12deg);
  }
`;
