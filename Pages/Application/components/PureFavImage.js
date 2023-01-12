import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { PureComponent } from "react";
import LinearGradient from "react-native-linear-gradient";
import AddToFavIcon from "../../../Components/AddToFavIcon";
import DownloadIcon from "../../../Components/DownloadIcon";

export class PureFavImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showLayer: false,
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          // backgroundColor: "rgba(0,0,0,0.2)",
          // width: imgWidth,
          // height: imgWidth * (13 / 16),

          // width: imgHeight * (16 / 13),
          // height: imgHeight,
          // marginTop: 25,

          width: "100%",
          height: "100%",

          // borderWidth: 4,
          borderRadius: 10,
          // padding: 10,
          overflow: "hidden",
        }}
        activeOpacity={0.8}
        onPress={() => {
          // download(currentArray[0].value);
          if (this.state.showLayer) {
            this.setState({ showLayer: false });
            //   setShowLayer(false);
          } else {
            this.setState({ showLayer: true });
            //   setShowLayer(true);
          }
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            // borderRadius: 20,
          }}
          resizeMode="contain"
          source={{
            uri: this.props.imageUrl,
          }}
        />
        {this.state.showLayer ? (
          <LinearGradient
            locations={[0.1, 0.3, 0.7, 0.9]}
            colors={[
              "rgba(0,0,0,0.8)",
              "transparent",
              "transparent",
              "rgba(0,0,0,0.8)",
            ]}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              style={{
                // zIndex: 2,
                position: "absolute",
                // top: 30,
                // left: 17,
                bottom: 15,
                right: 15,
                width: 40,
                height: 40,
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                // image_object.value
                this.props.download(this.props.imageUrl);
                // download(currentArray[0].value);
              }}
            >
              <DownloadIcon fill={"#fff"} width={15} height={15} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                // zIndex: 2,
                position: "absolute",
                // top: 30,
                // left: 17,
                bottom: 15,
                right: 70,
                width: 40,
                height: 40,
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                if (
                  this.props.index ===
                    this.props.favArray[this.props.userData.email].length - 1 &&
                  this.props.index !== 0
                ) {
                  this.props.dispatch(
                    this.props.resetFavInSearchResult(this.props.imageUrl)
                  );
                  // let result = searchResult.findIndex(
                  //   (item, index) => item.value === imageUrl
                  // );

                  // console.log(result);

                  this.props.favCarouselRef.current.snapToItem(
                    this.props.index - 1
                  );
                  setTimeout(() => {
                    this.props.dispatch(
                      this.props.removeFromFav({
                        key: this.props.userData.email,
                        index: this.props.index,
                      })
                    );
                  }, 300);
                } else {
                  this.props.dispatch(
                    this.props.removeFromFav({
                      key: this.props.userData.email,
                      index: this.props.index,
                    })
                  );
                }
              }}
            >
              <AddToFavIcon
                color={"#fff"}
                fill={"#fff"}
                width={15}
                height={15}
              />
            </TouchableOpacity>
          </LinearGradient>
        ) : null}
      </TouchableOpacity>
    );
  }
}

export default PureFavImage;
