import React from "react";
import {
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
  Text
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { MyColors } from "../style/MyColors";
import FontAwesome6 from "react-native-vector-icons/MaterialIcons";
import { wp } from "../style/Dimensions";
import { normalize } from "react-native-elements";
import SnackMessage from "./SnackMessage";
import { showMessage, hideMessage } from "react-native-flash-message";

const DownloadFile = ({ attachment, data }) => {
  console.log("attachment is ........", attachment);
  const checkPermission = async (attachment) => {
    // alert(attachment);

    // const url = `${imguri[0]}//${imguri[2]}/${imguri[3]}/${imageName}`;
    // : `https://mcrsuitedocumentsstaging.blob.core.windows.net/mcr-suite/${imageName}`;

    if (Platform.OS === "ios") {
      await downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "App needs access to your storage to download Photos"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log("Storage Permission Granted.");
          await downloadFile();
        } else {
          // If permission denied then show alert
          Alert.alert(
            "Storage Permission",
            "Allow Bogathon to access  your device for download the file ?",
            [
              {
                text: "OK",
                onPress: () => {
                  Linking.openSettings();
                }
              }
            ]
          );
          // alert("Storage Permission Not Granted");
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };
  const showFlashMessage = () => {
    showMessage({
      message: "This is a flash message",
      description: "This is a description",
      type: "info", // 'success', 'info', 'warning', or 'danger'
      icon: "auto", // 'none', 'auto', or icon component (ReactNode)
      duration: 3000, // milliseconds
      hideOnPress: true // hide message when user presses it
    });
  };

  const handleDownload = async () => {
    try {
      const granted = await requestStoragePermission();
      if (granted) {
        await downloadFile();
      } else {
        Alert.alert(
          "Permission Denied",
          "Storage permission is required to download files"
        );
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      Alert.alert("Download Failed", "Unable to download the file");
    }
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission Required",
          message: "App needs access to your storage to download files"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS has access by default
  };
  const downloadFile = async () => {
    const { config, fs } = RNFetchBlob;
    const DownloadDir =
      Platform.OS === "ios" ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;

    console.log("download dirs is ......", DownloadDir);
    const date = new Date();
    const options =
      Platform.OS === "ios"
        ? {
            fileCache: true,
            path: `${DownloadDir}/${
              data.name
            }_Waiver_File_${date.getTime()}.pdf`
          }
        : {
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              // Include the original file extension in the download path
              path: `${DownloadDir}/${
                data.name
              }_Waiver_File_${date.getTime()}.pdf`,
              description: "File"
            }
          };
    console.log("file is ....");
    showMessage({
      message: "Downloading started...",
      type: "info"
    });
    <SnackMessage
      success={"snackbarMessage"}
      visible={true}
      error={""}
      // setVisibleFunction={}
    />;

    config(options)
      .fetch("GET", attachment)
      .then((res) => {
        console.log("res is ....", res.data);
        // alert(res);
        showMessage({
          message: "File Downloaded Successfully",
          type: "success"
        });
      })
      .catch(() => {
        showMessage({
          message: "Downloading Failed",
          type: "danger"
        });
      });
  };

  // const downloadFile = async () => {

  //   const { config, fs } = RNFetchBlob;
  //   const DownloadDir =
  //     Platform.OS === "ios" ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
  //   const date = new Date();
  //   const ext = attachment.split(".").pop();
  //   const options = {
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       useDownloadManager: true,
  //       notification: true,
  //       path: `${DownloadDir}/${data.name}_Waiver_File_${date.getTime()}`,
  //       description: "File",
  //     },
  //   };

  //   showMessage({
  //     message: "Downloading started...",
  //     type: "info",
  //   });

  //   config(options)
  //     .fetch("GET", attachment)
  //     .then(() => {
  //       showMessage({
  //         message: "File Downloaded Successfully",
  //         type: "success",
  //       });
  //     })
  //     .catch(() => {
  //       showMessage({
  //         message: "Downloading Failed",
  //         type: "danger",
  //       });
  //     });
  // };

  return (
    <TouchableOpacity
      onPress={handleDownload}
      style={{
        height: normalize(40),
        width: wp(40),
        borderRadius: 10,
        backgroundColor: "#074365",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      }}
    >
      <Text
        style={{ fontSize: normalize(12), fontWeight: "bold", color: "white" }}
      >
        {"Downlaod"}
      </Text>
      <FontAwesome6
        name="picture-as-pdf"
        size={30}
        color={"#ffffff"}
        style={{ paddingLeft: 5 }}
      />
    </TouchableOpacity>
  );
};

export default DownloadFile;
