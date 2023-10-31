import React from "react";
import ReactDOM from "react-dom";
import UTIF from "utif";
import { Stage, Layer, Image } from "react-konva";
import { ImgComparisonSlider } from '@img-comparison-slider/react';




class App extends React.Component {
  state = {
    image: null,

  };


  async setSelectedImage(event) {
    const buffer = await event.arrayBuffer();
    const ifds = UTIF.decode(buffer);

    const firstPageOfTif = ifds[0];
    UTIF.decodeImages(buffer, ifds);
    const rgba = UTIF.toRGBA8(firstPageOfTif);

    const imageWidth = firstPageOfTif.width;
    const imageHeight = firstPageOfTif.height;

    const cnv = document.createElement("canvas");
    cnv.width = imageWidth;
    cnv.height = imageHeight;

    const ctx = cnv.getContext("2d");
    const imageData = ctx.createImageData(imageWidth, imageHeight);
    for (let i = 0; i < rgba.length; i++) {
      imageData.data[i] = rgba[i];
    }
    ctx.putImageData(imageData, 0, 0);

    this.setState({
      image: cnv
    });


  }

  render() {
    return (
      <div>
        <ImgComparisonSlider>
          <img slot="first" src="https://img-comparison-slider.sneas.io/demo/images/before.webp" />
          <img slot="second" src="https://img-comparison-slider.sneas.io/demo/images/after.webp" />
        </ImgComparisonSlider>
        <input
          type="file"

          onChange={e => this.setSelectedImage(e.target.files[0])}
        />
   <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Image image={this.state.image} />
        </Layer>
      </Stage>


      </div>

    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
