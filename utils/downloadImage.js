import RNFetchBlob from "rn-fetch-blob";
import { setCoins } from "../Features/coins";
import { updateDownload_dailyWallpapers } from "../Features/dailyWallpapers";
import { updateDownloads_permanentWallpapers } from "../Features/permanentWallpapers";

function downloadImage(
  updated_coins,
  type,
  item,
  year,
  month,
  wallpaper_id_,
  dispatch,
  showToast
) {
  try {
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        description: "Image",
        path: PictureDir + "/wallpaper_" + Date.now() + ".jpg",
      },
    }).fetch("GET", item.img_link);
    showToast("success", "Download started!");

    dispatch(setCoins(updated_coins));
    if (type === "daily") {
      dispatch(updateDownload_dailyWallpapers(item.wallpaper_id));
    }
    if (type === "archive") {
      dispatch(
        updateDownloads_permanentWallpapers({
          year: year,
          month: month,
          wallpaper_id: wallpaper_id_,
        })
      );
    }
  } catch (error) {
    // To do: refund
    console.log("ErrorID: E042: ", error);
    showToast("error", "ErrorID: E042 Download failed");
  }
}

export { downloadImage };
